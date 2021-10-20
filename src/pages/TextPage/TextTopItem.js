import React, { useRef,useEffect, useState, useImperativeHandle,forwardRef } from 'react'
import {
  ScrollView,
  Text,
  View,
  Animated,
  LayoutAnimation,
  TouchableOpacity
} from 'react-native'
import { ColumnView, RowView } from '../../components/MainView'
import styles from './styles'
import {textTopItemWidth} from '../../common/constValue'

export default TextTopItem = forwardRef(({items,onChangeIndex},ref) => {

  const scrollRef = useRef()

  useImperativeHandle(ref,()=>({
    setCurrentIndex:(index)=>{
      setSelectIndex(index)
    }
  }))

  const [selectIndex,setSelectIndex] = useState(0)
  function onChangeItem(index){
    if (index != selectIndex){
      onChangeIndex(index)
    }
  }

  return <View style={styles.topScroll}>
    <ScrollView ref={scrollRef} horizontal={true} showsHorizontalScrollIndicator={false}>
      <ColumnView>
        <RowView>
        {
          items.map((item,index)=>{
            return <TouchableOpacity key={index} style={styles.itemButton} onPress={()=>onChangeItem(index)}>
              <Text style={selectIndex == index ? styles.selectItem : styles.item}>{item}</Text>
            </TouchableOpacity>
          })
        }
        </RowView>
        <Line index={selectIndex}/>
      </ColumnView>
    </ScrollView>
  </View>
})
function Line({index}){
  useEffect(()=>{
    LayoutAnimation.linear()
  },[index])
  return <View style={[
    styles.lineView,
    {
      marginLeft:index * textTopItemWidth
    }
  ]}>
    <View style={styles.line}/>
  </View>
}