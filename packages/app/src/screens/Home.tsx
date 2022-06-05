import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Font } from "shared/Font";

interface Props {}

const Home: React.FC<React.PropsWithChildren<Props> & Props> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: Font[900],
  },
});

export default Home;
