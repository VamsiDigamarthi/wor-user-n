import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomRadioBtn = ({ isSelected }) => {
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.radioContainer} onPress={toggleSelection}> */}
      <View style={styles.outerCircle}>
        {isSelected && <View style={styles.innerCircle} />}
      </View>
      {/* </TouchableOpacity> */}
    </View>
  );
};

export default CustomRadioBtn;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    // paddingVertical: 5,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  outerCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#EA4C89",
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#EA4C89",
  },
  radioText: {
    fontSize: 16,
    color: "#333",
  },
});
