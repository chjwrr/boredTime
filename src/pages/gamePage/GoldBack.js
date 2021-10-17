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
  Button,
  InteractionManager
} from 'react-native'
import MainView,{RowCenterView,RowEndView} from '../../components/MainView'
import styles from './styles'
import {getGoldBack} from '../../common/axios'
import ClipboardButton from '../../components/ClipboardButton'

export default GoldBack = ({navigation}) => {

  const [contentInfo,setContentInfo] = useState({})
  useLayoutEffect(()=>{
    navigation.setOptions({
      headerRight:()=><TouchableOpacity onPress={getData}>
        <Text>Next</Text>
      </TouchableOpacity>
    })
  },[navigation])
  useEffect(()=>{
    InteractionManager.runAfterInteractions(()=>{
      getData()
    })
  },[])

  function getData(){
    getGoldBack().then((res)=>{
      setContentInfo(res)
    })
  }

  return <MainView style={styles.mainView}>
    <ClipboardButton copyText={contentInfo.title + '   神回复：' +  contentInfo.content}>
      <Text style={styles.backTitle}>{contentInfo.title}</Text>
      <Text style={styles.backContent}>{contentInfo.content}</Text>
    </ClipboardButton>
   
  </MainView>
}
