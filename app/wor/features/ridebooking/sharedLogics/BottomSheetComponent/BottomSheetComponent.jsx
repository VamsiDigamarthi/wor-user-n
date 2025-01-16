import React, { useRef } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { StyleSheet, View } from "react-native";
import { useBottomSheetConfig } from "./useBottomSheetConfig"; // Custom hook for bottom sheet

const BottomSheetComponent = ({ snapPoints, handleSheetChange, children }) => {
  const bottomSheetRef = useRef(null);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1} // Initial snap point
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      enablePanDownToClose={false} // Prevent closing
      style={[styles.bottomSheet, { elevation: 1 }]} // Apply custom styles
      backgroundStyle={styles.backgroundStyle} // Customize background
      handleIndicatorStyle={styles.handleIndicator} // Customize handle indicator
    >
      <BottomSheetScrollView contentContainerStyle={styles.sheetContent}>
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
  },
  handleIndicator: {
    backgroundColor: "gray",
    width: 50,
    height: 4,
    borderRadius: 2,
  },
  sheetContent: {
    backgroundColor: "#fff",
    paddingHorizontal: 5,
  },
});
