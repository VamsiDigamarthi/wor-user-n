import React, { useCallback } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

const CustomBottomSheet = ({
  bottomSheetRef,
  children,
  bgcolor = "#fff",
  snapPoints = ["40%", "60%"],
  manualCloseSheet,
}) => {
  // Callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  // Renders
  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      onDismiss={manualCloseSheet}
    >
      <BottomSheetView
        style={[styles.contentContainer, { backgroundColor: bgcolor }]}
      >
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default CustomBottomSheet;
