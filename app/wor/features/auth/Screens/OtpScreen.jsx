import React, { useState, useEffect, useRef } from "react";
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

// Separate Timer Component
const Timer = ({ timeLeft, setTimeLeft, setCanResend }) => {
  const timerRef = useRef(null);

  useEffect(() => {
    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }

    // Cleanup on unmount
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft]);

  return (
    <Text style={{ color: "gray", fontSize: 13 }}>
      {timeLeft > 0 ? `Request new OTP in ${timeLeft} seconds` : "Resend OTP"}
    </Text>
  );
};

const OtpScreen = ({}) => {
  const {
    message,
    otpError,
    isLoading,
    handleChange,
    justLog,
    otp,
    setOtp,
    inputs,
    handleKeyPress,
  } = useOtpHook();

  const [isFocused, setIsFocused] = useState(false);
  const navigation = useNavigation();
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute countdown
  const [canResend, setCanResend] = useState(false);

  // console.log(mobile);
  const handleResendOtp = () => {
    // Add your resend OTP logic here
    console.log("Resending OTP...");
    setTimeLeft(60); // Reset the timer
    setCanResend(false); // Disable the resend button again
  };

  function handleBack() {
    try {
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust for iOS and Android
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <AuthAppBar isLoginScreen={false} />
          <View style={styles.loginInnerCard}>
            <View style={{ width: "100%", gap: 10 }}>
              <Text style={{ fontWeight: "600", fontSize: 24 }}>
                Welcome Back {message} !
              </Text>
              <Text style={{ fontSize: 14, fontWeight: "500" }}>
                Please enter your 6-digit OTP
              </Text>
              <Text style={{ color: "gray", fontSize: 13 }}>
                The OTP will be sent to your mobile number
              </Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Pressable onPress={handleBack}>
                  <Text style={{ color: "blue", fontSize: 13 }}>
                    Change Number
                  </Text>
                </Pressable>
              </View>
              <View
                style={[
                  styles.inputCard,
                  { borderColor: isFocused && "#e02e88", borderWidth: 1 },
                ]}
              >
                {otp?.map((value, index) => (
                  <TextInput
                    onPress={Keyboard.dismiss}
                    key={index}
                    ref={(input) => (inputs.current[index] = input)} // Store refs for each input
                    maxLength={1}
                    keyboardType="numeric"
                    style={[
                      styles.input,
                      {
                        backgroundColor: value ? "transparent" : "#f7f7f7",
                      },
                    ]}
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    value={value}
                    textAlign="center"
                    onFocus={() => {
                      inputs.current[index].setNativeProps({
                        style: { borderColor: "#E02E88" }, // Change border color to pink on focus
                      });
                      setIsFocused(true);
                    }}
                    onBlur={() => {
                      inputs.current[index].setNativeProps({
                        style: { borderColor: value ? "#E02E88" : "#A9A9A9" }, // Revert based on value
                      });
                      setIsFocused(true);
                    }}
                  />
                ))}
              </View>
              {canResend ? (
                <Pressable onPress={handleResendOtp}>
                  <Text style={{ color: "blue", fontSize: 13 }}>
                    Resend OTP
                  </Text>
                </Pressable>
              ) : (
                <Timer
                  timeLeft={timeLeft}
                  setTimeLeft={setTimeLeft}
                  setCanResend={setCanResend}
                />
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
              btnBg={otp[5]?.length <= 0 ? "#f7f7f7" : "#e02e88"}
              btnColor={otp[5]?.length <= 0 ? "#e02e88" : "#fff"}
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
    height: 66,
    borderWidth: 1,
    borderColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
  },
  input: {
    width: 20,
    height: 20,
    borderRadius: 20,
    fontSize: 16,
  },
  errorCard: {
    width: "100%",
  },
  errorMsg: {
    color: "red",
    fontSize: 14,
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
