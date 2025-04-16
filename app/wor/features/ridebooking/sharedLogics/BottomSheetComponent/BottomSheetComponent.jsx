import React, { useRef } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
const BottomSheetComponent = ({
  snapPoints,
  handleSheetChange,
  children,
  style,
  backgroundColor = "#fff",
  previousCancelFees = false,
}) => {
  const bottomSheetRef = useRef(null);
  const { profile } = useSelector((state) => state.profileSlice);

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
        {previousCancelFees && (
          <View style={styles.previousCancel}>
            <Text style={{ fontSize: 12, fontWeight: "600", color: "#fff" }}>
              Previous Cancel Fees
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "700", color: "#fff" }}>
              {profile?.cancelCharges}
            </Text>
          </View>
        )}
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

  previousCancel: {
    marginHorizontal: 20,
    backgroundColor: "#fa7066",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
