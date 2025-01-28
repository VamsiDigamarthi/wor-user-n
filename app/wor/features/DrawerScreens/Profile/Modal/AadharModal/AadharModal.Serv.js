import axios from "axios";
import { showMessage } from "react-native-flash-message";
import { API } from "../../../../../../../Constants/url";

const surePassApiKay =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczNzk3MDczNSwianRpIjoiOWQyNTQ1ODQtNWY1NS00ZDYzLWJiNTQtZTY2MWVhMThlNDY0IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2Lm51aHZpbjAyQHN1cmVwYXNzLmlvIiwibmJmIjoxNzM3OTcwNzM1LCJleHAiOjE3MzkyNjY3MzUsImVtYWlsIjoibnVodmluMDJAc3VyZXBhc3MuaW8iLCJ0ZW5hbnRfaWQiOiJtYWluIiwidXNlcl9jbGFpbXMiOnsic2NvcGVzIjpbInVzZXIiXX19.J85AasDpYdVQbo9ytGdf0mmAVFgymmmWhHfQzMGgJHQ";

export const aadharNumberSendOtp = async ({ aadharNumber }) => {
  try {
    const response = await axios.post(
      "https://sandbox.surepass.io/api/v1/aadhaar-v2/generate-otp",
      {
        id_number: aadharNumber,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${surePassApiKay}`, // Passing the token in the Authorization header
        },
      }
    );
    return {
      status: true,
      clientId: response?.data?.data?.client_id,
    };
  } catch (error) {
    console.log("aadhar otp sending failed");
    showMessage({
      message: error?.response?.data?.message || "Send Otp Failed",
      type: "danger",
      icon: "auto",
    });
    return {
      status: false,
      error: "Sending OTP failed please try again",
    };
  }
};

const handleUploadAdharDetailsToServer = async ({ data, token }) => {
  try {
    await API.patch(
      "/auth/aadhar-card-verification",
      { data },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return true;
  } catch (error) {
    console.log("aadhar supepass data upload failed");
    console.log("handleUpdateAddharDetailsToServer");
    return false;
  }
};

export const aadharCardOtpVerification = async ({ otp, clientId, token }) => {
  try {
    const response = await axios.post(
      "https://sandbox.surepass.io/api/v1/aadhaar-v2/submit-otp",
      {
        otp: otp,
        client_id: clientId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${surePassApiKay}`, // Passing the token in the Authorization header
        },
      }
    );

    if (response?.data?.data?.gender === "M") {
      return {
        status: false,
        gengerFailed: true,
      };
    }
    const ownServerData = await handleUploadAdharDetailsToServer({
      data: response?.data?.data,
      token,
    });
    if (ownServerData) {
      return {
        status: true,
      };
    }
    return {
      status: false,
      ownServerFailed: true,
    };
  } catch (error) {
    if (error?.response?.data?.message === "Verification Failed.") {
      console.log("failed");
      return {
        status: false,
        otpFailed: "OTP Verification Failed",
      };
    }
    return {
      status: false,
      serverError: "Server Error",
    };
  }
};
