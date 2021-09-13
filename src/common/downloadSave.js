import { PermissionsAndroid, Platform } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import RNFS from 'react-native-fs'

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

export const saveImageToPhoto = async(imageUrl)=>{
  downLoad(imageUrl,'png')
}
export const saveVideoToPhoto = async (videouRL)=>{
  downLoad(videouRL,'mp4')
}
const downLoad = async (url,type)=>{
  if (Platform.OS === "android" && !(await hasAndroidPermission())) {
    // 提示
    return;
  }
  let timestamp = (new Date()).getTime();
  let random = String(((Math.random() * 1000000) | 0))
  let dirs = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : 'file://' + RNFS.ExternalStorageDirectoryPath;
  const toPath = `${dirs}/${timestamp+random}.${type}`;
  console.log('url==',url);
  console.log('toPath==',toPath);
  const options = {
    fromUrl: url,
    toFile: toPath,
    background: true,
    begin: (res) => {
    },
    progress: (res) => {
    }
  };
  try {
    const ret = RNFS.downloadFile(options);
    ret.promise.then(res => {
      const filePath = toPath.startsWith('file://') ? toPath : 'file://' + toPath 
      console.log('filePath===',filePath);
      CameraRoll.save(filePath).then(function(result) {
        console.log('saveToCameraRoll success');
        RNFS.unlink(toPath)
      }).catch(function(error) {
          console.log(' saveToCameraRollerror', error);
      });
    }).catch(err => {
    });
  } catch (e) {
  }
}
