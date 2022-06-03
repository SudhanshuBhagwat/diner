import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Font } from "../Font";

function AuthForm() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In to Diner</Text>
      <View
        style={{
          width: "100%",
        }}
      >
        <View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="john.doe@example.com"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="●●●●●●"
              style={styles.input}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingVertical: 16,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_400Regular",
            }}
          >
            Or
          </Text>
        </View>
        <View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              Sign In with <Text style={styles.googleColor}>Google</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: Font[900],
    fontSize: 38,
    marginVertical: 16,
  },
  input: {
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#efefef",
    borderRadius: 6,
    fontFamily: Font[400],
  },
  button: {
    width: "100%",
    paddingVertical: 16,
    backgroundColor: "#eeeeee",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: Font[800],
    fontSize: 16,
  },
  googleColor: {
    color: "#4285F4",
  },
  label: {
    marginVertical: 6,
    fontSize: 16,
    fontFamily: Font[400],
  },
  inputGroup: {
    marginBottom: 14,
  },
});

export default AuthForm;
