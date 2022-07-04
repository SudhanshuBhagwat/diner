import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, StyleSheet, View, FlatList, Pressable } from 'react-native';
import MenuCard from '../components/Home/MenuCard';
import RestaurantCard from '../components/Home/RestaurantCard';
import { RootStackParams } from '../components/navigation';
import { DATA } from '../fixtures/items';
import { RESTAURANTS } from '../fixtures/restaurants';

type Props = NativeStackScreenProps<RootStackParams, 'Home'>;

export const Separator = () => {
  return (
    <View
      style={{
        width: 14,
        height: 16,
      }}
    />
  );
};

const Home: React.FC<React.PropsWithChildren<Props> & Props> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {DATA.map(menu => (
        <View key={menu.id} style={styles.section}>
          <Text style={styles.title}>{menu.name}</Text>
          <FlatList
            data={menu.items}
            horizontal
            renderItem={({ item }) => (
              <MenuCard
                item={item}
                onPress={() => {
                  navigation.push('Restaurant', {
                    restaurant: {
                      id: 2,
                      name: 'Shwarma King',
                      rating: 4.5,
                      image:
                        'https://images.unsplash.com/photo-1623800330578-2cd67efaec75?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
                      location: 'Akurdi',
                    },
                    item,
                  });
                }}
              />
            )}
            keyExtractor={item => String(item.id)}
            contentContainerStyle={styles.contentContainer}
            ItemSeparatorComponent={() => <Separator />}
          />
        </View>
      ))}
      <View style={styles.section}>
        <Text style={styles.title}>Restaurants</Text>
        <FlatList
          data={RESTAURANTS}
          horizontal
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.push('Restaurant', {
                  restaurant: item,
                })
              }>
              <RestaurantCard restaurant={item} />
            </Pressable>
          )}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={styles.contentContainer}
          ItemSeparatorComponent={() => <Separator />}
        />
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
    color: 'black',
    fontFamily: 'Inter',
    fontWeight: '900',
  },
  contentContainer: { paddingRight: 16 },
});

export default Home;
