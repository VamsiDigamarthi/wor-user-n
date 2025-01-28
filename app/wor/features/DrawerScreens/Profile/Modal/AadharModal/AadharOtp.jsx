import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import CustomBtn from "../../../../../utiles/CustomBtn";
import { AntDesign } from "@expo/vector-icons";
import OtpUi from "../../../../../utiles/OtpUi";

const AadharOtp = ({
  otp,
  setOtp,
  handleSubmitOtp,
  text = "Linked to your Aadhar +91 1234567890",
  isLoading,
  otpError,
}) => {
  return (
    <View style={styles.bottomCardContainer}>
      <View style={styles.Card}>
        <Text style={styles.heading}>Enter Otp</Text>
        <Text style={{ fontSize: 12, color: "gray" }}>
          Enter the 6 digit otp recieved on phone number
        </Text>
        <Text style={{ fontSize: 12, color: "gray" }}>{text}</Text>
      </View>
      {otpError && (
        <Text style={{ fontSize: 11, color: "red" }}>{otpError}</Text>
      )}
      <OtpUi otp={otp} setOtp={setOtp} />
      <View>
        <Text style={{ fontSize: 12, color: "gray" }}>
          Having trouble ?Request new OTP in 00:52{" "}
        </Text>
      </View>

      <View style={styles.rowCard}>
        <AntDesign name="Safety" size={24} color="black" />
        <Text>Your Data is 100% Safe and Secure</Text>
      </View>

      <CustomBtn
        title="continue"
        onPress={handleSubmitOtp}
        btnBg={otp[5]?.length <= 0 ? "#f7f7f7" : "#e02e88"}
        btnColor={otp[5]?.length <= 0 ? "#e02e88" : "#fff"}
        isLoading={isLoading}
      />
    </View>
  );
};

export default AadharOtp;

const styles = StyleSheet.create({
  bottomCardContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 15,
  },
  Card: {
    gap: 5,
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "red",
    borderWidth: 1,
    borderColor: "gray",
  },
  rowCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
