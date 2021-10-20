import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
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
import {getVideoData} from '../../common/axios'
import {photoSwipeMinHeight} from '../../common/constValue'
import {showToast} from '../../components/ToastRootSibling'
import DownButton from '../../components/DownButton'
import VideoPlay from '../../components/VideoPlay'

const {height} = Dimensions.get('window')

function getVideoList(){
  return new Promise((resolve,reject)=>{
    getVideoData().then((result)=>{
      resolve(result)
    }).catch(()=>{
      reject()
    })
  })
}

export default VideoPage = ({navigation,route}) => {
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
      if(pageRef.current == videoList.length - 1){
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
      
      // 暂停上一个
      if (videoRef[pageRef.current] && videoRef[pageRef.current].current){
        videoRef[pageRef.current].current.onChangeVideoStatusPause()
      }

      if (Math.abs(y) > photoSwipeMinHeight){
        if (y < 0){
          if(pageRef.current == videoList.length - 1){
            // 滑动到底部，触发加载更多
            showToast('正在加载...')
            loadVodeoData(true)
            return
          }
          pageRef.current += 1

          // 当前的播放
          if (videoRef[pageRef.current] && videoRef[pageRef.current].current){
            videoRef[pageRef.current].current.onChangeVideoStatusPlay()
          }

        }else {
          if (pageRef.current == 0){
            // 第0页，向下滑动，触发刷新操作
            pageRef.current = 0
            showToast('正在刷新...')
            loadVodeoData()
            return
          }
          pageRef.current -= 1
          // 当前的播放
          if (videoRef[pageRef.current] && videoRef[pageRef.current].current){
            videoRef[pageRef.current].current.onChangeVideoStatusPlay()
          }
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

  const [videoList,setVideoList] = useState([])
  const [videoRef,setVideoRef] = useState([])
  const [isHas,setIsHas] = useState(true)

  const flatListRef = useRef()
  const pageRef = useRef(0)

  useEffect(async()=>{
    loadVodeoData()
  },[])

  async function loadVodeoData(add){
    const result = await getVideoList()
    if (result.img){
      if (add){
        pageRef.current += 1
        setVideoList(videoList.concat([result]))
        setTimeout(() => {
          flatListRef.current.scrollToOffset({animated: true,offset: pageRef.current*height})
        }, 200);
      }else {
        setVideoList([result])
      }
      setIsHas(true)
    }else {
      setIsHas(false)
    }
    
  }

  return <View style={{flex:1,backgroundColor:'black'}} {...panResponder.panHandlers} >
     <FlatList ref={flatListRef}
        data={videoList}
        renderItem={({ item, index }) => {
          return <VideoPlay item={item} onBackRef={(ref)=>{
            setVideoRef(videoRef.concat([ref]))
          }} onSetPlayStatus={()=>{
            console.log('=================',videoRef);
            if (videoRef[index] && videoRef[index].current){
              videoRef[index].current.onChangeVideoStatus()
            }
          }}/>
        }}
        getItemLayout={(data, index) => (
          { length: height, offset: height * index, index }
        )}
        scrollEnabled={false}
        keyExtractor={(item, index) => item.img + index}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        ListFooterComponent={<></>}
      />
      {
        !isHas && <TouchableOpacity style={styles.reButton} onPress={loadVodeoData}>
          <Text style={{color:'#fff'}}>点击刷新</Text>
        </TouchableOpacity>
      }
     <DownButton type={'video'} url={()=>videoList[pageRef.current]?.url}/>
  </View>
}
function RenderImageItem({item}){
  return useMemo(()=>{
    return <Image resizeMode={'cover'}  style={[styles.phoneImage,{
    }]} 
    source={{uri:item.img}} />
  },[item.img])
}

// {dddddddddddddddd
//   "code": 200,
//   "img": "http://cdn.video.picasso.dandanjiang.tv/5c21c5c831f6134d07cefe3c.jpg?imageMogr2/thumbnail/!350x540r/gravity/Center/crop/350x540&sign=c16f4df0340c7e7dbbcc242c0d7f1c86&t=616a5e31",
//   "type": "",
//   "url": "http://cdn.video.picasso.dandanjiang.tv/5c21c5c831f6134d07cefe3c.mp4?sign=cfb14d213f2d62e24a4394a026ac7ec3&t=616a5e31"
// }