import axios from "axios";
import { useRef, useState } from "react";
import { API } from "../../../Constants/url";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAadharVerificationComHook = () => {
  const [aadharNumber, setAadharNumber] = useState("");
  const [error, setError] = useState("");
  const [storeRequestId, setStoreRequestId] = useState("");
  const [otpVerificationFailed, setOtpVerificationFailed] = useState("");
  const [isAddharLoading, setIsAddharLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [otpInputEditable, setOtpInputEditable] = useState(true);

  const [displayOtpBox, setDisplayOtpBox] = useState(false);
  const [aadharUploadImageDisplay, setAadharUploadImageDisplay] =
    useState(false);

  const [changeGetOtpToVerified, setChangeGetOtpToVerified] = useState(true);

  // otp related

  const [otp, setOtp] = useState("");

  const handleInputChange = (text) => {
    setAadharNumber(text);
  };
  const handleOTPChange = (text) => {
    setOtp(text);
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

    setIsAddharLoading(true);

    try {
      const response = await axios.post(
        "https://sandbox.surepass.io/api/v1/aadhaar-v2/generate-otp",
        {
          id_number: aadharNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczNTI3NzcxNiwianRpIjoiZGNkMzVlNTctNTk5YS00MmRmLTgwYjEtYmQ1OTg1YWYwZGE0IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2Lm51aHZpbjAyQHN1cmVwYXNzLmlvIiwibmJmIjoxNzM1Mjc3NzE2LCJleHAiOjE3Mzc4Njk3MTYsImVtYWlsIjoibnVodmluMDJAc3VyZXBhc3MuaW8iLCJ0ZW5hbnRfaWQiOiJtYWluIiwidXNlcl9jbGFpbXMiOnsic2NvcGVzIjpbInVzZXIiXX19.2cl9ZdqVRvn8QkgcSKD2Qp1cE99MolEhTG5gP0kE_dQ`, // Passing the token in the Authorization header
          },
        }
      );

      setError("");
      setDisplayOtpBox(true);
      setStoreRequestId(response?.data?.data?.client_id);
      setOtpInputEditable(false);
      setIsAddharLoading(false);
    } catch (error) {
      console.log(error);
      setError("Sending OTP failed please try again");
      setIsAddharLoading(false);
    }
  };

  const handleUpdateAddharDetailsToServer = async (data) => {
    const token = await AsyncStorage.getItem("token");
    try {
      API.patch(
        "/auth/aadhar-card-verification",
        { data },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );

      console.log("3rd party aadhar card updated successfully");
    } catch (error) {
      console.log(error?.response?.data?.message);
      console.log("handleUpdateAddharDetailsToServer");
    }
  };

  const onVerifyAddharOtp = async () => {
    setOtpLoading(true);
    // console.log(otp);
    // console.log("storeRequestId", storeRequestId);
    try {
      const response = await axios.post(
        "https://sandbox.surepass.io/api/v1/aadhaar-v2/submit-otp",
        {
          otp: otp,
          client_id: storeRequestId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczNTI3NzcxNiwianRpIjoiZGNkMzVlNTctNTk5YS00MmRmLTgwYjEtYmQ1OTg1YWYwZGE0IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2Lm51aHZpbjAyQHN1cmVwYXNzLmlvIiwibmJmIjoxNzM1Mjc3NzE2LCJleHAiOjE3Mzc4Njk3MTYsImVtYWlsIjoibnVodmluMDJAc3VyZXBhc3MuaW8iLCJ0ZW5hbnRfaWQiOiJtYWluIiwidXNlcl9jbGFpbXMiOnsic2NvcGVzIjpbInVzZXIiXX19.2cl9ZdqVRvn8QkgcSKD2Qp1cE99MolEhTG5gP0kE_dQ`, // Passing the token in the Authorization header
          },
        }
      );
      setOtpVerified(true);
      // console.log(response?.data);
      handleUpdateAddharDetailsToServer(response?.data?.data);
      setAadharUploadImageDisplay(true);
      setOtpVerificationFailed("");
      setDisplayOtpBox(false);
      setChangeGetOtpToVerified(false);
      setOtpLoading(false);
      //   call api
    } catch (error) {
      console.log(error);
      setOtpLoading(false);
      setOtpVerificationFailed("Otp verification failed");
      setOtpVerified(false);
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
    handleOTPChange,
    otp,
    otpVerificationFailed,
    otpInputEditable,
    changeGetOtpToVerified,
    isAddharLoading,
    otpLoading,
    otpVerified,
  };
};
