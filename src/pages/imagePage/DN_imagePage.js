import React, { useEffect, useLayoutEffect, useState } from 'react'
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
import {getDN_imageInfo} from '../../common/axios'
import ShowImage from '../../components/ShowImage'

export default DNImagePage = ({navigation}) => {
  const [images,setImages] = useState([])
  const [showImages,setShowImage] = useState([])
  const [showIndex,setShowIndex] = useState(0)

  const [visible,setVisible] = useState(false)
  useLayoutEffect(()=>{
    navigation.setOptions({
      title:'电脑壁纸',
      headerBackTitleVisible:false,
      headerTintColor:'black'
    })
  },[navigation])

  useEffect(()=>{
    getDN_imageInfo().then((res)=>{
      setImages(res.images)
      let images = res.images.map((item)=>{
        return {
          url:item.url,
          content:item.copyright
        }
      })
      setShowImage(images)
    })
  },[])

  const renderItem = ({item,index})=>{
    return <TouchableOpacity style={styles.renderItem} onPress={()=>{
      setVisible(true)
      setShowIndex(index)
    }}>
      <Image style={styles.renderImage} source={{uri:item.url}}/>
      <View style={styles.renderViewTitle}>
        <Text style={styles.renderTitle}>{item.copyright}</Text>
      </View>
    </TouchableOpacity>
  }

  return <MainFullView>
   <SafeAreaView>
    <FlatList
      data={images}
      renderItem={renderItem}
      keyExtractor={(item, index) => index  +''}
      getItemLayout={(data, index) => (
        {length: 200, offset: 200 * index, index}
      )}
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
