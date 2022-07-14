import React from 'react';
import { ActivityIndicator, View } from 'react-native';

interface Props {}

const Spinner: React.FC<React.PropsWithChildren<Props> & Props> = () => {
  return (
    <View className="flex flex-1 justify-center items-center">
      <ActivityIndicator size={'large'} />
    </View>
  );
};

export default Spinner;
