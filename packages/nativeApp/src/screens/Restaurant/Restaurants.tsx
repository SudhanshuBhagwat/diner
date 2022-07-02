import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, StyleSheet, View, FlatList, Pressable } from 'react-native';
import { PlusIcon } from 'react-native-heroicons/outline';
import { RootStackParams } from '../../components/navigation';
import { RESTAURANTS } from '../../fixtures/restaurants';
import RestaurantCard from '../../components/Home/RestaurantCard';
import { Separator } from '../Home';

type Props = NativeStackScreenProps<RootStackParams, 'Restaurants'>;

const Restaurants: React.FC<React.PropsWithChildren<Props> & Props> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
          paddingRight: 16,
        }}>
        <Text style={styles.text}>Your Restaurants</Text>
        <Pressable onPress={() => navigation.push('AddRestaurant')}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 16,
              paddingVertical: 8,
              backgroundColor: '#3f3f3f',
              borderRadius: 8,
              alignItems: 'center',
            }}>
            <PlusIcon color="white" size={20} />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 8,
                color: 'white',
              }}>
              Add
            </Text>
          </View>
        </Pressable>
      </View>
      <FlatList
        data={RESTAURANTS}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.push('Restaurant', {
                restaurant: item,
              })
            }>
            <RestaurantCard restaurant={item} large />
          </Pressable>
        )}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={{ paddingRight: 16 }}
        ItemSeparatorComponent={() => <Separator />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingBottom: 16,
  },
  text: {
    fontSize: 24,
    marginBottom: 8,
  },
});

export default Restaurants;
