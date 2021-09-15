import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  Modal,
  PanResponder,
  Animated,
  Easing,
  Dimensions
} from 'react-native'
import styles from './styles'
import TDWallPaperData from '../../assets/json/TDWallPaper.json'
import PWallPaperData from '../../assets/json/PWallPaper.json'
// import PhoneWallPaperData from '../../assets/json/PhoneWallPaper.json'
import MTWallPaperData from '../../assets/json/MTWallPaper.json'

import {photoSwipeMinHeight} from '../../common/constValue'
import ImageCommon from '../../assets/images/common/ImageCommon'
import {saveImageToPhoto} from '../../common/downloadSave'


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
          console.log('显示刷新数据');
          return
        }
      }
      if(pageRef.current == imageList.length - 1){
        if (y < 0){
          // 最后一页，向上滑动
          console.log('显示加载更多数据页面');
          return
        }
      }
      console.log('滑动了',y);
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
            console.log('加载更多数据');
            setImageList(imageList.concat(getImageList(route.params.type)))
            return
          }
          pageRef.current += 1
        }else {
          console.log('向下滑动了',y);
          if (pageRef.current == 0){
            // 第0页，向下滑动，触发刷新操作
            console.log('刷新数据');
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

  const scaleAnimated = useRef(new Animated.Value(1))

  const [imageList,setImageList] = useState(getImageList(route.params.type))
  useEffect(()=>{
    // scaleAnimated.current.setValue(1)
    // Animated.timing(scaleAnimated.current,{
    //   toValue:0.8,
    //   useNativeDriver:true,
    //   duration: 200,
    //   friction:1
    // }).start()
  },[])
  
  const flatListRef = useRef()
  const pageRef = useRef(0)

  return <View style={{flex:1,backgroundColor:'black'}} {...panResponder.panHandlers} >
     <FlatList ref={flatListRef}
        data={imageList}
        renderItem={({ item, index }) => {
          return <Animated.Image resizeMode={'contain'}  style={[styles.phoneImage,{
            // transform:[{scale:scaleAnimated.current}],
          }]} 
          source={{uri:item}}
        />
        }}
        getItemLayout={(data, index) => (
          { length: height, offset: height * index, index }
        )}
        scrollEnabled={false}
        keyExtractor={(item, index) => item}
        onViewableItemsChanged={this.onViewableItemsChanged}
        viewabilityConfig={this.viewabilityConfig}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
      />

      <TouchableOpacity style={styles.gobackBtn} onPress={()=>{
        navigation.goBack()
      }}>
        <Image style={styles.downImage} source={ImageCommon.goback_icon}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.downBtn} onPress={()=>{
        saveImageToPhoto(imageList[pageRef.current])
      }}>
        <Image style={styles.downImage} source={ImageCommon.download_icon}/>
      </TouchableOpacity>
  </View>
}
