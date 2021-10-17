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
import {getDogDetail} from '../../common/axios'
import ClipboardButton from '../../components/ClipboardButton'

export default DogDetail = ({navigation}) => {

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
    getDogDetail().then((res)=>{
      setContentInfo(res)
    })
  }

  return <MainView style={styles.mainView}>
    <ClipboardButton copyText={contentInfo.content}>
      <Text style={styles.hitokoto}>{contentInfo.content}</Text>
    </ClipboardButton>
  </MainView>
}