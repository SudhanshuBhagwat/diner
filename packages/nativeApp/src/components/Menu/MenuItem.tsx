import { Font } from "@diner/shared/Font";
import React, { useState } from "react";
import { Text, StyleSheet, View, Image, Pressable } from "react-native";
import { MinusIcon, PlusIcon, XIcon } from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import {
  addToCart,
  CartItem,
  givenItemCoumt,
  removeFromCart,
  removeItem,
} from "../../redux/cartStore";
import { ICON_COLOR, ICON_SIZE } from "../../utilities/constants";

interface Props {
  item: CartItem;
}

const MenuItem: React.FC<React.PropsWithChildren<Props> & Props> = ({
  item,
}) => {
  const dispatch = useDispatch();

  function increment() {
    dispatch(addToCart(item));
  }

  function decrement() {
    dispatch(removeFromCart(item));
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: item.image,
        }}
        style={styles.image}
      />
      <View style={styles.detailsContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.restaurant}</Text>
          </View>
          <Pressable onPress={() => dispatch(removeItem(item))}>
            <View
              style={{
                marginTop: 6,
                backgroundColor: "#eeeeee",
                padding: 6,
                borderRadius: 50,
              }}
            >
              <XIcon size={16} color={ICON_COLOR} />
            </View>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 4,
          }}
        >
          <View style={styles.itemCountContainer}>
            <Pressable onPress={decrement}>
              <View
                style={{
                  marginRight: 20,
                  marginLeft: 6,
                }}
              >
                <MinusIcon size={16} color={ICON_COLOR} />
              </View>
            </Pressable>
            <Text style={styles.itemCount}>{item.quantity}</Text>
            <Pressable onPress={increment}>
              <View
                style={{
                  marginLeft: 20,
                  marginRight: 6,
                }}
              >
                <PlusIcon size={16} color={ICON_COLOR} />
              </View>
            </Pressable>
          </View>
          <Text style={styles.price}>₹{item.quantity * item.price}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingRight: 16,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  description: {
    fontFamily: Font[500],
    color: "#797979",
    fontSize: 16,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 12,
    marginRight: 8,
    aspectRatio: 1,
  },
  name: {
    fontFamily: Font[700],
    fontSize: 18,
  },
  price: {
    fontFamily: Font[700],
    fontSize: 16,
  },
  itemCountContainer: {
    backgroundColor: "#eeeeee",
    borderRadius: 8,
    padding: 4,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  itemCount: {
    fontFamily: Font[600],
    fontSize: 20,
  },
});

export default MenuItem;
