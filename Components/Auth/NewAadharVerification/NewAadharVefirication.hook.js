import axios from "axios";
import { useState } from "react";

export const useNewAadharVefiricationHook = () => {
  const [aadharNumber, setAadharNumber] = useState("");
  const [aadharError, setAadharError] = useState("");
  const [aadharLoader, setAadharLoader] = useState(false);
  const [aadharVerified, setAadharVerified] = useState(false);
  const [storeRequestId, setStoreRequestId] = useState("");
  // otp
  const [otpValue, setOtpValue] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpVerified, setOptVerified] = useState(false);
  const [otpLoader, setOtpLoader] = useState(false);
  const handleInputChange = (text) => {
    setAadharNumber(text);
  };

  const onOtpChangehandle = (text) => {
    setOtpValue(text);
  };

  const onAddharNumberGetOtpHandle = async () => {
    if (!aadharNumber) {
      setAadharError("Aadhar number is required");
      return;
    }
    if (aadharNumber?.length !== 12) {
      setAadharError("Aadhar number should be 12 digits long");
      return;
    }
    setAadharError("");
    setAadharLoader(true);
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
      setAadharLoader(false);
      setAadharError("");
      setAadharVerified(true);
      setStoreRequestId(response?.data?.requestId);
    } catch (error) {
      console.log(error);
      setAadharLoader(false);
      setAadharError("Sending OTP failed please try again");
    }
  };

  const onOtpVefirified = async () => {
    if (!otpValue) {
      setOtpError("OTP is required");
      return;
    }
    if (otpValue?.length !== 6) {
      setOtpError("OTP should be 6 digits long");
      return;
    }
    setOtpLoader(true);
    try {
      await axios.post(
        "https://uat-hub.perfios.com/api/kyc/v3/aadhaar-xml/file",
        {
          otp: otpValue,
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
      setOptVerified(true);
      setOtpLoader(false);
    } catch (error) {
      setOtpError("OTP Verification Failed");
      setOtpLoader(true);
    }
  };

  return {
    aadharNumber,
    handleInputChange,
    aadharVerified,
    otpVerified,
    onAddharNumberGetOtpHandle,
    aadharError,
    aadharLoader,
    onOtpChangehandle,
    onOtpVefirified,
    otpLoader,
  };
};
