import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useRef, useState } from "react";

const OtpUi = ({ otp, setOtp, handelPassOtpToParent = () => {}, style }) => {
  const inputs = useRef([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleOtpChange = (text, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = text;

    if (text && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
    if (index === inputs.current.length - 1) {
      handelPassOtpToParent(updatedOtp);
    }

    setOtp(updatedOtp);
  };

  const handleOtpBackspace = (event, index) => {
    if (
      event.nativeEvent.key === "Backspace" &&
      index > 0 &&
      otp[index] === ""
    ) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View
      style={[
        styles.inputCard,
        { borderColor: isFocused && "#EA4C89", borderWidth: 1 },
        style,
      ]}
    >
      {otp.map((value, index) => (
        <TextInput
          key={index}
          ref={(input) => (inputs.current[index] = input)} // Store refs for each input
          maxLength={1}
          keyboardType="numeric"
          style={[
            styles.input,
            {
              // backgroundColor: value ? "transparent" : "#f7f7f7",
              width: value ? 30 : 20,
              height: value ? 30 : 20,
              borderBottomWidth: 1,
              borderBottomColor: value ? "transparent" : "gray",
            },
          ]}
          onChangeText={(text) => handleOtpChange(text, index)}
          onKeyPress={(e) => handleOtpBackspace(e, index)}
          value={value}
          textAlign="center"
          onFocus={() => {
            inputs.current[index].setNativeProps({
              // style: { borderColor: "#EA4C89" }, // Change border color to pink on focus
            });
            setIsFocused(true);
          }}
          onBlur={() => {
            inputs.current[index].setNativeProps({
              // style: { borderColor: value ? "#EA4C89" : "#A9A9A9" }, // Revert based on value
            });
            setIsFocused(true);
          }}
        />
      ))}
    </View>
  );
};

export default OtpUi;

const styles = StyleSheet.create({
  inputCard: {
    width: "100%",
    height: 66,
    borderWidth: 1,
    borderColor: "f7f7f7",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
  },
  input: {
    width: 20,
    height: 20,
    // borderRadius: 20,
    fontSize: 22,
  },
});
