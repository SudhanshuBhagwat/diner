import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { TailwindProvider } from 'tailwindcss-react-native';
import 'tailwindcss-react-native/types.d';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navigation from './src/components/navigation';
import store from './src/redux';

const queryClient = new QueryClient();

export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <QueryClientProvider client={queryClient}>
        <TailwindProvider>
          <Provider store={store}>
            <Navigation />
          </Provider>
        </TailwindProvider>
      </QueryClientProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
