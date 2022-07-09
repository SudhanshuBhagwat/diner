import React from 'react';
import {
  DefaultTheme,
  LinkingOptions,
  NavigationContainer,
} from '@react-navigation/native';
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Pressable,
  Linking,
} from 'react-native';
import { ChevronLeftIcon, QrcodeIcon } from 'react-native-heroicons/outline';
import SplashScreen from 'react-native-splash-screen';
import Home from '../screens/Home';
import Auth from '../screens/Auth';
import QRCode from '../screens/QRCode';
import Restaurant from '../screens/Restaurant/Restaurant';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { Restaurant as IRestaurant } from '../models/restaurant';
import { Item } from '../models/items';
import AddRestaurant from '../screens/Restaurant/AddRestaurant';
import AddMenu from '../screens/Restaurant/Menu/AddMenu';
import AddItem from '../screens/Restaurant/Menu/AddItem';
import Restaurants from '../screens/Restaurant/Restaurants';
import ShoppingCart from '../screens/ShoppingCart';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: ['https://diner-omega.vercel.app', 'diner://'],
  config: {
    screens: {
      Restaurant: {
        path: 'Restaurant/:restaurantId',
        parse: {
          restaurantId: (restaurantId: string) => +restaurantId,
        },
      },
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    console.log(url);

    return url;
  },
  subscribe(listener) {
    const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
      listener(url);
    });

    return () => {
      linkingSubscription.remove();
    };
  },
};

export type RootStackParams = {
  Home: undefined;
  QR: undefined;
  Auth: undefined;
  Restaurant: {
    restaurant?: IRestaurant;
    restaurantId?: number;
    item?: Item;
  };
  Restaurants: undefined;
  AddRestaurant: undefined;
  AddMenu: undefined;
  AddItem: undefined;
  ShoppingCart: undefined;
};

const Stack = createSharedElementStackNavigator<RootStackParams>();

interface Props {}

const Navigation: React.FC<React.PropsWithChildren<Props> & Props> = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer
      linking={linking}
      fallback={<ActivityIndicator />}
      theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({
          route,
          navigation,
        }: {
          route: any;
          navigation: any;
        }) => ({
          headerShadowVisible: false,
          headerTitle: () => <Text style={styles.title}>Diner</Text>,
          headerLeft: () =>
            navigation.canGoBack() && (
              <Pressable onPress={() => navigation.goBack()}>
                <ChevronLeftIcon
                  size={26}
                  color="black"
                  strokeWidth={2}
                  style={styles.chevronLeft}
                />
              </Pressable>
            ),
          headerRight: () =>
            route.name === 'Home' && (
              <View style={styles.qrButton}>
                <Pressable onPress={() => navigation.push('QR')}>
                  <QrcodeIcon size={26} color="black" />
                </Pressable>
              </View>
            ),
        })}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen
          name="Restaurant"
          component={Restaurant}
          sharedElements={(route, otherRoute) => {
            if (
              otherRoute.name === 'ShoppingCart' ||
              !route.params.restaurant
            ) {
              return [];
            }
            return [route.params.restaurant];
          }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Restaurants" component={Restaurants} />
        <Stack.Screen name="AddRestaurant" component={AddRestaurant} />
        <Stack.Screen name="ShoppingCart" component={ShoppingCart} />
        <Stack.Screen name="AddMenu" component={AddMenu} />
        <Stack.Screen name="AddItem" component={AddItem} />
        <Stack.Screen name="QR" component={QRCode} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 30,
    fontFamily: 'Inter',
    fontWeight: '900',
  },
  chevronLeft: {
    marginLeft: 16,
  },
  qrButton: {
    marginRight: 16,
  },
});

export default Navigation;
