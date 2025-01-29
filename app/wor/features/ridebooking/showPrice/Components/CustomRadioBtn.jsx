import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function CustomRadioBtn({ selected = false, onPress }) {
  return (
    <TouchableOpacity style={[styles.chukka]} onPress={onPress}>
      {selected && <View style={styles.selectedChukka} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chukka: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: "#EA4C89",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  selectedChukka: {
    backgroundColor: "#EA4C89",
    height: 15,
    width: 15,
    borderRadius: 19,
  },
});
