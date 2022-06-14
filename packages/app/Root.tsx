import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import {
  DefaultTheme,
  LinkingOptions,
  NavigationContainer,
} from "@react-navigation/native";
import { loadAsync } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import Auth from "./src/screens/Auth";
import Home from "./src/screens/Home";
import QRCode from "./src/screens/QRCode";
import { QrcodeIcon } from "react-native-heroicons/outline";
import { Font } from "shared/Font";
import * as Linking from "expo-linking";
import React from "react";
import Restaurant from "./src/screens/Restaurant";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { Restaurant as IRestaurant } from "./src/models/restaurant";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

export type RootStackParams = {
  Home: undefined;
  QR: undefined;
  Auth: undefined;
  Restaurant: {
    restaurant: IRestaurant;
  };
};
const Stack = createSharedElementStackNavigator<RootStackParams>();

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

function Root() {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadAsync({
          Inter_100Thin,
          Inter_200ExtraLight,
          Inter_300Light,
          Inter_400Regular,
          Inter_500Medium,
          Inter_600SemiBold,
          Inter_700Bold,
          Inter_800ExtraBold,
          Inter_900Black,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
      }}
      onLayout={onLayoutRootView}
    >
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
                <Pressable onPress={() => navigation.navigate("QR")}>
                  <QrcodeIcon size={26} color="black" />
                </Pressable>
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
    </View>
  );
}

export default Root;
