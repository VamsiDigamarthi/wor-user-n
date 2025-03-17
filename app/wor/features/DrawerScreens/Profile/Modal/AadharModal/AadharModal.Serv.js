import axios from "axios";
import { showMessage } from "react-native-flash-message";
import { API } from "../../../../../../../Constants/url";

const surePassApiKay =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczODczOTM2NCwianRpIjoiNDQwNjBkNWMtODA5NC00MTYxLWEyODktMTQ5M2JmOGNhNjQxIiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2Lm51aHZpbjAyQHN1cmVwYXNzLmlvIiwibmJmIjoxNzM4NzM5MzY0LCJleHAiOjIzNjk0NTkzNjQsImVtYWlsIjoibnVodmluMDJAc3VyZXBhc3MuaW8iLCJ0ZW5hbnRfaWQiOiJtYWluIiwidXNlcl9jbGFpbXMiOnsic2NvcGVzIjpbInVzZXIiXX19.FKrt3pav4Ls7zcOojQ51GijcW-YImN62xNhkx2K_4uY";

export const aadharNumberSendOtp = async ({ aadharNumber }) => {
  try {
    const response = await axios.post(
      "https://kyc-api.surepass.io/api/v1/aadhaar-v2/generate-otp",
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
    console.log(error?.response?.data);

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

    return { status: true };
  } catch (error) {
    if (error?.response?.data?.message === "Aadhar Number Already Exist....!") {
      return {
        status: false,
        errMsg: error?.response?.data?.message,
      };
    }

    return {
      status: false,
      errMsg: "Wor Server Update Your details failed Please try again later",
    };
  }
};

export const aadharCardOtpVerification = async ({ otp, clientId, token }) => {
  try {
    const response = await axios.post(
      "https://kyc-api.surepass.io/api/v1/aadhaar-v2/submit-otp",
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

    console.log("ownServerData", ownServerData);

    if (ownServerData.status) {
      return {
        status: true,
      };
    }
    return {
      status: false,
      ownServerFailed: ownServerData?.errMsg,
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
