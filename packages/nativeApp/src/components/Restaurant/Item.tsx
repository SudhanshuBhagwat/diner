import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import { MinusIcon, PlusIcon, StarIcon } from 'react-native-heroicons/outline';
import { useDispatch } from 'react-redux';
import { Item as IItem } from '../../models/items';
import { addItemsToCart } from '../../redux/cartStore';
import { ICON_COLOR, ICON_SIZE } from '../../utilities/constants';

interface Props {
  item: IItem;
  close: () => void;
}

const { width } = Dimensions.get('screen');

const SPACING: number = 20;

const Item: React.FC<React.PropsWithChildren<Props> & Props> = ({
  close,
  item,
}) => {
  const [items, setItems] = useState<number>(1);
  const totalPrice = item ? item.price * items : 0;
  const dispatch = useDispatch();

  function increment() {
    setItems(items => items + 1);
  }

  function decrement() {
    setItems(items => items - 1);
  }

  function addItemToCart() {
    dispatch(
      addItemsToCart({
        id: item.id,
        description: item.description,
        imageUrl: item.imageUrl,
        name: item.name,
        price: item.price,
        restaurant: 'Test',
        badges: item.badges,
        quantity: items,
      }),
    );
    close();
  }

  return (
    <View style={styles.container}>
      {item !== null && (
        <>
          <View
            style={{
              flex: 1,
            }}>
            {item.imageUrl !== '' ? (
              <Image
                style={styles.image}
                source={{
                  uri: item.imageUrl,
                }}
              />
            ) : (
              <View style={styles.imagePlaceholder} />
            )}
            <View style={styles.content}>
              <Text style={styles.menuName}>{'Test'}</Text>
              <Text style={styles.name}>{item.name}</Text>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <StarIcon size={24} color={'yellow'} fill={'yellow'} />
                <Text style={styles.ratings}>{1.0}</Text>
                <Text style={styles.menuName}>({200}+)</Text>
              </View>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
          <View>
            <View style={styles.buttonContainer}>
              <View style={styles.itemCountContainer}>
                <Pressable onPress={decrement}>
                  <View
                    style={{
                      marginRight: SPACING,
                      marginLeft: 6,
                    }}>
                    <MinusIcon size={ICON_SIZE} color={ICON_COLOR} />
                  </View>
                </Pressable>
                <Text style={styles.itemCount}>{items}</Text>
                <Pressable onPress={increment}>
                  <View
                    style={{
                      marginLeft: SPACING,
                      marginRight: 6,
                    }}>
                    <PlusIcon size={ICON_SIZE} color={ICON_COLOR} />
                  </View>
                </Pressable>
              </View>
              <Pressable style={styles.addToCart} onPress={addItemToCart}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'Inter',
                    fontWeight: '600',
                  }}>
                  Add to cart
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'Inter',
                    fontWeight: '600',
                  }}>
                  ₹{totalPrice}
                </Text>
              </Pressable>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  image: {
    height: 260,
    width: width * 0.9,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    height: 260,
    width: width * 0.9,
    borderRadius: 16,
    backgroundColor: '#acacac',
  },
  content: {
    marginTop: 16,
  },
  menuName: {
    fontSize: 16,
    color: '#bbbbbb',
    fontFamily: 'Inter',
    fontWeight: '600',
  },
  name: {
    fontSize: 32,
    color: 'black',
    fontFamily: 'Inter',
    fontWeight: '900',
  },
  description: {
    fontSize: 18,
    color: '#9c9c9c',
    marginTop: 8,
  },
  itemCountContainer: {
    backgroundColor: '#eeeeee',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  itemCount: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Inter',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  addToCart: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#242424',
    marginLeft: 12,
    paddingHorizontal: 24,
  },
  ratings: {
    fontSize: 16,
    marginHorizontal: 4,
    color: 'black',
    fontFamily: 'Inter',
    fontWeight: '600',
  },
});

export default Item;
