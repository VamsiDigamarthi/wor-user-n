import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect } from "react";
import CustomBtn from "../../../../../utiles/CustomBtn";
import { AntDesign } from "@expo/vector-icons";
import OtpUi from "../../../../../utiles/OtpUi";
import { fonts } from "../../../../../fonts/Fonts";

const AadharOtp = ({
  otp,
  setOtp,
  handleSubmitOtp,
  text = "Linked to your Aadhar +91 1234567890",
  isLoading,
  otpError,
  resendAvailable,
  handleResendOtp,
  timer,
}) => {
  useEffect(() => {
    console.log("isLoadin 0000000000000000000000000000g", isLoading);
  }, [isLoading]);

  return (
    <View style={styles.bottomCardContainer}>
      <View style={styles.Card}>
        <Text style={styles.heading}>Enter Otp</Text>
        <Text style={styles.subText}>
          Enter the 6 digit otp recieved on phone number
        </Text>
        <Text style={styles.subText}>{text}</Text>
      </View>
      {otpError && (
        <Text style={{ fontSize: 11, color: "red" }}>{otpError}</Text>
      )}
      <OtpUi otp={otp} setOtp={setOtp} />
      <View>
        {resendAvailable ? (
          <Pressable onPress={handleResendOtp}>
            <Text style={{ color: "blue", fontSize: 13 }}>Resend OTP</Text>
          </Pressable>
        ) : (
          <Text style={{ color: "gray", fontSize: 13 }}>
            Requested new OTP in {Math.floor(timer / 60)}:
            {String(timer % 60).padStart(2, "0")}
          </Text>
        )}
      </View>

      <View style={styles.rowCard}>
        <AntDesign name="Safety" size={24} color="black" />
        <Text style={{ color: "#757575", fontFamily: fonts.robotoRegular }}>
          Your Data is 100% Safe and Secure
        </Text>
      </View>

      <CustomBtn
        title="continue"
        onPress={handleSubmitOtp}
        btnBg={otp[5]?.length <= 0 ? "#f7f7f7" : "#EA4C89"}
        btnColor={otp[5]?.length <= 0 ? "#EA4C89" : "#fff"}
        isLoding={isLoading}
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
    // fontWeight: "600",
    fontFamily: fonts.robotoMedium,
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

  subText: { fontSize: 12, color: "gray", fontFamily: fonts.robotoRegular },
});
