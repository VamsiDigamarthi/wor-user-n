import { StyleSheet, View } from "react-native";
import React from "react";
import InputBox from "../../../../../Utils/InputCard/InputCard";
import CustomBtn from "../../../../../Utils/CustomBtn/CustomBtn";
import AuthScreenLayout from "../../../../../Layouts/AuthScreenLayout";

const PersonalInfo = () => {
  return (
    <AuthScreenLayout>
      <View style={styles.container}>
        <InputBox label="Full Name" icon="person-outline" />
        <InputBox label="Email - ID" icon="mail-outline" />
        <InputBox label="Date of Birth" icon="calendar-outline" />
        <InputBox label="Address" icon="book-outline" />
        <View>
          <CustomBtn title="Update" btnBg="#e02e88" btnColor="#fff" />
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
