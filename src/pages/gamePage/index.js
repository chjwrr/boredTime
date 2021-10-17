import React,{useLayoutEffect} from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import ImageCommon from '../../assets/images/common/ImageCommon'
import {MainFullView, ColumnCenterView,RowView} from '../../components/MainView'
import styles from './styles'

export default GamePage = ({navigation}) => {
  function onGoToImageToContent(){
    navigation.push('ImageToContent')
  }
  function onGoToOneWorld(){
    navigation.push('OneWorld')
  }
  function onGoToDog(){
    navigation.push('DogDetail')
  }
  function onGoToGoldBack(){
    navigation.push('GoldBack')
  }
  return <MainFullView>
    <RowView>
      <TouchableOpacity onPress={onGoToImageToContent}>
        <ColumnCenterView style={styles.itemView}>
          <Image style={styles.image} source={ImageCommon.game_icon}/>
          <Text style={styles.title}>看图猜成语</Text>
        </ColumnCenterView>
      </TouchableOpacity>
      <TouchableOpacity onPress={onGoToOneWorld}>
        <ColumnCenterView style={styles.itemView}>
          <Image style={styles.image} source={ImageCommon.one_say}/>
          <Text style={styles.title}>一言</Text>
        </ColumnCenterView>
      </TouchableOpacity>
    </RowView>
    <RowView>
      <TouchableOpacity onPress={onGoToDog}>
        <ColumnCenterView style={styles.itemView}>
          <Image style={styles.image} source={ImageCommon.dog_detail}/>
          <Text style={styles.title}>舔狗日记</Text>
        </ColumnCenterView>
      </TouchableOpacity>
      <TouchableOpacity onPress={onGoToGoldBack}>
        <ColumnCenterView style={styles.itemView}>
          <Image style={styles.image} source={ImageCommon.gold_back}/>
          <Text style={styles.title}>神回复</Text>
        </ColumnCenterView>
      </TouchableOpacity>
    </RowView>
    <RowView>
      <ColumnCenterView style={styles.itemView}>
        <Image style={styles.image} source={ImageCommon.game_show}/>
        <Text style={styles.title_show}>敬请期待</Text>
      </ColumnCenterView>
    </RowView>
  </MainFullView>
}