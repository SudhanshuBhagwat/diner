import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function HelloWorld() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello from shared</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 26,
  },
});
