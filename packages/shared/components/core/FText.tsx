import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";
import { Font } from "../../Font";

interface Props extends TextProps {
  fontWeight?: keyof typeof Font;
}

const FText: React.FC<React.PropsWithChildren<Props> & Props> = ({
  children,
  style,
  fontWeight,
}) => {
  return (
    <Text
      style={[
        styles.base,
        {
          fontFamily: fontWeight && Font[fontWeight],
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: Font[400],
  },
});

export default FText;
