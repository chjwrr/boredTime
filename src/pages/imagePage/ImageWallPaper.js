import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  PanResponder,
  Animated,
  Dimensions
} from 'react-native'
import styles from './styles'
import TDWallPaperData from '../../assets/json/TDWallPaper.json'
import PWallPaperData from '../../assets/json/PWallPaper.json'
// import PhoneWallPaperData from '../../assets/json/PhoneWallPaper.json'
import MTWallPaperData from '../../assets/json/MTWallPaper.json'

import {photoSwipeMinHeight} from '../../common/constValue'
import ImageCommon from '../../assets/images/common/ImageCommon'
import {showToast} from '../../components/ToastRootSibling'
import DownButton from '../../components/DownButton'


const {height} = Dimensions.get('window')

function getImageList(type){
  let customList = []
  switch (type) {
    case 1:
      customList = PWallPaperData
      break;
    case 2:
      customList = TDWallPaperData
      break;
    case 3:
      customList = PWallPaperData
      break;
    case 4:
      customList = MTWallPaperData
      break;
    default:
      break;
  }

  const random = parseInt(Math.random() * customList.random)
  return customList.images.slice(random,random + 20)
}

export default ImageWallPaper = ({navigation,route}) => {
  let panResponder = PanResponder.create({
    // 用户开始触摸屏幕的时候，是否愿意成为响应者；默认返回false，无法响应，当返回true的时候则可以进行之后的事件传递
    onStartShouldSetPanResponder: (evt, gestureState) => {
      if (Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10){
        return true
      }
      return false
    },
    // 确定是否在view组件被按下的时候响应touch事件后，是否阻止事件冒泡（它的子组件的事件将不被响应）
    onStartShouldSetPanResponderCapture: (evt, gestureState) => {
      if (Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10){
        return true
      }
      return false
    },
    // 在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      if (Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10){
        return true
      }
      return false
    },
    // 确定是否在view组件手指移动的时候响应touch事件后，是否阻止事件冒泡（它的子组件的事件将不被响应）
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
      if (Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10){
        return true
      }
      return false
    },
    // 开始手势操作
    onPanResponderGrant: (evt, gestureState) => {
      // 滑动开始时间
      // this.startTime = evt.nativeEvent.timestamp
    },
    // 手指移动
    onPanResponderMove: (evt, gestureState) => {
      let y = gestureState.dy
      if (pageRef.current == 0){
        if (y > 0){
          // 第一页，向下滑动
          return
        }
      }
      if(pageRef.current == imageList.length - 1){
        if (y < 0){
          // 最后一页，向上滑动
          return
        }
      }
      flatListRef.current.scrollToOffset({animated: false,offset: pageRef.current*height - y})
    },
    // 手指松开
    onPanResponderRelease: (evt, gestureState) => {
      // this.endTime = evt.nativeEvent.timestamp
      let y = gestureState.dy
      if (Math.abs(y) > photoSwipeMinHeight){
        if (y < 0){
          if(pageRef.current == imageList.length - 1){
            // 滑动到底部，触发加载更多
            showToast('正在加载...')
            setImageList(imageList.concat(getImageList(route.params.type)))
            return
          }
          pageRef.current += 1
        }else {
          if (pageRef.current == 0){
            pageRef.current = 0
            showToast('正在刷新...')
            setImageList(getImageList(route.params.type))
            return
          }
          pageRef.current -= 1
        }
      }
      flatListRef.current.scrollToOffset({animated: true,offset: pageRef.current*height})
    },
    // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
    onPanResponderTerminate: (evt, gestureState) => {
    },
    // 是否可以阻塞其他(父)控件获取焦点，返回false则有其他焦点触发时该焦点失效。
    onShouldBlockNativeResponder: (evt, gestureState) => {
      return false;
    },
  });

  const [imageList,setImageList] = useState(getImageList(route.params.type))
  const flatListRef = useRef()
  const pageRef = useRef(0)

  return <View style={{flex:1,backgroundColor:'black'}} {...panResponder.panHandlers} >
     <FlatList ref={flatListRef}
        data={imageList}
        renderItem={({ item, index }) => {
          return <RenderItem item={item}/>
        }}
        getItemLayout={(data, index) => (
          { length: height, offset: height * index, index }
        )}
        scrollEnabled={false}
        keyExtractor={(item, index) => item}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
      />

      <TouchableOpacity style={styles.gobackBtn} onPress={()=>{
        navigation.goBack()
      }}>
        <Image style={styles.downImage} source={ImageCommon.goback_icon}/>
      </TouchableOpacity>
      <DownButton type={'image'} url={()=>imageList[pageRef.current]}/>
  </View>
}
function RenderItem({item}){
  return useMemo(()=>{
    return <Animated.Image resizeMode={'contain'}  style={[styles.phoneImage,{
      // transform:[{scale:scaleAnimated.current}],
    }]} 
    source={{uri:item}}/>
  },[item])
}