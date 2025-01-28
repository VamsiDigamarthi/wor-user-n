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
import { useState } from "react";
const OtpScreen = () => {
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
                The Otp will send your mobile number
              </Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                {/* <Text style={{ color: "gray", fontSize: 13 }}>123456 .</Text> */}
                <Pressable onPress={() => navigation.goBack()}>
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
              <Text style={{ color: "gray", fontSize: 13 }}>
                Requested new OTP in 02
              </Text>
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
    // width: "100%",
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
