import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Routers from './routes'
import {Animated,Easing} from 'react-native'
const Stack = createNativeStackNavigator()

const RenderRouter = ()=>{
  return Routers.map((item)=>{
    return <Stack.Screen key={item.name} name={item.name} component={item.component} options={{
      headerShown:item.headerShown
    }}/>
  })
}

const StackEnter = () => {
  return <Stack.Navigator>
    {RenderRouter()}
  </Stack.Navigator>
};

export default StackEnter 