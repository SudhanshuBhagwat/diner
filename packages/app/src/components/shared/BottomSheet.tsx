import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Font } from "@diner/shared/Font";

interface Props {
  onClose: (value: boolean) => void;
}

const MenuBottomSheet: React.FC<React.PropsWithChildren<Props> & Props> = ({
  children,
  onClose,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["90%"], []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.5}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      onClose={() => onClose(false)}
    >
      <View style={styles.contentContainer}>{children}</View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontFamily: Font[900],
  },
});

export default MenuBottomSheet;
