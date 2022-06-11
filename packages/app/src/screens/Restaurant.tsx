import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Font } from "shared/Font";
import { RootStackParams } from "../../Root";

type Props = NativeStackScreenProps<RootStackParams, "Restaurant">;

const Restaurant: React.FC<React.PropsWithChildren<Props> & Props> = ({
  route,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Restaurant {route.params?.restaurant}</Text>
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

export default Restaurant;
