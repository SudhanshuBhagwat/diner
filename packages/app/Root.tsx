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
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { loadAsync } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Auth from "./src/screens/Auth";
import Home from "./src/screens/Home";
import QRCode from "./src/screens/QRCode";
import { QrcodeIcon } from "react-native-heroicons/outline";
import { Font } from "shared/Font";
import * as Linking from "expo-linking";
import React from "react";
import { StatusBar } from "expo-status-bar";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

const Stack = createNativeStackNavigator();

const prefix = Linking.createURL("/");
const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: [prefix],
  config: {
    screens: {
      Home: {
        path: "Home/:user",
        parse: {
          user: (user: string) => user,
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
      <StatusBar style="auto" />
      <NavigationContainer
        linking={linking}
        fallback={<Text>Loading...</Text>}
        theme={MyTheme}
      >
        <Stack.Navigator
          screenOptions={({ route, navigation }) => ({
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
              route.name !== "QR" ? (
                <Pressable onPress={() => navigation.navigate("QR")}>
                  <QrcodeIcon size={26} color="black" />
                </Pressable>
              ) : null,
          })}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="QR" component={QRCode} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default Root;
