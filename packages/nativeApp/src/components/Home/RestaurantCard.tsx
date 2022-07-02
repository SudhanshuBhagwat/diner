import React, { memo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { LocationMarkerIcon, StarIcon } from "react-native-heroicons/outline";
import { SharedElement } from "react-navigation-shared-element";
import { Font } from "@diner/shared/Font";
import { Restaurant } from "../../models/restaurant";

interface Props {
  restaurant: Restaurant;
  large?: boolean;
}

const RestaurantCard: React.FC<React.PropsWithChildren<Props> & Props> = ({
  restaurant,
  large,
}) => {
  return (
    <View>
      <SharedElement id={`${restaurant.id}`}>
        <Image
          style={[
            styles.image,
            large && {
              width: "100%",
              height: 200,
            },
          ]}
          source={{
            uri: restaurant.image,
          }}
        />
      </SharedElement>
      <View style={styles.detailsContainer}>
        <View>
          <Text style={styles.text}>{restaurant.name}</Text>
          <View style={styles.locationContainer}>
            <LocationMarkerIcon size={12} color="#a1a1a1" />
            <Text style={styles.location}>{restaurant.location}</Text>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{restaurant.rating}</Text>
          <StarIcon size={16} color="white" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 240,
    borderRadius: 14,
    resizeMode: "cover",
  },
  text: {
    marginTop: 4,
    fontSize: 16,
    fontFamily: Font[700],
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontSize: 12,
    color: "#a1a1a1",
    fontFamily: Font[500],
    marginLeft: 4,
  },
  detailsContainer: {
    paddingHorizontal: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e44646",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  rating: {
    fontFamily: Font[600],
    color: "white",
    marginRight: 2,
  },
});

export default RestaurantCard;
