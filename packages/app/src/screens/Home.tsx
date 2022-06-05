import React from "react";
import { Text, StyleSheet } from "react-native";
import { Font } from "shared/Font";

interface Props {}

const Home: React.FC<React.PropsWithChildren<Props> & Props> = () => {
  return <Text style={styles.text}>Home</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: Font[900],
  },
});

export default Home;
