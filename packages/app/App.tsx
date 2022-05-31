import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { HelloWorld } from "shared/components/HelloWorld";

export default function App() {
  return (
    <View style={styles.container}>
      <HelloWorld />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "wheat",
    alignItems: "center",
    justifyContent: "center",
  },
});
