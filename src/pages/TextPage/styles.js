import {StyleSheet,Dimensions} from 'react-native'
import { 
  textTopItemWidth, 
  newTopItemHeight,
  newTopLineHeight,
  mainColor,
  StatusBarHeight,
  newItemHeight,
  screenWidth,
  screenHeight,
  BottomSafeArea,
  color_cdcdcd
} from '../../common/constValue'

const styles = StyleSheet.create({
  topScroll:{
    height:newTopItemHeight,
  },
  contentScroll:{
    height: screenHeight - StatusBarHeight - newTopItemHeight,
  },
  mainView:{
    paddingHorizontal:0
  },
  flatlist:{
    width:screenWidth
  },
  itemButton:{
  },
  item:{
    width:textTopItemWidth,
    textAlign:'center',
    height:newTopItemHeight - newTopLineHeight,
    lineHeight:newTopItemHeight - newTopLineHeight,
    color:'black',
    fontSize:17
  },
  selectItem:{
    width:textTopItemWidth,
    textAlign:'center',
    height:newTopItemHeight - newTopLineHeight,
    lineHeight:newTopItemHeight - newTopLineHeight,
    color:'black',
    fontSize:17,
    fontWeight:'bold',
    color:mainColor
  },
  lineView:{
    width:textTopItemWidth,
    height:newTopLineHeight,
    paddingHorizontal:10
  },
  line:{
    backgroundColor:'red',
    flex:1
  },
  newItem:{
    borderBottomWidth:10,
    borderBottomColor:'#f5f5f5',
    paddingBottom:10
  },
  bottomLine:{
    backgroundColor:'#d3d7d4',
    height:1,
    marginTop:9
  },
  newImage:{
    width:newItemHeight - 20,
    height:newItemHeight - 20,
  },
  itemRightView:{
    width:screenWidth - 30 - (newItemHeight - 20),
    marginLeft:10,
    justifyContent:'space-between',
    height:newItemHeight - 20,
  },
  srcText:{
    fontSize:12,
    color:'#d1c7b7'
  },
  timeText:{
    fontSize:12,
    color:'#4f5555'
  },
  titleText:{
    fontSize:17,
    fontWeight:'bold',
    color:'#130c0e',
    lineHeight:25,
    margin:10
  },
  desText:{
    fontSize:12,
    color:color_cdcdcd,
    marginHorizontal:10
  },
  bottomSafe:{
    height:BottomSafeArea
  },
  contentText:{
    marginHorizontal:10,
    marginVertical:20,
    fontSize:17,
    lineHeight:30
  }
})
export default styles