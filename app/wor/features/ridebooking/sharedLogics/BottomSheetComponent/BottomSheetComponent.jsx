import React, { useRef } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";
const BottomSheetComponent = ({
  snapPoints,
  handleSheetChange,
  children,
  style,
  backgroundColor = "#fff",
}) => {
  const bottomSheetRef = useRef(null);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1} // Initial snap point
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      enablePanDownToClose={false} // Prevent closing
      style={[styles.bottomSheet, style, { elevation: 1 }]} // Apply custom styles
      backgroundStyle={[styles.backgroundStyle, { backgroundColor }]} // Customize background
      handleIndicatorStyle={styles.handleIndicator} // Customize handle indicator
    >
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.sheetContent, { backgroundColor }]}
      >
        {children}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default BottomSheetComponent;

const styles = StyleSheet.create({
  bottomSheet: {
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    elevation: 1,
  },
  backgroundStyle: {
    backgroundColor: "white",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  handleIndicator: {
    backgroundColor: "#f7f7f7",
    width: 50,
    height: 4,
    borderRadius: 2,
  },
  sheetContent: {
    backgroundColor: "#fff",
    paddingHorizontal: 5,
  },
});
