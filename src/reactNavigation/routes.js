import Video from '../pages/videoPage'
import Image from '../pages/imagePage'
import News from '../pages/newPage'
import NewDetail from '../pages/newPage/newDetail'
import Music from '../pages/musicPage'
import TextList from '../pages/TextPage'
import Game from '../pages/gamePage'
import DNImagePage from '../pages/imagePage/DN_imagePage'
import JokerImagePage from '../pages/imagePage/Joker_imagePage'
import ImageWallPaper from '../pages/imagePage/ImageWallPaper'
import ImageToContent from '../pages/gamePage/ImageToContent'
import DogDetail from '../pages/gamePage/DogDetail'
import GoldBack from '../pages/gamePage/GoldBack'
import OneWorld from '../pages/gamePage/OneWorld'


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
    headerShown:true,
    headerTitle:'娱乐'
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
  },{
    name:'NewDetail',
    component:NewDetail,
    headerShown:true,
    headerTitle:'详情'
  },{
    name:'ImageToContent',
    component:ImageToContent,
    headerShown:true,
    headerTitle:'看图猜成语'
  },{
    name:'OneWorld',
    component:OneWorld,
    headerShown:true,
    headerTitle:'一言'
  },{
    name:'GoldBack',
    component:GoldBack,
    headerShown:true,
    headerTitle:'神回复'
  },{
    name:'DogDetail',
    component:DogDetail,
    headerShown:true,
    headerTitle:'舔狗日记'
  }
]






