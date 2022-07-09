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
import { ICON_COLOR } from '../../utilities/constants';

interface Props {}

const ICON_SIZE = 20;

const Nav: React.FC<React.PropsWithChildren<Props> & Props> = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const showNav = navigation.canGoBack();
  const itemsInCart = useSelector((state: RootState) => itemCount(state));

  return (
    <View style={styles.container}>
      {showNav ? (
        <Pressable onPress={() => navigation.goBack()} style={styles.back}>
          <ChevronLeftIcon color={ICON_COLOR} size={ICON_SIZE} />
        </Pressable>
      ) : (
        <View />
      )}
      <View>
        <Pressable
          onPress={() => navigation.navigate('ShoppingCart')}
          style={styles.back}>
          <ShoppingBagIcon color={ICON_COLOR} size={ICON_SIZE} />
        </Pressable>
        {itemsInCart > 0 && (
          <View style={styles.indicatorContainer}>
            <Text style={styles.indicatorStyle}>{itemsInCart}</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
  },
  back: {
    backgroundColor: '#eeeeee',
    borderRadius: 100,
    padding: 6,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    backgroundColor: 'red',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 50,
  },
  indicatorStyle: {
    color: 'white',
    fontSize: 10,
  },
});

export default Nav;
