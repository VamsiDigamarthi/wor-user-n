import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { fonts } from "../../../../fonts/Fonts";
const Chip = ({ text, selected, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: selected ? "#EA4C89" : "#FFF7FB",
        paddingHorizontal: 15,
        paddingVertical: 8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          color: selected ? "white" : "black",
          fontFamily: fonts.robotoRegular,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Chip;

const styles = StyleSheet.create({});
