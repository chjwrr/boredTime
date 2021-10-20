import React,{useRef} from 'react'
import MainView from '../../components/MainView'
import TopItems from './TextTopItem'
import NewContent from './TextContent'
import styles from './styles'

const items = ["暖文语录","美文","励志语录"]

export default TextPage = ({navigation}) => {
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