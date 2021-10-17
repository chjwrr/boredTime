
import React from 'react';
import EnterApp from './src/reactNavigation/drawerNavigation'
import { RootSiblingParent } from 'react-native-root-siblings';
import {ListFooterComponent} from './src/components/Common'
import {
  RefreshControl,
  FlatList,
  ScrollView
} from 'react-native'

export default App = () => {
  return <RootSiblingParent>
    <EnterApp/>
  </RootSiblingParent>
};

//refreshcontrol loading颜色
RefreshControl.defaultProps = {
  ...RefreshControl.defaultProps,
  colors:['#2a5caa','#f58220','#8552a1'],
  title:'biu~biu~biu~',
  titleColor:'#7c8577'
}
FlatList.defaultProps = {
  ...ScrollView.defaultProps,
  ListFooterComponent:<ListFooterComponent/>,
  removeClippedSubviews:true,
}