import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Font } from "../Font";
import FText from "./core/FText";
import Spinner from "./core/Spinner";

interface Props {
  handleLogin: () => void;
  handleGoogleSignIn: () => void;
}

const AuthForm: React.FC<React.PropsWithChildren<Props> & Props> = ({
  handleLogin,
  handleGoogleSignIn,
}) => {
  return (
    <View style={styles.container}>
      <FText style={styles.title}>Sign In to Diner</FText>
      <View
        style={{
          width: "100%",
        }}
      >
        <View>
          <View style={styles.inputGroup}>
            <FText style={styles.label}>Email</FText>
            <TextInput
              style={styles.input}
              placeholder="john.doe@example.com"
            />
          </View>
          <View style={styles.inputGroup}>
            <FText style={styles.label}>Password</FText>
            <TextInput
              placeholder="●●●●●●"
              style={styles.input}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <FText style={styles.buttonText}>Login</FText>
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingVertical: 16,
            alignItems: "center",
          }}
        >
          <FText
            style={{
              fontFamily: "Inter_400Regular",
            }}
          >
            Or
          </FText>
        </View>
        <View>
          <TouchableOpacity onPress={handleGoogleSignIn} style={styles.button}>
            <FText style={styles.buttonText}>
              Sign In with <Text style={styles.googleColor}>Google</Text>
            </FText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
  },
  inputGroup: {
    marginBottom: 14,
  },
});

export default AuthForm;
