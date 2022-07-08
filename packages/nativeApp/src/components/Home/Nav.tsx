import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import {
  ChevronLeftIcon,
  ShoppingBagIcon,
} from 'react-native-heroicons/outline';
import { RootStackParams } from '../navigation';
import { itemCount } from '../../redux/cartStore';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';

interface Props {}

const Nav: React.FC<React.PropsWithChildren<Props> & Props> = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const itemsInCart = useSelector((state: RootState) => itemCount(state));

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <ChevronLeftIcon color={'black'} size={30} style={styles.back} />
      </Pressable>
      <View>
        <Pressable onPress={() => navigation.navigate('ShoppingCart')}>
          <ShoppingBagIcon color={'black'} size={30} style={styles.back} />
        </Pressable>
        {itemsInCart > 0 && (
          <View
            style={{
              position: 'absolute',
              bottom: -10,
              right: -10,
              backgroundColor: 'red',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 50,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 10,
              }}>
              {itemsInCart}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginTop: 16,
  },
  back: {
    backgroundColor: '#eeeeee',
    borderRadius: 6,
  },
});

export default Nav;
