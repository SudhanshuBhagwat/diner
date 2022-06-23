import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  Pressable,
  LayoutChangeEvent,
} from "react-native";
import { Font } from "@diner/shared/Font";
import { Item } from "../../models/items";
import { PlusIcon } from "react-native-heroicons/outline";

interface Props {
  item: Item;
  onPress: () => void;
  showAddButton?: boolean;
  onAddButtonClicked?: () => void;
}

const MenuCard: React.FC<React.PropsWithChildren<Props> & Props> = ({
  item,
  onPress,
  showAddButton,
  onAddButtonClicked,
}) => {
  return (
    <Pressable onPress={onPress}>
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
              alignItems: "center",
            }}
          >
            <View>
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
            </View>
            {showAddButton && (
              <Pressable onPress={onAddButtonClicked}>
                <View style={styles.addToCardButton}>
                  <PlusIcon color={"white"} size={16} />
                </View>
              </Pressable>
            )}
          </View>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.price}>₹{item.price}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 6,
  },
  detailsContainer: {
    // justifyContent: "space-between",
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 12,
    marginRight: 8,
    aspectRatio: 1,
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
  addToCardButton: {
    backgroundColor: "#3f3f3f",
    borderRadius: 8,
    padding: 8,
  },
});

export default MenuCard;
