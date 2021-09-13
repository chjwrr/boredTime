import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native'
import ImageCommon from '../../assets/images/image/ImageCommon'
import {MainFullView, RowCenterView} from '../../components/MainView'
import styles from './styles'

export default ImagePage = ({navigation}) => {
  return <MainFullView style={styles.body}>
    <TouchableOpacity activeOpacity={0.8} style={styles.itemView} onPress={()=>{
      navigation.navigate('DNImage')
    }}>
      <Image style={styles.icon} source={ImageCommon.dnbz}/>
      <RowCenterView style={styles.centerView}>
        <Text style={styles.title}>电脑壁纸</Text>
      </RowCenterView>
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={0.8} style={styles.itemView}>
      <Image style={styles.icon} source={ImageCommon.sjbz}/>
      <RowCenterView style={styles.centerView}>
        <Text style={styles.title}>手机壁纸</Text>
      </RowCenterView>
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={0.8} style={styles.itemView}>
      <Image style={styles.icon} source={ImageCommon.mtbz}/>
      <RowCenterView style={styles.centerView}>
        <Text style={styles.title}>美图</Text>
      </RowCenterView>
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={0.8} style={styles.itemView}>
      <Image style={styles.icon} source={ImageCommon.pzbz}/>
      <RowCenterView style={styles.centerView}>
        <Text style={styles.title}>P站</Text>
      </RowCenterView>
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={0.8} style={styles.itemView}>
      <Image style={styles.icon} source={ImageCommon.dm}/>
      <RowCenterView style={styles.centerView}>
        <Text style={styles.title}>二次元</Text>
      </RowCenterView>
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={0.8} style={styles.itemView} onPress={()=>{
      navigation.navigate('JokerImage')
    }}>
      <Image style={styles.icon} source={ImageCommon.enjoy}/>
      <RowCenterView style={styles.centerView}>
        <Text style={styles.title}>搞笑</Text>
      </RowCenterView>
    </TouchableOpacity>
  </MainFullView>
}