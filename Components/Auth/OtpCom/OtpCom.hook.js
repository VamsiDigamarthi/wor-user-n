import { useNavigation, useRoute } from "@react-navigation/native";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  userLogin,
  setIsSigningUp,
} from "../../../redux/Features/Auth/LoginSlice";

export const useOtpComHook = () => {
  const inputs = useRef([]);
  const route = useRoute();
  const { mobile, termsAndCondition } = route.params;
  const dispatch = useDispatch();
  const [otpError, setOtpError] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigation = useNavigation();

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

  const onHandleOtpApiCall = async () => {
    if (!otp?.join("")) {
      setOtpError("Please enter a valid OTP");
      return;
    }
    try {
      const response = await dispatch(
        userLogin({ mobile, otp: otp.join(""), termsAndCondition })
      );
      // console.log(response);
      if (response.payload && response.payload.token) {
        navigation.navigate("Home"); // Replace "Home" with your authenticated screen
      } else if (response.payload === "User does not exist") {
        // dispatch(setIsSigningUp(true));
        navigation.navigate("signup", {
          mobile: mobile,
        });
      } else {
        setOtpError(response.payload || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      setOtpError("An error occurred while processing the OTP");
    }
  };

  return {
    otp,
    handleChange,
    handleKeyPress,
    onHandleOtpApiCall,
    inputs,
    otpError,
  };
};
