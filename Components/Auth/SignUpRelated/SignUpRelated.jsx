import { StyleSheet, Text, View } from "react-native";
import React from "react";
import InputBox from "../../../Utils/InputCard/InputCard";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import { useNavigation } from "@react-navigation/native";

const SignUpRelated = () => {
  const navigation = useNavigation();

  const handleNavigateToOTP = () => {
    navigation.navigate("documentCheck");
  };
  return (
    <View style={styles.container}>
      <InputBox
        label="Name"
        icon="person-outline"
        placeholder="Enter Your Name"
      />
      <InputBox
        label="Date of Birth"
        icon="calendar-clear-outline"
        placeholder="09-12-2015"
      />
      <InputBox
        label="Email"
        icon="mail-outline"
        placeholder="Enter your email address"
        keyboardType="email-address"
      />
      <InputBox
        label="Address"
        icon="location-outline"
        placeholder=" Enter your address"
        multiline={true}
        numberOfLines={3}
        textAlignVertical="top"
      />
      <InputBox
        label="Emergency Contact Number"
        icon="contract"
        placeholder="Enter your emergency contact"
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
