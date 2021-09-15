import Video from '../pages/videoPage'
import Image from '../pages/imagePage'
import News from '../pages/newPage'
import Music from '../pages/musicPage'
import TextList from '../pages/TextPage'
import Game from '../pages/gamePage'
import DNImagePage from '../pages/imagePage/DN_imagePage'
import JokerImagePage from '../pages/imagePage/Joker_imagePage'
import ImageWallPaper from '../pages/imagePage/ImageWallPaper'

export default Routers = [
  {
    name:'video',
    component:Video,
    headerShown:false
  },
  {
    name:'image',
    component:Image,
    headerShown:false
  },
  {
    name:'news',
    component:News,
    headerShown:false
  },
  {
    name:'music',
    component:Music,
    headerShown:false
  },
  {
    name:'textList',
    component:TextList,
    headerShown:false
  },
  {
    name:'game',
    component:Game,
    headerShown:false
  },
  {
    name:'DNImage',
    component:DNImagePage,
    headerShown:true
  },{
    name:'JokerImage',
    component:JokerImagePage,
    headerShown:true
  },{
    name:'ImageWallPaper',
    component:ImageWallPaper,
    headerShown:false
  }
]
