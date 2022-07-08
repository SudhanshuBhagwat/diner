import React from 'react';
import {
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

interface Props {
  style: StyleProp<ViewStyle>;
}

const Screen: React.FC<React.PropsWithChildren<Props> & Props> = ({
  children,
  style,
}) => {
  const { name } = useRoute();
  const barStyle = name === 'Restaurant' ? 'light-content' : 'dark-content';

  return (
    <View style={[styles.container, style]}>
      <StatusBar
        barStyle={barStyle}
        translucent
        backgroundColor="transparent"
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Screen;
