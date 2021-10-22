import React from 'react'
import {
  Text,
  View
} from 'react-native'
import MainView from '../../components/MainView'
import {getMusic} from '../../common/axios'
import styles from './styles'

export default MusicPage = ({navigation}) => {

  return <MainView>
    <Text style={styles.title}>歌名</Text>
    <Text style={styles.name}>歌手</Text>
  </MainView>
}