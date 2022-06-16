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
import { QrcodeIcon } from "react-native-heroicons/outline";
import { Font } from "shared/Font";
import * as Linking from "expo-linking";
import Home from "../screens/Home";
import Auth from "../screens/Auth";
import QRCode from "../screens/QRCode";
import Restaurant from "../screens/Restaurant";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { Restaurant as IRestaurant } from "../models/restaurant";
import { Item } from "../models/items";

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
        initialRouteName="Home"
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
          headerRight: () =>
            route.name === "Home" ? (
              <View
                style={{
                  marginRight: 16,
                }}
              >
                <Pressable onPress={() => navigation.navigate("QR")}>
                  <QrcodeIcon size={26} color="black" />
                </Pressable>
              </View>
            ) : null,
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
