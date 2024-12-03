import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../../Constants/colors";
const Infopressicons = ({ onHandleOpenInfoModal }) => {
  return (
    <Pressable onPress={onHandleOpenInfoModal}>
      <View style={styles.iconsRouded}>
        <MaterialCommunityIcons
          name="information-variant"
          size={10}
          color={COLORS.subHeading}
        />
      </View>
    </Pressable>
  );
};

export default Infopressicons;

const styles = StyleSheet.create({
  iconsRouded: {
    width: 15,
    height: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.subHeading,
    justifyContent: "center",
    alignItems: "center",
  },
});
