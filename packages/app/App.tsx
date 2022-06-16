import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import Root from "./Root";
import store from "./src/redux";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.root}>
        <StatusBar backgroundColor="white" style="dark" />
        <Root />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
