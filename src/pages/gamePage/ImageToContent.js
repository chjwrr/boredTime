import React,{useEffect, useLayoutEffect, useRef, useState} from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  InteractionManager
} from 'react-native'
import {RowCenterView,RowEndView} from '../../components/MainView'
import styles from './styles'
import ImageCommon from '../../assets/images/common/ImageCommon'
import {color_cdcdcd} from '../../common/constValue'
import {getImageContent} from '../../common/axios'
import {showToast} from '../../components/ToastRootSibling'


export default ImageToContent = ({navigation}) => {

  const [imageUrl,setImageUrl] = useState('')
  const [result,setResult] = useState('猜一猜')

  const content = useRef('')
  const textInputRef = useRef()
  const isSuccess = useRef(false)

  useEffect(()=>{
    InteractionManager.runAfterInteractions(()=>{
      getData()
    })
  },[])

  function getData(){
    getImageContent().then((res)=>{
      setImageUrl(res.img)
      content.current = res.key
    })
  }

  function onNext(){
    setResult('猜一猜')
    isSuccess.current = false
    textInputRef.current.clear()

    getData()
  }

  function onSubMit(text){
    if (content.current == text.nativeEvent.text){
      showToast('猜对啦，继续下一个吧~')
      isSuccess.current = true
      setResult(content.current)
    }else {
      showToast('猜错啦，继续加油哦~')
      setResult(text.nativeEvent.text)
      textInputRef.current.clear()
    }
  }

  return  <KeyboardAvoidingView
    behavior={Platform.OS == "ios" ? "padding" : "height"}
    style={styles.container}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.inner}>
        <View>
          <RowCenterView style={styles.imageView}>
            {imageUrl.length > 0 && <Image style={styles.image} source={{uri:imageUrl}}/>}
          </RowCenterView>
          <RowCenterView>
            <Text style={[styles.result,!isSuccess.current ? {color:color_cdcdcd} : {}]}>{result}</Text>
          </RowCenterView>
          <RowEndView>
            <TouchableOpacity onPress={onNext}>
              <Image style={styles.arrowImage} source={ImageCommon.right_arrow}/>
            </TouchableOpacity>
          </RowEndView>
        </View>
        <RowCenterView>
          <TextInput
            ref={textInputRef}
            returnKeyLabel={'确定'}
            placeholder={'猜到啦？输入呀~'}
            textAlign={'center'}
            onSubmitEditing={onSubMit}
            style={styles.textInput}/>
        </RowCenterView>
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
}