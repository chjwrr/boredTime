#!/bin/bash

version="1.0.0"
versionNumber="100"

cp -f android/app/build.gradle android/app/build.gradle.bak


sed -i "" "s/versionCode .*/versionCode $versionNumber/" android/app/build.gradle
sed -i "" "s/versionName .*/versionName \"$version\"/" android/app/build.gradle



echo "✨ ✨ ✨ 神说要有光 android打包Release模式已启动 ✨ ✨ ✨ "
cd android
./gradlew assembleRelease

cd ..
rm -f android/app/build.gradle

mv android/app/build.gradle.bak android/app/build.gradle
