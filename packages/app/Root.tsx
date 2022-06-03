import React from "react";
import { View, StyleSheet } from "react-native";
import AuthForm from "shared/components/AuthForm";

export function Root() {
  return (
    <View style={styles.container}>
      <AuthForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
