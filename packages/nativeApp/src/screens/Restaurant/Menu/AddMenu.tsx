import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Text, StyleSheet, View, Pressable, TextInput } from 'react-native';
import { RootStackParams } from '../../../components/navigation';
import { launchImageLibrary } from 'react-native-image-picker';
import { PlusIcon } from 'react-native-heroicons/outline';
import { BORDER_COLOR } from '../../../utilities/constants';

type Props = NativeStackScreenProps<RootStackParams, 'AddRestaurant'>;

const AddMenu: React.FC<React.PropsWithChildren<Props> & Props> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.main}>Menu Info</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Menu Name</Text>
        <TextInput placeholder="Main Course" style={styles.input} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 16,
        }}>
        <Text style={styles.main}>Items</Text>
        <Pressable onPress={() => navigation.push('AddItem')}>
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
              }}>
              Add Item
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
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
  button: {
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
});

export default AddMenu;
