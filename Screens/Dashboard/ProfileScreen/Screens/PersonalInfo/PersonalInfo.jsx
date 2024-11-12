import { StyleSheet, View } from "react-native";
import React from "react";
import InputBox from "../../../../../Utils/InputCard/InputCard";
import CustomBtn from "../../../../../Utils/CustomBtn/CustomBtn";
import AuthScreenLayout from "../../../../../Layouts/AuthScreenLayout";
import { usePersonalInfoHook } from "./PersonalInfo.hook";

const PersonalInfo = () => {
  const { userData, handleInputChange, onChangeProfile } =
    usePersonalInfoHook();
  return (
    <AuthScreenLayout>
      <View style={styles.container}>
        <InputBox
          label="Full Name"
          icon="person-outline"
          value={userData.name}
          onChangeText={(text) => handleInputChange("name", text)}
        />
        <InputBox
          label="Email - ID"
          icon="mail-outline"
          value={userData.email}
          onChangeText={(text) => handleInputChange("email", text)}
          keyboardType="email-address"
        />
        <InputBox
          label="Date of Birth"
          icon="calendar-outline"
          value={userData.dateOfBirth}
          onChangeText={(text) => handleInputChange("dateOfBirth", text)}
        />
        <InputBox
          label="Address"
          icon="book-outline"
          value={userData.address}
          onChangeText={(text) => handleInputChange("address", text)}
        />
        <View>
          <CustomBtn
            title="Update"
            btnBg="#e02e88"
            btnColor="#fff"
            onPress={onChangeProfile}
          />
        </View>
      </View>
    </AuthScreenLayout>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    paddingHorizontal: 26,
    paddingVertical: 12,
    position: "relative",
    marginTop: 20,
  },
});
