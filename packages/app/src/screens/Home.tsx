import React from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import { Font } from "shared/Font";
import MenuCard, { Item } from "../components/Home/MenuCard";
import RestaurantCard from "../components/Home/RestaurantCard";
import { DATA } from "../fixtures/items";
import { RESTAURANTS } from "../fixtures/restaurants";

interface Props {}

const Separator = () => {
  return (
    <View
      style={{
        width: 14,
      }}
    />
  );
};

const Home: React.FC<React.PropsWithChildren<Props> & Props> = () => {
  return (
    <View style={styles.container}>
      {DATA.map((menu) => (
        <View key={menu.id} style={styles.section}>
          <Text style={styles.title}>{menu.name}</Text>
          <View style={styles.list}>
            <FlatList
              data={menu.items}
              horizontal
              renderItem={({ item }) => <MenuCard item={item} />}
              keyExtractor={(item) => String(item.id)}
              contentContainerStyle={{ paddingRight: 16 }}
              ItemSeparatorComponent={() => <Separator />}
            />
          </View>
        </View>
      ))}
      <View style={styles.section}>
        <Text style={styles.title}>Restaurants</Text>
        <View style={styles.list}>
          <FlatList
            data={RESTAURANTS}
            horizontal
            renderItem={({ item }) => <RestaurantCard restaurant={item} />}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={{ paddingRight: 16 }}
            ItemSeparatorComponent={() => <Separator />}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },
  section: {
    paddingLeft: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: Font[900],
  },
  list: {
    marginTop: 8,
  },
});

export default Home;
