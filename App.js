/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
     <Text>asdfasdf</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
