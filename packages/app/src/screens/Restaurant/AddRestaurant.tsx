import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import { Font } from "shared/Font";
import Dropdown from "../../components/Dropdown";
import { launchImageLibrary } from "react-native-image-picker";

interface Props {}

const BORDER_COLOR = "#b3b3b3";

const AddRestaurant: React.FC<React.PropsWithChildren<Props> & Props> = () => {
  const [uri, setUri] = useState<string | undefined>(undefined);

  function chooseImage() {
    launchImageLibrary(
      {
        mediaType: "photo",
      },
      ({ didCancel, assets, errorCode, errorMessage }) => {
        if (didCancel) {
          return;
        }
        if (errorCode) {
          console.error(errorMessage);
          return;
        }
        const file = assets ? assets[0] : null;
        setUri(file === null ? undefined : file.uri);
      }
    );
  }

  return (
    <View style={styles.container}>
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
        <Text style={styles.label}>Restaurant Name</Text>
        <TextInput placeholder="Hubber And Holly" style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location</Text>
        <TextInput placeholder="Bibvewadi, Pune" style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput placeholder="Ice Creams, Shakes" style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Price</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={[styles.label, { marginRight: 16 }]}>₹</Text>
          <TextInput
            placeholder="1400"
            style={[styles.input, { width: "30%" }]}
          />
          <Text style={[styles.label, { marginLeft: 16 }]}>For</Text>
          <Dropdown />
        </View>
      </View>
      <Pressable onPress={() => {}}>
        <Text style={styles.addRestaurant}>Add Restaurant</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
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
  border: {
    borderWidth: 3,
    borderStyle: "dashed",
    borderColor: BORDER_COLOR,
  },
  inputContainer: {
    marginTop: 16,
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
  label: {
    fontSize: 18,
    fontFamily: Font[600],
  },
  addRestaurant: {
    backgroundColor: "#3f3f3f",
    color: "white",
    fontFamily: Font[600],
    fontSize: 18,
    paddingVertical: 16,
    textAlign: "center",
    borderRadius: 8,
    marginTop: 16,
  },
});

export default AddRestaurant;
