import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { Font } from "shared/Font";

interface Props {}

const Nav: React.FC<React.PropsWithChildren<Props> & Props> = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <ChevronLeftIcon color={"black"} size={30} style={styles.back} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  back: {
    backgroundColor: "#eeeeee",
    borderRadius: 6,
  },
});

export default Nav;
