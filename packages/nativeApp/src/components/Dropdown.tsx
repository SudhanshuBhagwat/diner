import React, { useState } from "react";
import { Dropdown as RNDropdown } from "react-native-element-dropdown";
import { Text, StyleSheet, View } from "react-native";
import { Font } from "@diner/shared/Font";

interface Props {}

const data = [
  { label: "One", value: "1" },
  { label: "Two", value: "2" },
  { label: "Three", value: "3" },
  { label: "Four", value: "4" },
];

const Dropdown: React.FC<React.PropsWithChildren<Props> & Props> = () => {
  const [value, setValue] = useState(null);

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && <View />}
      </View>
    );
  };

  return (
    <RNDropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      iconStyle={styles.iconStyle}
      data={data}
      labelField="label"
      valueField="value"
      placeholder="Select item"
      value={value}
      onChange={(item) => {
        setValue(item.value);
      }}
      renderLeftIcon={() => <View />}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    flex: 1,
    height: 50,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    borderColor: "#b3b3b3",
    borderWidth: 2,
    marginTop: 8,
    marginLeft: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    fontFamily: Font[500],
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#bdbdbd",
    fontFamily: Font[500],
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: Font[500],
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
export default Dropdown;
