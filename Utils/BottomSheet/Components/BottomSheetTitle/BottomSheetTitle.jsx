import { StyleSheet, Text, View } from "react-native";
import React from "react";

const BottomSheetTitle = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default BottomSheetTitle;

const styles = StyleSheet.create({
  container: {
    width: "100%", // Full width
    paddingVertical: 8, // Equivalent to py-2
    borderBottomWidth: 1, // Border bottom width
    borderBottomColor: "#808080", // Pink color for border
    borderStyle: "solid", // Solid border style
  },
  title: {
    fontSize: 14, // Font size equivalent to text-[14px]
    fontWeight: "600", // Font weight for semi-bold equivalent to font-semibold
    color: "#2d2d2d",
  },
});
