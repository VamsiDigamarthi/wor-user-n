import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../../redux/Features/Auth/LoginSlice";
import Toast from "react-native-toast-message";
import { API } from "../../../Constants/url";

export const useOtpComHook = () => {
  const { error } = useSelector((state) => state.token);
  const inputs = useRef([]);
  const route = useRoute();
  const { mobile, termsAndCondition } = route.params;
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const navigation = useNavigation();

  const [openResendBtn, setOpenResendBtn] = useState(false);

  useEffect(() => {
    startTimer();
  }, []);

  const startTimer = () => {
    console.log("Timer started"); // Debugging log
    const timer = setTimeout(() => {
      console.log("Resend button is now visible"); // Debugging log
      setOpenResendBtn(true);
    }, 10000); // 1000ms delay

    return () => {
      clearTimeout(timer);
      console.log("Timer cleared");
    };
  };

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
      ).unwrap();
      console.log("otp com hook line number 39:", response);

      // If user login is successful, navigate to authenticated stack
      if (response.token) {
        navigation.navigate("AuthenticatedStack");
      } else if (response.message === "User does not exist") {
        navigation.navigate("signup", { mobile });
      }
    } catch (error) {
      console.log("OTP Hook catch block:", error);

      // Handle specific errors from the backend
      switch (error) {
        case "User not found in database":
          setOtpError("User not found. Please sign up.");

          navigation.navigate("signup", { mobile });
          break;
        case "Invalid OTP":
          setOtpError("Invalid OTP. Please try again.");
          break;
        case "User does not exist":
          setOtpError("User does not exist. Please sign up.");
          console.log("from switch code ", error);
          navigation.navigate("signup", { mobile });
          break;
        default:
          // Handle general errors
          setOtpError(error || "An error occurred. Please try again.");
          break;
      }
    }
  };

  const resendOtp = async () => {
    try {
      const response = await API.post("/auth/send-otp", { mobile: mobile });

      setOpenResendBtn(false);

      if (response.data.message == "OTP sent successfully!") {
        Toast.show({
          text1: "Otp Resend Success",
          type: "success",
          position: "bottom",
        });
      }
    } catch (error) {
      setOpenResendBtn(true);
      console.log(error?.response);
      setOtpError(error?.response?.data?.message);
    } finally {
      startTimer();
    }
  };

  return {
    otp,
    handleChange,
    handleKeyPress,
    onHandleOtpApiCall,
    inputs,
    otpError,
    mobile,
    resendOtp,
    openResendBtn,
  };
};
