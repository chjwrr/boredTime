import {StyleSheet,Dimensions} from 'react-native'
import {screenWidth,screenHeight} from '../../common/constValue'

const itemHeight = screenHeight / 3
const styles = StyleSheet.create({
  body:{
    flexDirection:'row',
    flexWrap:'wrap'
  },
  itemView:{
    width:screenWidth/2,
    height:itemHeight,
    alignItems:'center',
    justifyContent:'center'
  },
  icon:{
    width:screenWidth/2,
    height:itemHeight,
    position:'absolute',
    top:0,
    left:0
  },
  centerView:{
    backgroundColor:'rgba(0,0,0,0.2)',
    flex:1
  },
  title:{
    color:'white',
    fontSize:20,
    fontWeight:'bold'
  },
  renderItem:{
    height:200,
    flexDirection:'column',
    justifyContent:'flex-end',
    marginTop:10,
    flex:1
  },
  renderImage:{
    width:'100%',
    height:200,
    position:'absolute',
    top:0,
    left:0
  },
  renderViewTitle:{
    backgroundColor:'rgba(0,0,0,0.4)',
    padding:10
  },
  renderTitle:{
    color:'white'
  },
  phoneImage:{
    width:screenWidth,
    height:screenHeight
  },
  gobackBtn:{
    width:40,
    height:40,
    position:'absolute',
    right:20,
    bottom:80,
    alignItems:'flex-end',
    justifyContent:'center'
  }
})
export default styles