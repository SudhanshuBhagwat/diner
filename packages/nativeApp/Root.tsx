import React from 'react';
import {View} from 'react-native';
import Navigation from './src/components/navigation';

function Root() {
  return (
    <View style={{flex: 1}}>
      <Main />
    </View>
  );
}

function Main() {
  return (
    <>
      <Navigation />
    </>
  );
}

export default Root;
