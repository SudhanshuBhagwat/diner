import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, StyleSheet, View, Image, Dimensions } from "react-native";
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
      <Image
        source={{
          uri: restaurant?.image,
        }}
        style={styles.image}
      />
      <Text style={styles.text}>{restaurant?.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.3,
  },
  text: {
    fontFamily: Font[900],
  },
});

export default Restaurant;
