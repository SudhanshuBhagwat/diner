import BottomSheet from "@gorhom/bottom-sheet";
import React, { useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Font } from "shared/Font";

interface Props {
  onClose: (value: boolean) => void;
}

const MenuBottomSheet: React.FC<React.PropsWithChildren<Props> & Props> = ({
  children,
  onClose,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["80%"], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
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
