import React from 'react'
import {
  Text,
  View,
  FlatList,
  Dimensions
} from 'react-native'
import styles from './styles'
import {MainFullView} from '../../components/MainView'

const {width,height} = Dimensions.get('window')

export default VideoPage = ({navigation}) => {


  const renderItem = ({item,index})=>{
    return <View style={{
      backgroundColor:item,
      width,
      height,
      alignItems:'center',
      justifyContent:'center'
    }}>
      <Text>{item}</Text>
    </View>
  }

  return <MainFullView>
    <FlatList
      pagingEnabled={true}
      data={['red','blue','yellow','purple','#096','#123478']}
      renderItem={renderItem}
      keyExtractor={(item, index) => index  +''}
      getItemLayout={(data, index) => (
        {length: height, offset: height * index, index}
      )}
      viewabilityConfig={{
        viewAreaCoveragePercentThreshold:80
      }}
      onViewableItemsChanged={(info)=>{

      }}
    />
  </MainFullView>
}