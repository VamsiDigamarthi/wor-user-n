import React, { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";

const OtpRelatedInput = ({ btnShow = true }) => {
  const navigation = useNavigation();

  const handleNavigateToOTP = () => {
    navigation.navigate("signup");
  };

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;

    if (text && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }

    setOtp(newOtp);
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && otp[index] === "") {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
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
                borderColor: value ? "#E02E88" : "#A9A9A9", // Change to pink if filled, else light gray
              },
            ]}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)} // Detect backspace
            value={value}
            textAlign="center" // Ensure text is centered
            onFocus={() => {
              inputs.current[index].setNativeProps({
                style: { borderColor: "#E02E88" }, // Change border color to pink on focus
              });
            }}
            onBlur={() => {
              inputs.current[index].setNativeProps({
                style: { borderColor: value ? "#E02E88" : "#A9A9A9" }, // Revert based on value
              });
            }}
          />
        ))}
      </View>
      <View style={styles.resentOtpCard}>
        <Text style={{ color: "#E02E88", fontSize: 13 }}>Resend Otp</Text>
      </View>
      {btnShow && (
        <CustomBtn
          title="continue"
          btnBg="#fff"
          btnColor="#E02E88"
          onPress={handleNavigateToOTP}
        />
      )}
    </View>
  );
};

export default OtpRelatedInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },
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
});
