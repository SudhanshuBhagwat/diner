import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { MinusIcon, PlusIcon, StarIcon } from "react-native-heroicons/outline";
import { Font } from "@diner/shared/Font";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "../../redux/cartStore";

interface Props {}

const { width } = Dimensions.get("screen");

const DATA = {
  id: 1,
  name: "Pizza",
  menuName: "Pizzas",
  image:
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
  badges: ["Veg", "Italian"],
  description: "Jallepeno, Cheese, Tomatoes",
  price: 149,
  ratings: 3.6,
  ratingCount: 600,
};

const SPACING: number = 20;
const ICON_SIZE: number = 20;
const ICON_COLOR: string = "#999999";

const Item: React.FC<React.PropsWithChildren<Props> & Props> = () => {
  const [items, setItems] = useState<number>(1);
  const totalPrice = DATA.price * items;
  const dispatch = useDispatch();

  function increment() {
    setItems((items) => items + 1);
  }

  function decrement() {
    setItems((items) => items - 1);
  }

  function addItemToCart() {
    dispatch(
      addItemsToCart({
        id: DATA.id,
        description: DATA.description,
        image: DATA.image,
        name: DATA.name,
        price: DATA.price,
        restaurant: "Test",
        badges: DATA.badges,
        quantity: items,
      })
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
        }}
      >
        <Image
          style={styles.image}
          source={{
            uri: DATA.image,
          }}
        />
        <View style={styles.content}>
          <Text style={styles.menuName}>{DATA.menuName}</Text>
          <Text style={styles.name}>{DATA.name}</Text>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <StarIcon size={24} color={"yellow"} fill={"yellow"} />
            <Text style={styles.ratings}>{DATA.ratings}</Text>
            <Text style={styles.menuName}>({DATA.ratingCount}+)</Text>
          </View>
          <Text style={styles.description}>{DATA.description}</Text>
        </View>
      </View>
      <View>
        <View style={styles.buttonContainer}>
          <View style={styles.itemCountContainer}>
            <Pressable onPress={decrement}>
              <View
                style={{
                  marginRight: SPACING,
                  marginLeft: 6,
                }}
              >
                <MinusIcon size={ICON_SIZE} color={ICON_COLOR} />
              </View>
            </Pressable>
            <Text style={styles.itemCount}>{items}</Text>
            <Pressable onPress={increment}>
              <View
                style={{
                  marginLeft: SPACING,
                  marginRight: 6,
                }}
              >
                <PlusIcon size={ICON_SIZE} color={ICON_COLOR} />
              </View>
            </Pressable>
          </View>
          <Pressable style={styles.addToCart} onPress={addItemToCart}>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontFamily: Font[600],
              }}
            >
              Add to cart
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontFamily: Font[600],
              }}
            >
              ₹{totalPrice}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  image: {
    height: 260,
    width: width * 0.9,
    borderRadius: 16,
    resizeMode: "cover",
  },
  content: {
    marginTop: 16,
  },
  menuName: {
    fontSize: 16,
    fontFamily: Font[600],
    color: "#bbbbbb",
  },
  name: {
    fontSize: 32,
    fontFamily: Font[900],
  },
  description: {
    fontSize: 18,
    color: "#9c9c9c",
    marginTop: 8,
  },
  itemCountContainer: {
    backgroundColor: "#eeeeee",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  itemCount: {
    fontFamily: Font[600],
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  addToCart: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#242424",
    marginLeft: 12,
    paddingHorizontal: 24,
  },
  ratings: {
    fontSize: 16,
    fontFamily: Font[600],
    marginHorizontal: 4,
  },
});

export default Item;
