import { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';

const useImagePicker = (): {
  uri: string | undefined;
  chooseImage: () => void;
} => {
  const [uri, setUri] = useState<string | undefined>(undefined);

  function chooseImage() {
    launchImageLibrary(
      {
        mediaType: 'photo',
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
      },
    );
  }

  return { uri, chooseImage };
};

export default useImagePicker;
