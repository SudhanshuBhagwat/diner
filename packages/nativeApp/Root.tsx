import React from 'react';
import { StatusBar } from 'react-native';
import Navigation from './src/components/navigation';

function Root() {
  return (
    <>
      <StatusBar barStyle="light-content" translucent />
      <Navigation />
    </>
  );
}

export default Root;
