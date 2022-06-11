import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Font } from "shared/Font";
import { RootStackParams } from "../../Root";
import { RESTAURANTS } from "../fixtures/restaurants";

type Props = NativeStackScreenProps<RootStackParams, "Restaurant">;

const Restaurant: React.FC<React.PropsWithChildren<Props> & Props> = ({
  route,
}) => {
  const restaurantId = route.params.restaurant;
  const restaurant = RESTAURANTS.find((res) => res.id === +restaurantId);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{restaurant?.name}</Text>
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
