import axios from "axios";
import { useRef, useState } from "react";

export const useAadharVerificationComHook = () => {
  const [aadharNumber, setAadharNumber] = useState("");
  const [error, setError] = useState("");
  const [storeRequestId, setStoreRequestId] = useState("");
  const [otpVerificationFailed, setOtpVerificationFailed] = useState("");

  const [otpInputEditable, setOtpInputEditable] = useState(true);

  const [displayOtpBox, setDisplayOtpBox] = useState(false);
  const [aadharUploadImageDisplay, setAadharUploadImageDisplay] =
    useState(false);

  const [changeGetOtpToVerified, setChangeGetOtpToVerified] = useState(true);

  // otp related

  const inputs = useRef([]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleKeyPress = (e, index) => {
    // Move to the previous input when backspace is pressed and the current input is empty
    if (e.nativeEvent.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  const handleChange = (text, index) => {
    // Only accept numeric input
    if (/^[0-9]*$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text; // Update the current OTP input

      setOtp(newOtp); // Update the state with the new OTP values

      // Move to the next input if the current input is filled
      if (text && index < otp.length - 1) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleInputChange = (text) => {
    setAadharNumber(text);
  };

  const onAadharCardGetOtpFunction = async () => {
    console.log("for otp function");
    if (!aadharNumber) {
      setError("Aadhar number is required");
      return;
    }
    if (aadharNumber?.length !== 12) {
      setError("Aadhar number should be 12 digits long");
      return;
    }

    try {
      const response = await axios.post(
        "https://uat-hub.perfios.com/api/kyc/v3/aadhaar-xml/otp",
        {
          aadhaarNo: aadharNumber,
          consent: "Y",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-key": "q4Ewu5OELeimuoiS",
          },
        }
      );
      setError("");
      setDisplayOtpBox(true);
      console.log(response.data);
      setStoreRequestId(response?.data?.requestId);
      setOtpInputEditable(false);
    } catch (error) {
      console.log(error);
      setError("Sending OTP failed please try again");
    }
  };

  const onVerifyAddharOtp = async () => {
    try {
      const response = await axios.post(
        "https://uat-hub.perfios.com/api/kyc/v3/aadhaar-xml/file",
        {
          otp: otp,
          aadhaarNo: aadharNumber,
          requestId: storeRequestId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-key": "q4Ewu5OELeimuoiS",
          },
        }
      );
      console.log(response?.data);
      setAadharUploadImageDisplay(true);
      setOtpVerificationFailed("");
      setDisplayOtpBox(false);
      setChangeGetOtpToVerified(false);

      //   call api
    } catch (error) {
      console.log(error);
      setOtpVerificationFailed("Otp verification failed");
    }
  };

  return {
    aadharNumber,
    handleInputChange,
    error,
    onAadharCardGetOtpFunction,
    displayOtpBox,
    onVerifyAddharOtp,
    aadharUploadImageDisplay,
    // otp related
    inputs,
    handleKeyPress,
    handleChange,
    otp,
    otpVerificationFailed,
    otpInputEditable,
    changeGetOtpToVerified,
  };
};
