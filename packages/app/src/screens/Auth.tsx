import React from "react";
import { View, StyleSheet } from "react-native";
import AuthForm from "shared/components/AuthForm";

function Auth() {
  return (
    <View style={styles.container}>
      <AuthForm handleGoogleSignIn={() => {}} handleLogin={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Auth;
