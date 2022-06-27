import React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { Font } from "@diner/shared/Font";
import { PADDING_LEFT } from "../utilities/constants";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { CartItem, items, totalPrice } from "../redux/cartStore";
import MenuItem from "../components/Menu/MenuItem";
import CartPriceItem from "../components/CartPriceItem";

interface Props {}

const ShoppingCart: React.FC<React.PropsWithChildren<Props> & Props> = () => {
  const itemsInCart = useSelector((state: RootState) => items(state));
  const totalItemsPrice = useSelector((state: RootState) => totalPrice(state));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart</Text>
      {itemsInCart.length > 0 ? (
        <View>
          {itemsInCart.map((item: CartItem) => (
            <MenuItem key={item.id} item={item} />
          ))}
          <View
            style={{
              height: 1,
              backgroundColor: "#eeeeee",
              marginVertical: 6,
            }}
          />
          <CartPriceItem title="Total" price={totalItemsPrice} />
        </View>
      ) : (
        <View
          style={{
            height: "50%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: Font[600],
              color: "#797979",
            }}
          >
            No items in cart
          </Text>
        </View>
      )}
      <Pressable style={styles.checkout} onPress={() => {}}>
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 16,
            fontFamily: Font[600],
          }}
        >
          Checkout
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: PADDING_LEFT,
  },
  title: {
    fontSize: 26,
    fontFamily: Font[900],
  },
  checkout: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    left: 16,
    borderRadius: 8,
    backgroundColor: "#242424",
    paddingVertical: 16,
  },
});

export default ShoppingCart;
