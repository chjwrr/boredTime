import React,{useState,useEffect,useRef} from 'react'
import {
  Text,
  View,
  Image,
  Animated,
  Easing,
  TouchableOpacity
} from 'react-native'
import MainView, { ColumnCenterView, RowBetweenView, RowCenterView } from '../../components/MainView'
import {getMusic} from '../../common/axios'
import styles from './styles'
import ImageMusic from '../../assets/images/music/ImageMusic'
import Video from 'react-native-video'

export default MusicPage = ({navigation}) => {
  
  const [musicInfo,setMusicInfo] = useState({})
  const rotate = useRef(new Animated.Value(0))
  const [paused,setPaused] = useState(false)

  useEffect(()=>{
    beginAnimated()
    getMusicData()

    navigation.addListener('blur', () => {
      setPaused(!paused)
    });
  },[])

  function getMusicData(){
    setMusicInfo({})
    getMusic().then((info)=>{
      console.log('info====',info);
      setMusicInfo(info)
    })
  }

  function beginAnimated(){
    rotate.current.setValue(0);
    Animated.timing(
      rotate.current,
        {
            toValue: 1,
            friction: 1,
            useNativeDriver:true,
            duration:10000,
            easing: Easing.linear
        }
    ).start(()=>{
      beginAnimated()
    })
  }

  return <MainView>
    {
      musicInfo.url && <Video
      source={{uri: musicInfo.url}}   // 可以是一个 URL 或者 本地文件
      onLoad={(e)=>{
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
      style={{width:0,height:0}}
      posterResizeMode={'cover'}
      repeat={true}
      resizeMode={'cover'}
      paused={paused}
    />
    }
    <View style={styles.mainView}>
      <View>
        <ColumnCenterView>
          <Text style={styles.title}>{musicInfo.name}</Text>
          <Text style={styles.name}>{musicInfo.artistsname}</Text>
        </ColumnCenterView>
        <ColumnCenterView>
        <Animated.Image style={[styles.image,{
          transform:[{
            rotate: rotate.current.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg','360deg']
            })
          }]
        }]} source={{uri:musicInfo.picurl}}/>
        </ColumnCenterView>
      </View>
      <RowBetweenView style={{marginBottom:20}}>
        <Image style={styles.nextImage}/>
        <TouchableOpacity onPress={()=>{
          setPaused(!paused)
        }}>
          <Image style={styles.playImage} source={!paused ? ImageMusic.pause_icon : ImageMusic.play_icon}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          getMusicData()
        }}>
          <Image style={styles.nextImage} source={ImageMusic.next_icon}/>
        </TouchableOpacity>
      </RowBetweenView>
    </View>
  </MainView>
}