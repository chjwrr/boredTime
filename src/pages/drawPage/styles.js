import {
  StyleSheet
} from 'react-native'
import {drawWidth} from '../../common/constValue'
export default styles = StyleSheet.create({
  body:{
    flex:1,
    backgroundColor:'#231F2D',
    paddingHorizontal:0
  },
  bodyPadding:{
    paddingHorizontal:15
  },
  title1:{
    color:'white',
    fontSize:15,
  },
  title2:{
    color:'white',
    fontSize:15,
    marginTop:130
  },
  titleBig:{
    color:'white',
    fontSize:30,
    fontWeight:'bold',
    marginTop:60
  },
  city:{
    color:'white',
    fontSize:17,
  },
  weatherIcon:{
    width:28,
    height:20,
    marginLeft:5
  },
  weatherView:{
    marginTop:40,
    marginBottom:5,
    backgroundColor:'#122e29',
    paddingVertical:10,
    paddingHorizontal:5
  },
  weatherDes:{
    color:'white',
    fontSize:12,
  },
  bottomSpace:{
    marginBottom:5
  },
  menuView:{
    marginTop:50
  },
  menuItem:{
    height:60
  },
  lineView:{
    width:5,
    height:'100%'
  },
  menuIcon:{
    width:40,
    height:40,
    marginLeft:10,
    marginRight:20
  },
  menuTitle:{
    color:'white',
    fontSize:20,
    fontWeight:'bold',
  }
})