import { StyleSheet, Text, View } from "react-native";
import React from "react";
import InputBox from "../../../Utils/InputCard/InputCard";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import { useNavigation } from "@react-navigation/native";
import { useSignUpRelatedHook } from "./SignUpRelated.hook";

const SignUpRelated = () => {
  const { formData, handleInputChange, handleNavigateToOTP } =
    useSignUpRelatedHook();

  return (
    <View style={styles.container}>
      <InputBox
        label="Name"
        icon="person-outline"
        placeholder="Enter Your Name"
        value={formData.name}
        onChangeText={(value) => handleInputChange("name", value)}
      />
      <InputBox
        label="Date of Birth"
        icon="calendar-clear-outline"
        placeholder="09-12-2015"
        value={formData.dob}
        onChangeText={(value) => handleInputChange("dob", value)}
      />
      <InputBox
        label="Email"
        icon="mail-outline"
        placeholder="Enter your email address"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(value) => handleInputChange("email", value)}
      />
      <InputBox
        label="Address"
        icon="location-outline"
        placeholder=" Enter your address"
        multiline={true}
        numberOfLines={3}
        textAlignVertical="top"
        value={formData.address}
        onChangeText={(value) => handleInputChange("address", value)}
      />
      <InputBox
        label="Emergency Contact Number"
        icon="contract"
        placeholder="Enter your emergency contact"
        value={formData.emergencyContact}
        onChangeText={(value) => handleInputChange("emergencyContact", value)}
      />
      <CustomBtn
        title="continue"
        btnBg="#fff"
        btnColor="#E02E88"
        onPress={handleNavigateToOTP}
      />
    </View>
  );
};

export default SignUpRelated;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    gap: 15,
  },
});
