import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomSwitch = ({ initialValue = false, onToggle }) => {
  const toggleSwitch = () => {
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.switchContainer,
        { backgroundColor: initialValue ? "#EA4C89" : "#e0e0e0" },
      ]}
      onPress={toggleSwitch}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.switchCircle,
          { alignSelf: initialValue ? "flex-end" : "flex-start" },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: 60,
    height: 30,
    borderRadius: 15,
    padding: 3,
    justifyContent: "center",
    // borderWidth: 1,
  },
  switchCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
});

export default CustomSwitch;
