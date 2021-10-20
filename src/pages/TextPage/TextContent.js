import React, { useEffect, useRef, useState,forwardRef,useImperativeHandle } from 'react'
import {
  ScrollView,
  Text,
  View,
  Animated,
  LayoutAnimation,
  FlatList,
  Image,
  RefreshControl
} from 'react-native'
import styles from './styles'
import {screenWidth,screenHeight} from '../../common/constValue'
import {getTextWarm,getBeatiText,getENCNText} from '../../common/axios'
import { ColumnView, RowBetweenView, RowView } from '../../components/MainView'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/core'
import ClipboardButton from '../../components/ClipboardButton'

export default TextContent = forwardRef(({items,onChangeIndex},ref) => {

  const contentIndex = useRef(0)
  const scrollRef = useRef()
  const subRefs = useRef([])

  useImperativeHandle(ref,()=>({
    scrollTo:(index)=>{
      scrollRef.current.scrollTo({x:index * screenWidth,y:0,animated:true})
    }
  }))

  useEffect(()=>{
    subRefs.current[0].current.loadData()
  },[])

  return <View style={styles.contentScroll}>
    <ScrollView
      ref={scrollRef}
      horizontal={true} 
      showsHorizontalScrollIndicator={false} 
      pagingEnabled={true}
      onMomentumScrollEnd={(e)=>{
        const index = e.nativeEvent.contentOffset.x/screenWidth
        if (contentIndex.current != index){
          contentIndex.current = index
          onChangeIndex(contentIndex.current)
          subRefs.current[index].current.loadData()    
        }
      }}>
      {
        items.map((it,ind)=>{
          const sRef = useRef()
          subRefs.current.push(sRef)
          return <ContentFlatList ref={sRef} key={ind} dataReuslt={it}/>
        })
      }
    </ScrollView>
  </View>
})
const ContentFlatList=forwardRef(({dataReuslt},ref)=>{
  const [data,setData] = useState([])
  const [refreshing,setRefreshing] = useState(false)
  const page = useRef(0)
  const loading = useRef(false)
  const lastId = useRef(0)

  useImperativeHandle(ref,()=>({
    loadData:()=>{
      console.log(dataReuslt);
      if (!data || data.length == 0){
        loadNewsData()
      }
    }
  }))

  function loadNewsData(){
    console.log('开始加载数据',data,page.current);
    loading.current = true

    if (dataReuslt == '暖文语录'){
      getTextWarm(lastId.current).then((result)=>{
        if (lastId.current == 0){
          setData(result)
        }else {
          setData(data.concat(result))
        }
        lastId.current = result[result.length - 1].id
        loading.current = false
      }).catch(()=>{
        loading.current = false
      })
    }
    if (dataReuslt == '美文'){
      getBeatiText(page.current).then((result)=>{
        if (page.current == 0){
          setData(result)
        }else {
          setData(data.concat(result))
        }
        loading.current = false
      }).catch(()=>{
        loading.current = false
      })
    }
    if (dataReuslt == '励志语录'){
      getENCNText().then((result)=>{
        if (page.current == 0){
          setData(result)
        }else {
          setData(data.concat(result))
        }
        loading.current = false
      }).catch(()=>{
        loading.current = false
      })
    }
  }

  function onRefresh(){
    console.log('onRefresh');
    page.current = 0
    loadNewsData()
  }

  function onLoadMore(){
    console.log('onLoadMore');
    if (!loading.current){
      page.current += 1
      loadNewsData()
    }
  }

  return <FlatList style={styles.flatlist}
    data={data}
    renderItem={({ item, index }) => {
      return dataReuslt == '暖文语录' ? <WarmItem item={item}/> : dataReuslt == '美文' ? <TextLisItem item={item}/> : <EnItem item={item}/>
    }}
    keyExtractor={(item, index) => item + index}
    onEndReached={onLoadMore}
    onEndReachedThreshold={0.1}
    refreshControl={<RefreshControl 
      refreshing={refreshing}
      onRefresh={onRefresh}
      />}
  />
})
function WarmItem({item}){
  return <ColumnView style={styles.newItem}>
    <Image style={{
      width:screenWidth,
      height:screenWidth * item.pic_h/item.pic_w,
    }} source={{uri:item.pic}}/>
    <ClipboardButton copyText={item.title}>
      <Text style={styles.titleText}>{item.title}</Text>
    </ClipboardButton>
  </ColumnView>
}
function TextLisItem({item}){
  const navigation = useNavigation()
  return <TouchableOpacity onPress={()=>{
    navigation.push('TextDetail',{item})
  }}>
      <ColumnView style={styles.newItem}>
      <Text style={styles.titleText}>{item.title}</Text>
      <Text style={styles.desText}>{item.desc}</Text>
    </ColumnView>
  </TouchableOpacity>
}
function EnItem({item}){
  return <ColumnView style={styles.newItem}>
    <ClipboardButton copyText={item.chinese + item.english}>
      <Text style={styles.titleText}>{item.chinese}</Text>
      <Text style={styles.desText}>{item.english}</Text>
    </ClipboardButton>
  </ColumnView>
}