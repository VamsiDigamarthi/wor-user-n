import {
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import AuthAppBar from "./AuthAppBar";
import CustomBtn from "../../../utiles/CustomBtn";
import {
  CommonActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToken } from "../../../../../redux/Features/Auth/LoginSlice";
import { API } from "../../../../../Constants/url";
import { useDispatch } from "react-redux";

const OtpScreen = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const { mobile, message } = useRoute().params;
  const inputs = useRef([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [otpError, setOtpError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //   const [backColors, setBackColors] = useState()

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    if (text && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
    setOtp(newOtp);
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && otp[index] === "") {
      inputs.current[index - 1].focus();
    }
  };
  const [isFocused, setIsFocused] = useState(false);

  const justLog = async () => {
    console.log(otp);
    if (otp[5]?.length <= 0) {
      setOtpError("Please enter OTP");
      return;
    }
    setIsLoading(true);
    try {
      const response = await API.post("/auth/verify-otp", {
        mobile,
        otp: otp.join(""),
        isUserApp: true,
      });
      setIsLoading(false);

      if (response.data.token) {
        console.log(response.data.token);
        await AsyncStorage.setItem(
          "token",
          JSON.stringify(response.data.token)
        );
        dispatch(setToken(response.data.token));
        // navigation.navigate("AuthenticatedStack");
        navigation.dispatch(
          CommonActions.reset({
            index: 0, // Ensures the specified route is the only route in the stack
            routes: [{ name: "AuthenticatedStack" }], // Replace 'Home' with your target screen name
          })
        );
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
      setIsLoading(false);
      if (error.response?.data?.message === "Invalid OTP") {
        setOtpError("Invalid Otp");
      } else if (error.response?.data?.message === "User does not exist") {
        console.log("navigating");

        navigation.navigate("signup", { mobile });
      } else {
        setOtpError(error?.response?.data?.message);
      }
    }
  };

  const openLink = () => {
    const url = "https://nuhvin.com"; // Replace with your desired URL
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
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
            <Text style={{ color: "gray", fontSize: 13 }}>123456 .</Text>
            <Pressable>
              <Text style={{ color: "blue", fontSize: 13 }}>Change Number</Text>
            </Pressable>
          </View>
          <View
            style={[
              styles.inputCard,
              { borderColor: isFocused && "#e02e88", borderWidth: 1 },
            ]}
          >
            {otp.map((value, index) => (
              <TextInput
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
      <View style={styles.nuhvinProduct}>
        <Text style={{ fontSize: 14, fontWeight: "500" }}>A Product From</Text>
        <Pressable onPress={openLink}>
          <Text style={{ fontSize: 14, fontWeight: "500", color: "#e02e88" }}>
            Visit NuHvin
          </Text>
        </Pressable>
      </View>
    </View>
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
    fontSize: 22,
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
