import React, { useEffect, useState } from 'react'
import {
  Text,
  ScrollView,
} from 'react-native'
import styles from './styles'
import {
  getNContentFromHtmlText,
} from '../../common/util'

export default TextDetail = ({navigation,route}) => {
  const [resultData,setResultData] = useState('')

  useEffect(()=>{
    navigation.setOptions({
      headerTitle:route.params.item.title,
    })
    const content = getNContentFromHtmlText(route.params.item.content)

    setResultData(content)
  },[])

  return <ScrollView>
    <Text style={styles.contentText}>{resultData}</Text>
  </ScrollView>
}