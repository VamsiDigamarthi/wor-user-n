import { StyleSheet, TextInput, View } from "react-native";
import React, { useRef, useState } from "react";

const AddharOtpUi = ({ inputs, handleKeyPress, handleChange, otp }) => {
  return (
    <View style={styles.inputContainer}>
      {otp.map((value, index) => (
        <TextInput
          key={index}
          ref={(input) => (inputs.current[index] = input)} // Store refs for each input
          maxLength={1}
          keyboardType="numeric"
          style={[
            styles.input,
            {
              borderColor: value ? "#EA4C89" : "#A9A9A9", // Change to pink if filled, else light gray
            },
          ]}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)} // Detect backspace
          value={value}
          textAlign="center" // Ensure text is centered
          onFocus={() => {
            inputs.current[index].setNativeProps({
              style: { borderColor: "#EA4C89" }, // Change border color to pink on focus
            });
          }}
          onBlur={() => {
            inputs.current[index].setNativeProps({
              style: { borderColor: value ? "#EA4C89" : "#A9A9A9" }, // Revert based on value
            });
          }}
        />
      ))}
    </View>
  );
};

export default AddharOtpUi;

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 2,
  },
  input: {
    width: 40,
    height: 40,
    backgroundColor: "#FFFFFF", // White background
    borderRadius: 25, // Fully rounded input
    borderWidth: 1,
    textAlign: "center", // Center the text
    fontSize: 18, // Adjust font size
    color: "#000000", // Text color
  },
  resentOtpCard: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  errorCard: {
    width: "100%",
  },
  errorMsg: {
    color: "red",
    fontSize: 14,
  },
});
