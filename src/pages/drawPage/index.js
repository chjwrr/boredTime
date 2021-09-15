import React, { useState } from 'react'
import {
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform
} from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import MainView,{RowView,RowBetweenView,RowFixedView,ColumnView} from '../../components/MainView'
import { useDrawerStatus } from '@react-navigation/drawer';
import styles from './styles'
import { getWeatherInfo,getAddressInfo } from '../../common/axios'
import {weatherIcon} from '../../common/constValue'
import MenuImageCommon from '../../assets/images/menu/MenuImageCommon'
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { showToast } from '../../components/ToastRootSibling';

const WeatherView = ()=>{
  const [weatherInfo,setWeatherInfo] = useState()
  React.useEffect(()=>{
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
    }
    Geolocation.getCurrentPosition(info => {
      if (info && info.coords){
        getAddressInfo(info.coords.latitude,info.coords.longitude).then((cityname)=>{
          getWeatherInfo(cityname).then((res)=>{
            setWeatherInfo(res)
          })
        })
      }
    },(e)=>{
      showToast("请检查是否有定位权限：用于获取当前城市天气信息")
    });
  },[])
  return <RowView>
    {
      weatherInfo && weatherInfo.city && <ColumnView style={styles.weatherView}>
        <RowBetweenView style={styles.bottomSpace}>
          <RowFixedView>
            <Text style={styles.city}>{weatherInfo.city}</Text>
            <Image style={styles.weatherIcon} source={{uri:weatherIcon(weatherInfo.weather[0].icon1,'d')}}/>
            <Image style={styles.weatherIcon} source={{uri:weatherIcon(weatherInfo.weather[0].icon2,'n')}}/>
          </RowFixedView>
          <Text style={styles.weatherDes}>{weatherInfo.weather[0].weather} {weatherInfo.weather[0].temp}</Text>
        </RowBetweenView>
        <RowBetweenView>
          <Text style={styles.weatherDes}>{weatherInfo.date}</Text>
          <Text style={styles.weatherDes}>{weatherInfo.weather[0].wind}</Text>
        </RowBetweenView>
      </ColumnView>
    }
  </RowView>
}

const menuInfos = [
  {
    image:MenuImageCommon.menu_video,
    title:'视频',
    color:'#ef5b9c',
    bgColor:'#f7acbc',
    toPath:'video'
  },
  {
    image:MenuImageCommon.menu_image,
    title:'图片',
    color:'#008792',
    bgColor:'#78cdd1',
    toPath:'image'
  },
  {
    image:MenuImageCommon.menu_news,
    title:'新闻',
    color:'#5c7a29',
    bgColor:'#b7ba6b',
    toPath:'news'
  },
  {
    image:MenuImageCommon.menu_music,
    title:'音乐',
    color:'#aa2116',
    bgColor:'#de773f',
    toPath:'music'
  },
  {
    image:MenuImageCommon.menu_text,
    title:'暖文',
    color:'#6950a1',
    bgColor:'#6a6da9',
    toPath:'textList'
  },
  {
    image:MenuImageCommon.menu_game,
    title:'游戏',
    color:'#ffe600',
    bgColor:'#dec674',
    toPath:'game'
  },
]
const MenuView = ()=>{
  const [selectIndex,setSelectIndex] = useState(0)
  const navigation = useNavigation()
  return <ColumnView style={styles.menuView}>
    {
      menuInfos.map((item,index)=>{
        return <TouchableOpacity key={index} onPress={()=>{
          setSelectIndex(index)
          navigation.dispatch(DrawerActions.closeDrawer())
          navigation.navigate(item.toPath)
        }}>
          <RowView style={[styles.menuItem,{
            backgroundColor:selectIndex == index ? item.bgColor : 'transparent'
            }]}>
            <View style={[styles.lineView,{backgroundColor:selectIndex == index ? item.color : 'transparent'}]}/>
            <Image style={styles.menuIcon} source={item.image}/>
            <Text style={styles.menuTitle}>{item.title}</Text>
          </RowView>
        </TouchableOpacity>
      })
    }
  </ColumnView>
}

export default DrawPage = ({navigation}) => {
  const isDrawerOpen = useDrawerStatus() === 'open';
  return <MainView style={styles.body}>
    <ScrollView style={{height:'100%'}}>
      <StatusBar barStyle={isDrawerOpen?'light-content':'dark-content'}/>
      <RowBetweenView style={styles.bodyPadding}>
        <Text style={styles.title1}>
          无聊之
        </Text>
        <Text style={styles.titleBig}>娱</Text>
        <Text style={styles.title2}>
          乐生活
        </Text>
      </RowBetweenView>
      <WeatherView/>
      <MenuView/>
    </ScrollView>
  </MainView>
}

