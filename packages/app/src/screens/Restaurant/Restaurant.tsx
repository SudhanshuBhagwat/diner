import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  LayoutChangeEvent,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LocationMarkerIcon } from "react-native-heroicons/outline";
import LinearGradient from "react-native-linear-gradient";
import { SharedElement } from "react-navigation-shared-element";
import { useDispatch } from "react-redux";
import { Font } from "@diner/shared/Font";
import MenuCard from "../../components/Home/MenuCard";
import Nav from "../../components/Home/Nav";
import { RootStackParams } from "../../components/navigation";
import Item from "../../components/Restaurant/Item";
import MenuBottomSheet from "../../components/shared/BottomSheet";
import { DATA } from "../../fixtures/menuItems";
import { addToCart } from "../../redux/cartStore";

type Props = NativeStackScreenProps<RootStackParams, "Restaurant">;
const ITEM_OPEN_TIMEOUT = 1000;

const Restaurant: React.FC<React.PropsWithChildren<Props> & Props> = ({
  route,
}) => {
  const restaurant = route.params.restaurant;
  const item = route.params.item;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (item) {
        setIsOpen(true);
      }
    }, ITEM_OPEN_TIMEOUT);

    return () => clearTimeout(timeout);
  }, []);

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
      <View
        style={{
          flex: 1,
          flexGrow: 1,
          top: -16,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          overflow: "hidden",
        }}
      >
        <SectionList
          contentContainerStyle={styles.contents}
          sections={DATA}
          keyExtractor={(item, index) => `${item.id}-index`}
          renderItem={({ item }) => (
            <MenuCard
              item={item}
              showAddButton
              onAddButtonClicked={() => dispatch(addToCart(item))}
              onPress={() => setIsOpen(true)}
            />
          )}
          renderSectionHeader={({ section: { name } }) => (
            <Text style={styles.title}>{name}</Text>
          )}
        />
      </View>
      {isOpen && (
        <MenuBottomSheet onClose={() => setIsOpen(false)}>
          <Item />
        </MenuBottomSheet>
      )}
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
    paddingLeft: 16,
    paddingVertical: 16,
    backgroundColor: "white",
  },
  headerContents: {
    position: "absolute",
    bottom: 24,
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
});

export default Restaurant;
