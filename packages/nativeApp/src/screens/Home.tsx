import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, StyleSheet, View, FlatList, Pressable } from 'react-native';
import { useQuery } from 'react-query';
import MenuCard from '../components/Home/MenuCard';
import RestaurantCard from '../components/Home/RestaurantCard';
import { RootStackParams } from '../components/navigation';
import Screen from '../components/Screen';
import { DATA } from '../fixtures/items';
import { BASE_URL } from '../utilities/constants';
import { getQuery } from '../utilities/fetchers';

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
  const { data } = useQuery('restaurants', () =>
    getQuery(`${BASE_URL}/restaurants`),
  );

  return (
    <Screen>
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
                      imageUrl:
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
          data={data}
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
    </Screen>
  );
};

const styles = StyleSheet.create({
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
