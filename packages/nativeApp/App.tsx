import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { TailwindProvider } from 'tailwindcss-react-native';
import Navigation from './src/components/navigation';
import store from './src/redux';

export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <TailwindProvider>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </TailwindProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
