import {
  CommonActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import DeviceInfo from "react-native-device-info";
import { useDispatch } from "react-redux";
import { API } from "../../../../../Constants/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToken } from "../../../../../redux/Features/Auth/LoginSlice";
import { Keyboard } from "react-native";
import { loginApi, removeOtp } from "../services/authServices";

export const useOtpHook = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const { mobile, message } = useRoute().params || {};

  const inputs = useRef([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [otpError, setOtpError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [timer, setTimer] = useState(60); // Timer starts at 60 seconds
  const [isResendAvailable, setIsResendAvailable] = useState(false); // To control "Resend OTP" button visibility

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    if (text && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }

    if (index === inputs.current.length - 1 && text) {
      Keyboard.dismiss(); // Dismiss the keyboard when the last digit is entered
    }
    setOtp(newOtp);
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && otp[index] === "") {
      inputs.current[index - 1].focus();
    }
  };

  const justLog = async () => {
    // console.log(otp);
    if (otp[5]?.length <= 0) {
      setOtpError("Please enter OTP");
      return;
    }
    setIsLoading(true);
    try {
      const deviceId = await DeviceInfo.getUniqueId();
      // console.log("deviceId", deviceId);
      // console.log("otp?.replace(/s/g", otp?.replace(/\s/g, ""));
      const response = await API.post("/auth/verify-otp", {
        mobile: mobile,
        otp: otp?.replace(/\s/g, ""),
        isUserApp: false,
        deviceId,
      });
      setIsLoading(false);

      if (response.data.token) {
        // console.log(response.data.token);
        await AsyncStorage.setItem(
          "token",
          JSON.stringify(response.data.token)
        );

        await AsyncStorage.setItem(
          "ownUser",
          JSON.stringify(response.data.ownUser)
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
      // console.log(error?.response?.data?.message);
      setIsLoading(false);
      if (error.response?.data?.message === "Invalid OTP") {
        setOtpError("Invalid Otp");
      } else if (error.response?.data?.message === "User does not exist") {
        // console.log("navigating");

        navigation.navigate("signup", { mobile: mobile });
      } else {
        setOtpError(error?.response?.data?.message);
      }
    }
  };

  // Timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendAvailable(true);
    }
  }, [timer]);

  const handleResendOtp = async () => {
    setTimer(60);
    setIsResendAvailable(false);
    loginApi({ mobile });
  };

  const handleSetOtpChange = (value) => {
    // Remove existing spaces and insert a space between each character
    const formattedValue = value.replace(/\s/g, "").split("").join(" ");
    setOtp(formattedValue);
  };

  const expireOTP = async () => {
    if (isResendAvailable && timer === 0) {
      await removeOtp({ mobile });
    }
  };

  useEffect(() => {
    expireOTP();
  }, [timer, isResendAvailable]);

  return {
    message,
    mobile,
    otpError,
    isLoading,
    handleChange,
    justLog,
    otp,
    setOtp,
    inputs,
    handleKeyPress,
    timer,
    isResendAvailable,
    handleResendOtp,
    setOtp,
    handleSetOtpChange,
  };
};
