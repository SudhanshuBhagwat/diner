import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Root from "./Root";

export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar backgroundColor="white" style="dark" />
      <Root />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
