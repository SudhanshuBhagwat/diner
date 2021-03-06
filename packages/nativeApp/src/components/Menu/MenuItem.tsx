import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { MinusIcon, PlusIcon, XIcon } from 'react-native-heroicons/outline';
import { useDispatch } from 'react-redux';
import {
  addToCart,
  CartItem,
  removeFromCart,
  removeItem,
} from '../../redux/cartStore';
import { ICON_COLOR } from '../../utilities/constants';

interface Props {
  item: CartItem;
}

const MenuItem: React.FC<React.PropsWithChildren<Props> & Props> = ({
  item,
}) => {
  const dispatch = useDispatch();

  function increment() {
    dispatch(addToCart(item));
  }

  function decrement() {
    dispatch(removeFromCart(item));
  }

  return (
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
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.restaurant}</Text>
          </View>
          <Pressable onPress={() => dispatch(removeItem(item))}>
            <View
              style={{
                marginTop: 6,
                backgroundColor: '#eeeeee',
                padding: 6,
                borderRadius: 50,
              }}>
              <XIcon size={16} color={ICON_COLOR} />
            </View>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 4,
          }}>
          <View style={styles.itemCountContainer}>
            <Pressable onPress={decrement}>
              <View
                style={{
                  marginRight: 20,
                  marginLeft: 6,
                }}>
                <MinusIcon size={16} color={ICON_COLOR} />
              </View>
            </Pressable>
            <Text style={styles.itemCount}>{item.quantity}</Text>
            <Pressable onPress={increment}>
              <View
                style={{
                  marginLeft: 20,
                  marginRight: 6,
                }}>
                <PlusIcon size={16} color={ICON_COLOR} />
              </View>
            </Pressable>
          </View>
          <Text style={styles.price}>???{item.quantity * item.price}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingRight: 16,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  description: {
    color: '#797979',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 12,
    marginRight: 8,
    aspectRatio: 1,
  },
  name: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Inter',
    fontWeight: '700',
  },
  price: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter',
    fontWeight: '700',
  },
  itemCountContainer: {
    backgroundColor: '#eeeeee',
    borderRadius: 8,
    padding: 4,
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
});

export default MenuItem;
