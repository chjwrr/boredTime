import React,{useRef} from 'react'
import MainView from '../../components/MainView'
import TopItems from './NewTopItem'
import NewContent from './NewContent'
import styles from './styles'

const items = ["头条","新闻","国内","国际","政治","财经","体育","娱乐","军事","教育","科技","NBA","股票","星座","女性","健康","育儿"]

export default NewsPage = ({navigation}) => {
  const topRef = useRef()
  const contentRef = useRef()

  function onChangeTopIndex(index){
    contentRef.current.scrollTo(index)
  }
  function onChangeContentIndex(index){
    topRef.current.setCurrentIndex(index)
  }

  return <MainView style={styles.mainView}>
   <TopItems ref={topRef} items={items} onChangeIndex={onChangeTopIndex} />
   <NewContent ref={contentRef} items={items} onChangeIndex={onChangeContentIndex}/>
  </MainView> 
}