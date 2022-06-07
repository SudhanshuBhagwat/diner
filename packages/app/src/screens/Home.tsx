import React from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import { Font } from "shared/Font";
import MenuCard, { Item } from "../components/Home/MenuCard";

interface Props {}

const DATA = [
  {
    id: 1,
    name: "Pizza",
    restaurant: "Test",
    badges: ["Veg", "Italian"],
    description: "Jallepeno, Cheese, Tomatoes",
    price: 149,
  },
  {
    id: 2,
    name: "Pizza",
    restaurant: "Test",
    badges: ["Veg", "Italian"],
    description: "Jallepeno, Cheese, Tomatoes",
    price: 149,
  },
  {
    id: 3,
    name: "Pizza",
    restaurant: "Test",
    badges: ["Veg", "Italian"],
    description: "Jallepeno, Cheese, Tomatoes",
    price: 149,
  },
];

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
      <View style={styles.section}>
        <Text style={styles.title}>Recently Tried</Text>
        <View style={styles.list}>
          <FlatList
            data={DATA}
            horizontal
            renderItem={({ item }) => <MenuCard item={item} />}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={{ paddingRight: 16 }}
            ItemSeparatorComponent={() => <Separator />}
          />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Suggested for you</Text>
        <View style={styles.list}>
          <FlatList
            data={DATA}
            horizontal
            renderItem={({ item }) => <MenuCard item={item} />}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={{ paddingRight: 16 }}
            ItemSeparatorComponent={() => <Separator />}
          />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>New Restaurants</Text>
        <View style={styles.list}>
          <FlatList
            data={DATA}
            horizontal
            renderItem={({ item }) => <MenuCard item={item} />}
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
