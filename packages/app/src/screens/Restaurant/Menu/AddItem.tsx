import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import { Font } from "shared/Font";
import { RootStackParams } from "../../../components/navigation";
import useImagePicker from "../../../hooks/useImagePicker";
import { BORDER_COLOR, RUPEE } from "../../../utilities/constants";

type Props = NativeStackScreenProps<RootStackParams, "AddItem">;

const AddItem: React.FC<React.PropsWithChildren<Props> & Props> = ({
  navigation,
}) => {
  const { uri, chooseImage } = useImagePicker();

  return (
    <View style={styles.container}>
      <Text style={styles.main}>Item Info</Text>
      <Pressable onPress={() => chooseImage()}>
        {uri === undefined ? (
          <View style={[styles.border, styles.imageContainer]}>
            <Text style={[styles.label, { color: "#bdbdbd" }]}>
              Click to Add Image
            </Text>
          </View>
        ) : (
          <Image
            style={styles.imageContainer}
            source={{
              uri,
            }}
          />
        )}
      </Pressable>
      <View>
        <Text style={styles.label}>Item Name</Text>
        <TextInput
          placeholder="Chicken Shwarma with Cheese"
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Price {RUPEE}</Text>
        <TextInput
          placeholder="120"
          keyboardType="number-pad"
          style={styles.input}
        />
      </View>
      <Pressable onPress={() => navigation.goBack()}>
        <Text style={styles.addButton}>Add Item</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  main: {
    fontSize: 24,
    fontFamily: Font[700],
  },
  inputContainer: {
    marginTop: 16,
  },
  border: {
    borderWidth: 3,
    borderStyle: "dashed",
    borderColor: BORDER_COLOR,
  },
  input: {
    width: "100%",
    borderColor: BORDER_COLOR,
    borderWidth: 2,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
    fontFamily: Font[500],
  },
  imageContainer: {
    height: 240,
    width: "100%",
    marginVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
    borderRadius: 16,
  },
  label: {
    fontSize: 18,
    fontFamily: Font[600],
  },
  addButton: {
    backgroundColor: "#3f3f3f",
    color: "white",
    fontFamily: Font[600],
    fontSize: 18,
    paddingVertical: 16,
    textAlign: "center",
    borderRadius: 8,
    width: "100%",
    marginTop: 16,
  },
});

export default AddItem;
