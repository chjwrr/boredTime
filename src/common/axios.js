import { PermissionsAndroid, Platform } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import RNFS from 'react-native-fs'

import axios from 'axios'

let request = axios.create();
request.defaults.timeout = 10000


export const getAddressInfo=(latitude,longitude)=>{
  return new Promise((resolve,reject)=>{
    request.get(`http://restapi.amap.com/v3/geocode/regeo?key=9b466e014d14281af221cbc464ddc267&location=${latitude},${longitude}&radius=1000&extensions=all&batch=false&roadlevel=0`)
    .then((response)=>{
      if (response.data.info =='OK'){
        if (Array.isArray(response.data.regeocode.addressComponent.city)){
          resolve(response.data.regeocode.addressComponent.province)
        }
        resolve(response.data.regeocode.addressComponent.city)
      }else {
        resolve('北京')
      }
    }).catch(()=>{
      resolve('北京')
    })
  })
}

export const getWeatherInfo=(cityname)=>{
  return new Promise((resolve,reject)=>{
    request.get('https://query.asilu.com/weather/baidu/?city=' + cityname)
    .then((response)=>{
      resolve(response.data)
    }).catch(()=>{
    })
  })
}

export const getDN_imageInfo=()=>{
  return new Promise((resolve,reject)=>{
    request.get('https://api.asilu.com/bg/')
    .then((response)=>{
      resolve(response.data)
    }).catch((e)=>{
      console.log('e===',e);
    })
  })
}

export const getJoker_imageInfo=(page)=>{
  return new Promise((resolve, reject)=>{
    request.get(`https://way.jd.com/showapi/tpxh?time=2015-07-10&page=${page}&maxResult=20&appkey=7e9979a264855fff26bea74a253fee06`)
    .then((response)=>{
      if (response.data.code == 10000){
        resolve(response.data.result.showapi_res_body)
      }else {
        reject()
      }
    }).catch((e)=>{
      reject()
    })
  })
}


// // 获取远端图片
// axios({
//   method:'get',
//   url:'http://bit.ly/2mTM3nY',
//   responseType:'stream'
// })
//   .then(function(response) {
//   response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
// });