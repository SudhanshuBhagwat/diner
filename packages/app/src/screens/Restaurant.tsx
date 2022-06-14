import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import { LocationMarkerIcon } from "react-native-heroicons/outline";
import LinearGradient from "react-native-linear-gradient";
import { SharedElement } from "react-navigation-shared-element";
import { Font } from "shared/Font";
import { RootStackParams } from "../../Root";
import Nav from "../components/Home/Nav";
import { RESTAURANTS } from "../fixtures/restaurants";

type Props = NativeStackScreenProps<RootStackParams, "Restaurant">;

const Restaurant: React.FC<React.PropsWithChildren<Props> & Props> = ({
  route,
}) => {
  const restaurant = route.params.restaurant;

  return (
    <View style={styles.container}>
      <View>
        <SharedElement id={String(restaurant.id)}>
          <ImageBackground
            style={styles.image}
            source={{
              uri: restaurant.image,
            }}
          >
            <LinearGradient
              colors={["#00000000", "#000000"]}
              style={{ height: "100%", width: "100%" }}
            ></LinearGradient>
          </ImageBackground>
        </SharedElement>
        <Nav />
        <View style={styles.contents}>
          <Text style={styles.text}>{restaurant.name}</Text>
          <View style={styles.locationContainer}>
            <LocationMarkerIcon size={16} color="#dddddd" />
            <Text style={styles.location}>{restaurant.location}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 350,
    aspectRatio: 16 / 9,
    resizeMode: "cover",
  },
  contents: {
    position: "absolute",
    bottom: 16,
    left: 16,
  },
  text: {
    fontSize: 26,
    color: "white",
    fontFamily: Font[900],
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontSize: 16,
    color: "#dddddd",
    fontFamily: Font[600],
    marginLeft: 4,
  },
});

export default Restaurant;
