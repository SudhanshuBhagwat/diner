import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Root from './Root';
import store from './src/redux';

export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <Provider store={store}>
        <Root />
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
