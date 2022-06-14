import React, { useCallback, useMemo, useRef } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Font } from "shared/Font";
import BottomSheet from "@gorhom/bottom-sheet";

interface Props {}

const MenuBottomSheet: React.FC<
  React.PropsWithChildren<Props> & Props
> = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.text}>MenuBottomSheet</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontFamily: Font[900],
  },
});

export default MenuBottomSheet;
