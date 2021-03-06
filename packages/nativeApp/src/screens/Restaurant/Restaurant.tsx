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
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import MenuCard from '../../components/Home/MenuCard';
import Nav from '../../components/Home/Nav';
import { RootStackParams } from '../../components/navigation';
import Item from '../../components/Restaurant/Item';
import Screen from '../../components/Screen';
import MenuBottomSheet from '../../components/shared/BottomSheet';
import Spinner from '../../components/Spinner';
import { Restaurant as IRestaurant } from '../../models/restaurant';
import { addToCart } from '../../redux/cartStore';
import { BASE_URL } from '../../utilities/constants';
import { getQuery } from '../../utilities/fetchers';

type Props = NativeStackScreenProps<RootStackParams, 'Restaurant'>;
const ITEM_OPEN_TIMEOUT = 1000;

const Restaurant: React.FC<React.PropsWithChildren<Props> & Props> = ({
  route,
}) => {
  let restaurant: IRestaurant;
  const restaurantId = route.params.restaurantId;

  const { isLoading, data } = useQuery(
    'restaurant',
    () =>
      restaurantId
        ? getQuery(`${BASE_URL}/restaurants/${route.params.restaurantId}`)
        : null,
    {
      enabled: !!restaurantId,
    },
  );
  restaurant = data ?? route.params.restaurant;
  const { isLoading: menuIsLoading, data: menuData } = useQuery(
    'restaurant-menu',
    () => getQuery(`${BASE_URL}/restaurants/${restaurant.id}/menu`),
  );
  const item = route.params.item;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState({
    item: null,
    section: null,
  });
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
    <Screen style={styles.container} loading={isLoading}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <View>
            <SharedElement id={String(restaurant.id)}>
              <ImageBackground
                style={styles.image}
                source={{
                  uri: restaurant.imageUrl,
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
              <View className="bg-[#ffffff] rounded-md flex-row items-center px-2 py-1 mr-8">
                <Text className="font-semibold text-lg font-inter mr-2 text-black">
                  {restaurant.rating}
                </Text>
                <StarIcon size={24} color={'orange'} fill={'yellow'} />
              </View>
            </View>
          </View>
          <View className="flex-1">
            {menuIsLoading ? (
              <Spinner />
            ) : (
              <SectionList
                contentContainerStyle={styles.contents}
                sections={menuData}
                keyExtractor={(currItem, index) => `${currItem.id}-${index}`}
                renderItem={({ item, section }) => (
                  <MenuCard
                    item={item}
                    showAddButton
                    onAddButtonClicked={() => dispatch(addToCart(item))}
                    onPress={() => {
                      setSelectedItem({
                        section,
                        item,
                      });
                      setIsOpen(true);
                    }}
                  />
                )}
                renderSectionHeader={({ section: { name } }) => (
                  <Text style={styles.title}>{name}</Text>
                )}
              />
            )}
          </View>
          <MenuBottomSheet open={isOpen} onClose={() => setIsOpen(false)}>
            <Item
              item={selectedItem.item}
              section={selectedItem.section}
              close={() => setIsOpen(false)}
            />
          </MenuBottomSheet>
        </>
      )}
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
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  headerContents: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    width: '100%',
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
    marginTop: 20,
  },
  list: {
    marginTop: 8,
  },
});

export default Restaurant;
