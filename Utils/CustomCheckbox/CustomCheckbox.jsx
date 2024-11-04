import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For checkbox icon

const CustomCheckbox = ({ handleCheck, isChecked }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={handleCheck} style={styles.checkboxContainer}>
        <View
          style={[
            styles.checkbox,
            isChecked && { backgroundColor: "#E02E88", borderColor: "#fff5f9" }, // Changes background when checked
          ]}
        >
          {isChecked && <Ionicons name="checkmark" size={16} color="white" />}
        </View>
        <Text style={styles.label}>I agree to the terms and conditions</Text>
      </Pressable>
    </View>
  );
};

export default CustomCheckbox;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  label: {
    fontSize: 13,
    color: "#333",
  },
});
