import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { PlusIcon } from 'react-native-heroicons/outline';
import Dropdown from '../../components/Dropdown';
import { RootStackParams } from '../../components/navigation';
import Screen from '../../components/Screen';
import useImagePicker from '../../hooks/useImagePicker';
import { BORDER_COLOR, RUPEE } from '../../utilities/constants';

type Props = NativeStackScreenProps<RootStackParams, 'AddRestaurant'>;

const AddRestaurant: React.FC<React.PropsWithChildren<Props> & Props> = ({
  navigation,
}) => {
  return (
    <Screen style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 90,
        }}>
        <RestaurantInfo />
        <MenuInfo />
      </ScrollView>
      <Pressable onPress={() => navigation.goBack()}>
        <Text style={styles.addRestaurant}>Add Restaurant</Text>
      </Pressable>
    </Screen>
  );
};

const RestaurantInfo = () => {
  const { uri, chooseImage } = useImagePicker();

  return (
    <View>
      <Text style={styles.main}>Restaurant Info</Text>
      <Pressable onPress={() => chooseImage()}>
        {uri === undefined ? (
          <View style={[styles.border, styles.imageContainer]}>
            <Text style={[styles.label, { color: '#bdbdbd' }]}>
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
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={[styles.label, { marginRight: 16 }]}>{RUPEE}</Text>
          <TextInput
            placeholder="1400"
            style={[styles.input, { width: '30%' }]}
          />
          <Text style={[styles.label, { marginLeft: 16 }]}>For</Text>
          <Dropdown />
        </View>
      </View>
    </View>
  );
};

const MenuInfo = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <View
      style={{
        marginTop: 16,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.main}>Menus</Text>
        <Pressable onPress={() => navigation.navigate('AddMenu')}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 16,
              paddingVertical: 8,
              backgroundColor: '#3f3f3f',
              borderRadius: 8,
              alignItems: 'center',
            }}>
            <PlusIcon color="white" size={20} />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 8,
                color: 'white',
                fontFamily: 'Inter',
                fontWeight: '600',
              }}>
              Add Menu
            </Text>
          </View>
        </Pressable>
      </View>
      <Text style={styles.message}>No Menus Added</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  imageContainer: {
    height: 240,
    width: '100%',
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    borderRadius: 16,
  },
  border: {
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: BORDER_COLOR,
  },
  inputContainer: {
    marginTop: 16,
  },
  input: {
    width: '100%',
    borderColor: BORDER_COLOR,
    borderWidth: 2,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  label: {
    fontSize: 18,
  },
  addRestaurant: {
    backgroundColor: '#3f3f3f',
    color: 'white',
    fontSize: 18,
    paddingVertical: 16,
    textAlign: 'center',
    borderRadius: 8,
    width: '100%',
    position: 'absolute',
    bottom: 16,
    zIndex: 10,
  },
  main: {
    fontSize: 24,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default AddRestaurant;
