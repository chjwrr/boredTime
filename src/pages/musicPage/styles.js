import {StyleSheet,Dimensions} from 'react-native'
import { mainColor, screenWidth,screenHeight } from '../../common/constValue'

const styles = StyleSheet.create({
  title:{
    color:mainColor,
    fontSize:20,
    fontWeight:'bold'
  },
  name:{
    color:'#000',
    fontSize:12,
    fontWeight:'bold',
    marginTop:5
  },
  image:{
    width:screenWidth * 0.8,
    height:screenWidth * 0.8,
    borderRadius:screenWidth * 0.8 / 2,
    marginTop:100
  },
  mainView:{
    flexDirection:'column',
    justifyContent:'space-between',
    height:'100%'
  },
  playImage:{
    width:44,
    height:44
  },
  nextImage:{
    width:30,
    height:30
  }
})
export default styles