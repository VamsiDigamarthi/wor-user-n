import { StyleSheet } from "react-native";
import React from "react";
import InputBox from "../../../Utils/InputCard/InputCard";
import CustomCheckbox from "../../../Utils/CustomCheckbox/CustomCheckbox";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import { useNavigation } from "@react-navigation/native";

const LoginRelatedInput = () => {
  const navigation = useNavigation();

  const handleNavigateToOTP = () => {
    navigation.navigate("otp");
  };
  return (
    <>
      <InputBox
        label="Mobile Number"
        isIconsNotText={false}
        keyboardType="numeric"
      />
      <CustomCheckbox />
      <CustomBtn
        title="continue"
        btnBg="#fff"
        btnColor="#E02E88"
        onPress={handleNavigateToOTP}
      />
    </>
  );
};

export default LoginRelatedInput;

const styles = StyleSheet.create({});
