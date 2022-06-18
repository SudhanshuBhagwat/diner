import React from "react";
import {
  DefaultTheme,
  LinkingOptions,
  NavigationContainer,
} from "@react-navigation/native";
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { ChevronLeftIcon, QrcodeIcon } from "react-native-heroicons/outline";
import { Font } from "shared/Font";
import * as Linking from "expo-linking";
import Home from "../screens/Home";
import Auth from "../screens/Auth";
import QRCode from "../screens/QRCode";
import Restaurant from "../screens/Restaurant";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { Restaurant as IRestaurant } from "../models/restaurant";
import { Item } from "../models/items";
import Restaurants from "../screens/Restaurants";
import AddRestaurant from "../screens/Restaurant/AddRestaurant";
import { StackNavigationOptions } from "@react-navigation/stack";
import AddMenu from "../screens/Restaurant/Menu/AddMenu";
import AddItem from "../screens/Restaurant/Menu/AddItem";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

const prefix = Linking.createURL("/");
const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: [prefix],
  config: {
    screens: {
      Restaurant: {
        path: "Restaurant/:restaurant",
        parse: {
          restaurant: (restaurantId: string) => restaurantId,
        },
      },
    },
  },
};

export type RootStackParams = {
  Home: undefined;
  QR: undefined;
  Auth: undefined;
  Restaurant: {
    restaurant: IRestaurant;
    item?: Item;
  };
  Restaurants: undefined;
  AddRestaurant: undefined;
  AddMenu: undefined;
  AddItem: undefined;
};

const Stack = createSharedElementStackNavigator<RootStackParams>();

interface Props {}

const Navigation: React.FC<React.PropsWithChildren<Props> & Props> = () => {
  return (
    <NavigationContainer
      linking={linking}
      fallback={<ActivityIndicator />}
      theme={MyTheme}
    >
      <Stack.Navigator
        initialRouteName="Restaurants"
        screenOptions={({
          route,
          navigation,
        }: {
          route: any;
          navigation: any;
        }) => ({
          headerShadowVisible: false,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 30,
                fontFamily: Font["900"],
              }}
            >
              Diner
            </Text>
          ),
          headerLeft: () =>
            navigation.canGoBack() && (
              <Pressable onPress={() => navigation.goBack()}>
                <ChevronLeftIcon
                  size={26}
                  color="black"
                  strokeWidth={2}
                  style={{
                    marginLeft: 16,
                  }}
                />
              </Pressable>
            ),
          headerRight: () =>
            route.name === "Home" && (
              <View
                style={{
                  marginRight: 16,
                }}
              >
                <Pressable onPress={() => navigation.push("QR")}>
                  <QrcodeIcon size={26} color="black" />
                </Pressable>
              </View>
            ),
        })}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen
          name="Restaurant"
          component={Restaurant}
          sharedElements={(route) => [route.params.restaurant]}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Restaurants" component={Restaurants} />
        <Stack.Screen name="AddRestaurant" component={AddRestaurant} />
        <Stack.Screen name="AddMenu" component={AddMenu} />
        <Stack.Screen name="AddItem" component={AddItem} />
        <Stack.Screen name="QR" component={QRCode} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: Font[900],
  },
});

export default Navigation;
