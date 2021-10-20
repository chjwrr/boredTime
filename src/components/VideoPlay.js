import React, { useEffect,useRef, forwardRef, useMemo, useState, useImperativeHandle } from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Video from 'react-native-video'
import {
  screenWidth,
  screenHeight,
  BottomSafeArea,
  mainColor,
  color_cdcdcd
} from '../common/constValue'
import { ColumnView, RowBetweenView, RowView } from './MainView'

export default VideoPlay =({item,onBackRef,onSetPlayStatus})=>{
 
  
  const [currentTime,setCurrentTime] = useState(0)
  const totalTime = useRef(0)
  const [isPaused,setIsPaused] = useState(false)
  const videoRef = useRef()
 
  useImperativeHandle(videoRef,()=>({
    onChangeVideoStatus:()=>{
      setIsPaused(!isPaused)
    },
    onChangeVideoStatusPause:()=>{
      setIsPaused(false)
    },
    onChangeVideoStatusPlay:()=>{
      setIsPaused(true)
    }
  }))

  useEffect(()=>{
    onBackRef(videoRef)
  },[])
  return useMemo(()=>{
    return <View style={styles.mainView}>
      <Video
        source={{uri: item.url}}   // 可以是一个 URL 或者 本地文件
        ref={videoRef}   
        onLoad={(e)=>{
          totalTime.current = parseInt(e.duration)
        }}                                  
        onBuffer={()=>{
          console.log('远程视频缓冲时的回调');
        }}
        onEnd={()=>{
          console.log('播放完成后的回调');
        }}
        onError={()=>{
          console.log('播放失败后的回调');
        }}
        style={styles.video}
        poster={item.img}
        posterResizeMode={'cover'}
        repeat={true}
        resizeMode={'cover'}
        onProgress={(progress)=>{
          setCurrentTime(parseInt(progress.currentTime))
        }}
        paused={isPaused}
      />
     <View style={styles.playButton}>
        <TouchableOpacity style={{width:'100%',height:'100%'}} onPress={()=>{
          onSetPlayStatus()
        }}>
        </TouchableOpacity>
     </View>
      <RowView style={styles.controlView}>
        <Text style={styles.timer}>{currentTime}s</Text>
        <View style={styles.proView}>
          <View style={[styles.pro,{
            width:parseInt(currentTime/totalTime.current*100) + '%'
          }]}/>
        </View>
        <Text style={styles.timer}>{totalTime.current}s</Text>
      </RowView>
    </View>
  },[item.url,currentTime,isPaused])
}
const styles = StyleSheet.create({
  mainView:{
    width:screenWidth,
    height:screenHeight,
    flexDirection:'column',
    justifyContent:'space-between',
  },
  video:{
    width:screenWidth,
    height:screenHeight,
    position:'absolute',
  },
  controlView:{
    paddingBottom:BottomSafeArea + 10,
    paddingHorizontal:15
  },
  timer:{
    color:'#fff',
    fontSize:12
  },
  proView:{
    height:1,
    backgroundColor:'#fff',
    flex:1,
    marginHorizontal:15
  },
  pro:{
    position:'absolute',
    backgroundColor:mainColor,
    height:1,
  },
  playButton:{
    width:screenWidth,
    flex:1
  }
})