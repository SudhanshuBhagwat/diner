import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  open: boolean;
  onClose: (value: boolean) => void;
}

const MenuBottomSheet: React.FC<React.PropsWithChildren<Props> & Props> = ({
  children,
  open,
  onClose,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['90%'], []);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.5}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  if (open) {
    bottomSheetRef.current?.expand();
  } else {
    bottomSheetRef.current?.close();
  }

  return (
    <BottomSheet
      index={-1}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      onClose={() => onClose(false)}>
      <View style={styles.contentContainer}>{children}</View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontFamily: 'Inter',
    fontWeight: '900',
  },
});

export default MenuBottomSheet;
