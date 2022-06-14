import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, StyleSheet, View, Image, Dimensions } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { Font } from "shared/Font";
import { RootStackParams } from "../../Root";
import { RESTAURANTS } from "../fixtures/restaurants";

type Props = NativeStackScreenProps<RootStackParams, "Restaurant">;

const Restaurant: React.FC<React.PropsWithChildren<Props> & Props> = ({
  route,
}) => {
  const restaurant = route.params.restaurant;

  return (
    <View style={styles.container}>
      <SharedElement id={String(restaurant.id)}>
        <Image
          source={{
            uri: restaurant.image,
          }}
          style={styles.image}
        />
      </SharedElement>
      <Text style={styles.text}>{restaurant.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 300,
    aspectRatio: 16 / 9,
    resizeMode: "cover",
  },
  text: {
    fontFamily: Font[900],
  },
});

export default Restaurant;
