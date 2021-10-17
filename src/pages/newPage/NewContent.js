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
import {screenWidth,newItemHeight} from '../../common/constValue'
import {getNewData} from '../../common/axios'
import { ColumnView, RowBetweenView, RowView } from '../../components/MainView'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/core'


export default NewContent = forwardRef(({items,onChangeIndex},ref) => {

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
          return <ContentFlatList ref={sRef} key={ind} item={it}/>
        })
      }
    </ScrollView>
  </View>
})
const ContentFlatList=forwardRef(({item},ref)=>{
  const [data,setData] = useState([])
  const [refreshing,setRefreshing] = useState(false)
  const page = useRef(0)
  const loading = useRef(false)

  useImperativeHandle(ref,()=>({
    loadData:()=>{
      console.log(item);
      if (!data || data.length == 0){
        loadNewsData()
      }
    }
  }))

  function loadNewsData(){
    console.log('开始加载数据',item,page.current);
    loading.current = true
    getNewData(item,page.current).then((result)=>{
      if (page.current == 0){
        setData(result.list)
      }else {
        setData(data.concat(result.list))
      }
      loading.current = false
    }).catch(()=>{
      loading.current = false
    })
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
      return <NewItem item={item}/>
    }}
    getItemLayout={(data, index) => (
      { length: newItemHeight, offset: newItemHeight * index, index }
    )}
    keyExtractor={(item, index) => item.url + index}
    onEndReached={onLoadMore}
    onEndReachedThreshold={0.1}
    refreshControl={<RefreshControl 
      refreshing={refreshing}
      onRefresh={onRefresh}
      />}
  />
})
function NewItem({item}){
  const navigation = useNavigation()
  function onGoToDetail(){
    navigation.push('NewDetail',{item})
  }
  return <TouchableOpacity onPress={onGoToDetail}>
      <ColumnView style={styles.newItem}>
      <RowView>
        <Image style={styles.newImage} source={{uri:item.pic}}/>
        <ColumnView style={styles.itemRightView}>
          <Text numberOfLines={2} style={styles.titleText}>{item.title}</Text>
          <RowBetweenView>
            <Text style={styles.timeText}>{item.time}</Text>
            <Text style={styles.srcText}>{item.src}</Text>
          </RowBetweenView>
        </ColumnView>
      </RowView>
      <View style={styles.bottomLine}/>
    </ColumnView>
  </TouchableOpacity>
}