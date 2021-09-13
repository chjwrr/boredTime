import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  Modal
} from 'react-native'
import ImageCommon from '../../assets/images/image/ImageCommon'
import MainView,{MainFullView} from '../../components/MainView'
import styles from './styles'
import {getJoker_imageInfo} from '../../common/axios'
import ShowImage from '../../components/ShowImage'

export default DNImagePage = ({navigation}) => {
  const [flatData,setFlatData] = useState([])
  const [showImages,setShowImage] = useState([])
  const [showIndex,setShowIndex] = useState(0)
  const allPages = useRef(0)
  const [page,setPage] = useState(1)
  const loading = useRef(false)

  const [visible,setVisible] = useState(false)
  useLayoutEffect(()=>{
    navigation.setOptions({
      title:'搞笑趣图',
      headerBackTitleVisible:false,
      headerTintColor:'black'
    })
  },[navigation])


  useEffect(()=>{
    if (loading.current){
      return
    }
    loading.current = true
    getJoker_imageInfo(page).then((res)=>{
      const result = flatData.concat(res.contentlist)
      setFlatData(result)
      const images = res.contentlist.map((item)=>{
        return {
          url:item.img,
          content:item.title
        }
      })
      setShowImage(showImages.concat(images))
      allPages.current == res.allPages
      loading.current = false
    }).catch(()=>{
      loading.current = false
    })
  },[page])

  const onEndReached=()=>{
    setPage((pre)=>pre + 1)
  }

  const renderItem = ({item,index})=>{
    // let random = Math.random() * 100 + 180
    return <TouchableOpacity style={[styles.renderItem,{
      height:300
    }]} onPress={()=>{
      setVisible(true)
      setShowIndex(index)
    }}>
     <Image style={[styles.renderImage,{height:300}]} source={{uri:item.img}}/>
     {
       item.title.length > 0 && <View style={styles.renderViewTitle}>
          <Text style={styles.renderTitle}>{item.title}</Text>
        </View>
      }
    </TouchableOpacity>
  }

  return <MainFullView>
   <SafeAreaView>
    <FlatList
      style={{backgroundColor:'#f6f5ec'}}
      data={flatData}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.id + String(index)}
      getItemLayout={(data, index) => (
        {length: 300, offset: 300 * index, index}
      )}
      // numColumns={2}
      onEndReachedThreshold={0.01}
      onEndReached={onEndReached}
      removeClippedSubviews={true}
    />
   </SafeAreaView>
   <ShowImage 
    visible={visible}
    images={showImages}
    onClick={()=>{
      setVisible(false)
    }}
    index={showIndex}
   />
  </MainFullView>
}