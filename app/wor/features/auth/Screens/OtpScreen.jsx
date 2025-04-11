import React, { useState } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AuthAppBar from "./AuthAppBar";
import CustomBtn from "../../../utiles/CustomBtn";
import AProductFromNuhvin from "../Components/AProductFromNuhvin";
import { useOtpHook } from "../Hooks/Otp.hook";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "../../../fonts/Fonts";
import Input from "../../../utiles/Input";

const OtpScreen = ({}) => {
  const {
    message,
    otpError,
    isLoading,
    handleChange,
    justLog,
    otp,
    inputs,
    handleKeyPress,
    timer,
    isResendAvailable,
    handleResendOtp,
    setOtp,
    handleSetOtpChange,
    mobile,
  } = useOtpHook();

  const [isFocused, setIsFocused] = useState(false);
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust for iOS and Android
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : -40}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <AuthAppBar faqs="OTP" isLoginScreen={false} supportNavigate="Otp" />
          <View style={styles.loginInnerCard}>
            <View style={{ width: "100%", gap: 10 }}>
              <Text style={{ fontFamily: fonts.robotoSemiBold, fontSize: 24 }}>
                Welcome Back {message}!
              </Text>
              <Text style={{ fontSize: 14, fontFamily: fonts.robotoMedium }}>
                Please enter your 6-digit OTP
              </Text>
              <Text
                style={{
                  color: "gray",
                  fontSize: 13,
                  fontFamily: fonts.robotoRegular,
                }}
              >
                The OTP will be sent to your mobile number +91{mobile}
              </Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Pressable onPress={() => navigation.goBack()}>
                  <Text
                    style={{
                      color: "blue",
                      fontSize: 13,
                      fontFamily: fonts.robotoRegular,
                    }}
                  >
                    Change Number
                  </Text>
                </Pressable>
              </View>

              <TextInput
                keyboardType="numeric"
                value={otp}
                style={styles.inputCard}
                onChangeText={handleSetOtpChange}
                maxLength={11}
              />

              {isResendAvailable ? (
                <Pressable onPress={handleResendOtp}>
                  <Text
                    style={{
                      color: "blue",
                      fontSize: 13,
                      fontFamily: fonts.robotoRegular,
                    }}
                  >
                    Resend OTP Timer
                  </Text>
                </Pressable>
              ) : (
                <Text
                  style={{
                    color: "gray",
                    fontSize: 13,
                    fontFamily: fonts.robotoRegular,
                  }}
                >
                  Requested new OTP in {timer}s
                </Text>
              )}
            </View>
          </View>

          <View style={{ width: "100%", marginBottom: 40, padding: 20 }}>
            {otpError && (
              <View style={styles.errorCard}>
                <Text style={styles.errorMsg}>{otpError}</Text>
              </View>
            )}
            <CustomBtn
              title="continue"
              btnBg={otp[5]?.length <= 0 ? "#f7f7f7" : "#EA4C89"}
              btnColor={otp[5]?.length <= 0 ? "#EA4C89" : "#fff"}
              onPress={justLog}
              width="100%"
              isLoding={isLoading}
            />
          </View>
          <AProductFromNuhvin />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  loginInnerCard: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  inputCard: {
    width: "100%",
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#b0b0b0",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    position: "relative",
    textAlign: "center",
    fontSize: 24,
  },
  input: {
    width: 20,
    height: 20,
    borderRadius: 20,
    fontSize: 16,
    fontFamily: fonts.robotoRegular,
  },
  errorCard: {
    width: "100%",
  },
  errorMsg: {
    color: "red",
    fontSize: 14,
    fontFamily: fonts.robotoRegular,
  },
  nuhvinProduct: {
    position: "absolute",
    width: "100%",
    height: 40,
    backgroundColor: "#b0b0b0",
    bottom: 0,
    left: 0,
    zIndex: 10000,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
