import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../../../Constants/colors";
import Infopressicons from "../Infopressicons";

const BottomSheetTitle = ({ title, onHandleOpenInfoModal }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Infopressicons onHandleOpenInfoModal={onHandleOpenInfoModal} />
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
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 14, // Font size equivalent to text-[14px]
    fontWeight: "600", // Font weight for semi-bold equivalent to font-semibold
    color: "#2d2d2d",
  },
});
