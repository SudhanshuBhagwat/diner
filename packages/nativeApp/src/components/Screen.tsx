import React from 'react';
import {
  StatusBar,
  StatusBarStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

interface Props {
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
}

const Screen: React.FC<React.PropsWithChildren<Props> & Props> = ({
  children,
  style,
  loading,
}) => {
  const { name } = useRoute();
  const barStyle: StatusBarStyle =
    name === 'Restaurant' && loading
      ? 'dark-content'
      : name === 'Restaurant'
      ? 'light-content'
      : 'dark-content';

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
