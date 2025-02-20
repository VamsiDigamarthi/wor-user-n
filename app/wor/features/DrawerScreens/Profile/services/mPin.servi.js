import Toast from "react-native-toast-message";
import { API } from "../../../../../../Constants/url";
import DeviceInfo from "react-native-device-info";
export const setNewmPin = async ({ token, mpin }) => {
  try {
    await API.patch(
      "/user/m-pin",
      {
        mpin,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    Toast.show({
      text1: "M-Pin added Successfully",
      type: "success",
      position: "bottom",
    });
    return true;
  } catch (error) {
    Toast.show({
      text1: "SET M-PIN failed",
      type: "error",
      position: "bottom",
    });
    return false;
  }
};

export const sendOtpToMobileNumber = async ({ mobile }) => {
  try {
    await API.post("/auth/send-otp", { mobile });
    Toast.show({
      text1: "OTP send successfully",
      type: "success",
      position: "top",
    });
    return true;
  } catch (error) {
    Toast.show({
      text1: "Sending Otp Failed",
      type: "error",
      position: "top",
    });
    return false;
  }
};

export const onVerifiOtp = async ({ otp, mobile }) => {
  const deviceId = await DeviceInfo.getUniqueId();
  // console.log(otp, mobile);
  try {
    await API.post("/auth/verify-otp", { mobile, otp, deviceId });
    return true;
  } catch (error) {
    Toast.show({
      text1: "OTP Verification Failed",
      type: "error",
      position: "top",
    });
    return false;
  }
};
