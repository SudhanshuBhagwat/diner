import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Font } from "shared/Font";

export interface Item {
  id: number;
  name: string;
  restaurant: string;
  badges: string[];
  description: string;
  price: number;
}

interface Props {
  item: Item;
}

const MenuCard: React.FC<React.PropsWithChildren<Props> & Props> = ({
  item,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.text}>
          {item.name} @ {item.restaurant}
        </Text>
        <View style={styles.badges}>
          {item.badges.map((badge: string, idx: number) => (
            <Text key={idx} style={styles.badge}>
              {badge}
            </Text>
          ))}
        </View>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  detailsContainer: {
    justifyContent: "space-between",
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 12,
    backgroundColor: "#16ff",
    marginRight: 8,
  },
  text: {
    fontFamily: Font[700],
    fontSize: 16,
  },
  price: {
    fontFamily: Font[700],
    fontSize: 16,
  },
  description: {
    fontFamily: Font[500],
    color: "#797979",
    fontSize: 16,
  },
  badges: {
    flexDirection: "row",
  },
  badge: {
    fontFamily: Font[500],
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 6,
    backgroundColor: "wheat",
    borderRadius: 6,
  },
});

export default MenuCard;
