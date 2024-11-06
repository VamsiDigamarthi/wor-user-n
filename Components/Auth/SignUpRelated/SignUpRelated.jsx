import { StyleSheet, Text, View } from "react-native";
import React from "react";
import InputBox from "../../../Utils/InputCard/InputCard";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import { useNavigation } from "@react-navigation/native";
import { useSignUpRelatedHook } from "./SignUpRelated.hook";

const SignUpRelated = ({ selectedImage, mobile, onImageError }) => {
  const { formData, handleInputChange, handleNavigateToOTP, apiError, errors } =
    useSignUpRelatedHook({ selectedImage, mobile, onImageError });

  return (
    <View style={styles.container}>
      <InputBox
        label="Name"
        icon="person-outline"
        placeholder="Enter Your Name"
        value={formData.name}
        onChangeText={(value) => handleInputChange("name", value)}
        isValid={errors?.name?.length > 0 ? false : true}
      />
      <InputBox
        label="Date of Birth"
        icon="calendar-clear-outline"
        placeholder="09-12-2015"
        value={formData.dob}
        onChangeText={(value) => handleInputChange("dob", value)}
        isValid={errors?.dob?.length > 0 ? false : true}
      />
      <InputBox
        label="Email"
        icon="mail-outline"
        placeholder="Enter your email address"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(value) => handleInputChange("email", value)}
        isValid={errors?.email?.length > 0 ? false : true}
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
        isValid={errors?.address?.length > 0 ? false : true}
      />
      <InputBox
        label="Emergency Contact Number"
        icon="contract"
        placeholder="Enter your emergency contact"
        value={formData.emergencyContact}
        onChangeText={(value) => handleInputChange("emergencyContact", value)}
      />
      {apiError && (
        <View style={styles.errorCard}>
          <Text style={styles.errorMsg}>{apiError}</Text>
        </View>
      )}
      <View style={{ height: 10 }} />
      <CustomBtn
        title="continue"
        btnBg="#fff"
        btnColor="#E02E88"
        onPress={handleNavigateToOTP}
        width="100%"
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
  errorCard: {
    width: "100%",
  },
  errorMsg: {
    color: "red",
    fontSize: 14,
  },
});
