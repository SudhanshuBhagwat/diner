import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LocationMarkerIcon, StarIcon } from 'react-native-heroicons/outline';
import LinearGradient from 'react-native-linear-gradient';
import { SharedElement } from 'react-navigation-shared-element';
import { useDispatch } from 'react-redux';
import MenuCard from '../../components/Home/MenuCard';
import Nav from '../../components/Home/Nav';
import { RootStackParams } from '../../components/navigation';
import Item from '../../components/Restaurant/Item';
import Screen from '../../components/Screen';
import MenuBottomSheet from '../../components/shared/BottomSheet';
import { DATA } from '../../fixtures/menuItems';
import { RESTAURANTS } from '../../fixtures/restaurants';
import { addToCart } from '../../redux/cartStore';

type Props = NativeStackScreenProps<RootStackParams, 'Restaurant'>;
const ITEM_OPEN_TIMEOUT = 1000;

const Restaurant: React.FC<React.PropsWithChildren<Props> & Props> = ({
  route,
}) => {
  const restaurant = route.params?.restaurantId
    ? RESTAURANTS.find(res => res.id === route.params.restaurantId)
    : route.params.restaurant;
  const item = route.params.item;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (item) {
        setIsOpen(true);
      }
    }, ITEM_OPEN_TIMEOUT);
    return () => clearTimeout(timeout);
  }, [item]);

  return (
    <Screen style={styles.container}>
      <View>
        <SharedElement id={String(restaurant.id)}>
          <ImageBackground
            style={styles.image}
            source={{
              uri: restaurant.image,
            }}>
            <LinearGradient
              colors={['#00000000', '#000000']}
              style={styles.linearGradient}
            />
          </ImageBackground>
        </SharedElement>
        <Nav />
        <View style={styles.headerContents}>
          <View>
            <Text style={styles.text}>{restaurant.name}</Text>
            <View style={styles.locationContainer}>
              <LocationMarkerIcon size={16} color="#dddddd" />
              <Text style={styles.location}>{restaurant.location}</Text>
            </View>
          </View>
          <View style={styles.ratingsContainer}>
            <Text style={styles.ratingsText}>{restaurant.rating}</Text>
            <StarIcon size={24} color={'yellow'} />
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexGrow: 1,
        }}>
        <SectionList
          contentContainerStyle={styles.contents}
          sections={DATA}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => (
            <MenuCard
              item={item}
              showAddButton
              onAddButtonClicked={() => dispatch(addToCart(item))}
              onPress={() => setIsOpen(true)}
            />
          )}
          renderSectionHeader={({ section: { name } }) => (
            <Text style={styles.title}>{name}</Text>
          )}
        />
      </View>
      <MenuBottomSheet open={isOpen} onClose={() => setIsOpen(false)}>
        <Item close={() => setIsOpen(false)} />
      </MenuBottomSheet>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 320,
    aspectRatio: 16 / 9,
    resizeMode: 'cover',
  },
  contents: {
    paddingLeft: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
  },
  headerContents: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 26,
    color: 'white',
    fontFamily: 'Inter',
    fontWeight: '900',
  },
  linearGradient: { height: '100%', width: '100%' },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 16,
    color: '#dddddd',
    marginLeft: 4,
    fontFamily: 'Inter',
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter',
    color: 'black',
    fontWeight: '900',
  },
  list: {
    marginTop: 8,
  },
  ratingsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 30,
  },
  ratingsText: {
    fontSize: 18,
    marginRight: 6,
    color: '#dddddd',
    fontFamily: 'Inter',
    fontWeight: '600',
  },
});

export default Restaurant;
