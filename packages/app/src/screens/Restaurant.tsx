import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LocationMarkerIcon } from "react-native-heroicons/outline";
import LinearGradient from "react-native-linear-gradient";
import { SharedElement } from "react-navigation-shared-element";
import { Font } from "shared/Font";
import { RootStackParams } from "../../Root";
import MenuCard from "../components/Home/MenuCard";
import Nav from "../components/Home/Nav";
import MenuBottomSheet from "../components/Restaurant/MenuBottomSheet";
import { DATA } from "../fixtures/items";
import { Separator } from "./Home";

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
        <View style={styles.headerContents}>
          <Text style={styles.text}>{restaurant.name}</Text>
          <View style={styles.locationContainer}>
            <LocationMarkerIcon size={16} color="#dddddd" />
            <Text style={styles.location}>{restaurant.location}</Text>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={styles.contents}>
          {DATA.map((menu) => (
            <View key={menu.id}>
              <Text style={styles.title}>{menu.name}</Text>
              <View style={styles.list}>
                {DATA[0].items.map((item) => (
                  <View key={item.id} style={styles.separator}>
                    <MenuCard item={item} />
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 320,
    aspectRatio: 16 / 9,
    resizeMode: "cover",
  },
  contents: {
    paddingVertical: 16,
    paddingLeft: 16,
  },
  headerContents: {
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
  title: {
    fontSize: 20,
    fontFamily: Font[900],
  },
  list: {
    marginTop: 8,
  },
  separator: {
    paddingVertical: 6,
  },
});

export default Restaurant;