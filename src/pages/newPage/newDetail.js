import React, { useEffect, useState } from 'react'
import {
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  View
} from 'react-native'
import MainView from '../../components/MainView'
import styles from './styles'
import WebView from 'react-native-webview'
import {
  getContentFromHtmlText,
  getImagesFromHtmlText
} from '../../common/util'
import {
  screenWidth,
  screenHeight,
} from '../../common/constValue'

export default NewDetail = ({navigation,route}) => {
  const [resultData,setResultData] = useState([])

  useEffect(()=>{
    navigation.setOptions({
      headerTitle:route.params.item.title,
    })
    const content = getContentFromHtmlText(route.params.item.content)
    const images = getImagesFromHtmlText(route.params.item.content)
    let result = []
    content.map((item,index)=>{
      result.push(item)
      if (images[index]){
        result.push(images[index])
      }
    })
    if (images.length > content.length) {
      result.concat(images.slice(content.length,images.length))
    }
    setResultData(result)
  },[])

  return <ScrollView style={{backgroundColor:'white'}}>
   {
     resultData.map((item,index)=>{
       if (typeof(item) == 'string'){
         return <Text style={styles.contentText} key={index}>{item}</Text>
       }
       return <Image key={index} style={{
         width:screenWidth,
         height:item.height * screenWidth / item.width
       }} source={{uri:item.src}}/>
     })
   }
   <View style={styles.bottomSafe}/>
  </ScrollView> 
}