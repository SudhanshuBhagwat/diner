import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Font } from "@diner/shared/Font";

interface Props {
  title: string;
  price: number;
}

const CartPriceItem: React.FC<React.PropsWithChildren<Props> & Props> = ({
  title,
  price,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>₹{price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 16,
    marginVertical: 4,
  },
  title: {
    fontSize: 18,
    fontFamily: Font[600],
    color: "#9b9b9b",
  },
  price: {
    fontSize: 18,
    fontFamily: Font[600],
  },
});

export default CartPriceItem;
