import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {
  drawWidth,
  swipeWidth
} from '../common/constValue'
import DrawPage from '../pages/drawPage'

import StackNativation from './stackNavigation'

const Draw = createDrawerNavigator()

const DrawStackEnter = () => {
  return (
    <NavigationContainer>
      <Draw.Navigator screenOptions={{
        drawerStyle: {
          width: drawWidth,
        },
        drawerType:'back',
        swipeEdgeWidth:swipeWidth,
      }}
      drawerContent={()=><DrawPage/>}
      >
        <Draw.Screen name={'stack'} component={StackNativation} options={{
          headerShown:false
        }}/>
      </Draw.Navigator>
    </NavigationContainer>
  );
};

export default DrawStackEnter 