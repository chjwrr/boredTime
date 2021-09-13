import React from 'react';
import {
  View,
  Text,
  SafeAreaView
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Video from '../pages/videoPage'
import MusicPage from '../pages/musicPage'
import TextPage from '../pages/TextPage'
import ImagePage from '../pages/imagePage'

const TabStack = createBottomTabNavigator()

const Tabbar = ()=>{
  return <SafeAreaView>
    <View style={{backgroundColor:'red',height:50}}>
    <Text>123d</Text>
  </View>
    </SafeAreaView>
}

const TabStackEnter = () => {
  return (
    <NavigationContainer>
      <TabStack.Navigator tabBar={()=><Tabbar/>}>
        <TabStack.Screen name={'video'} component={Video}/>
        <TabStack.Screen name={'music'} component={MusicPage}/>
        <TabStack.Screen name={'text'} component={TextPage}/>
        <TabStack.Screen name={'image'} component={ImagePage}/>
      </TabStack.Navigator>
    </NavigationContainer>
  );
};

export default TabStackEnter 