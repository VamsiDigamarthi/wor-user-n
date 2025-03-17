import { useEffect, useState } from "react";
import {
  aadharCardOtpVerification,
  aadharNumberSendOtp,
} from "./AadharModal.Serv";
import { useDispatch, useSelector } from "react-redux";
import { onProfileSection } from "../../../../ridebooking/home/redux/profileSlice";
import { loginApi } from "../../../../auth/services/authServices";

export const useAadharModalHook = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const [aadharNumber, setAadharNumber] = useState("");
  const [otpPress, setOtpPress] = useState(false);
  const [clientId, setClientId] = useState(null);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [genderFailed, setGenderFailed] = useState("");
  const [resendAvailable, setIsResendAvailable] = useState(false);

  const [otpLoading, setOtpLoading] = useState(false);

  const [timer, setTimer] = useState(120); // Timer starts at 60 seconds

  const handleSubmitOtp = async () => {
    console.log("submit verified otp start");

    setOtpLoading(true);
    console.log("after loading otp");

    const data = await aadharCardOtpVerification({
      otp: otp?.join(""),
      clientId,
      token,
    });

    // console.log("submit verified otp end", data);

    setOtpLoading(false);

    if (!data.status) {
      if (data?.gengerFailed) {
        setGenderFailed("Gender");
        setOtpVerified(true);
        return;
      } else if (data?.serverError) {
        setGenderFailed("server");
        setOtpVerified(true);
        return;
      } else if (data?.ownServerFailed === "Aadhar Number Already Exist....!") {
        setOtpError("Aadhar Number Already Exist....!");
        return;
      } else if (data?.ownServerFailed !== "Aadhar Number Already Exist....!") {
        setGenderFailed("ownServer");
        return;
      } else {
        setOtpError(data?.otpFailed);
        return;
      }
    }

    dispatch(onProfileSection({ token }));
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
    setTimer(120);
    setIsResendAvailable(false);
    aadharNumberSendOtp({ aadharNumber });
  };

  return {
    otpPress,
    setOtpPress,
    setClientId,
    otpVerified,
    otp,
    setOtp,
    setOtpVerified,
    handleSubmitOtp,
    genderFailed,
    otpError,

    setAadharNumber,
    aadharNumber,
    handleResendOtp,
    resendAvailable,
    timer,
    otpLoading,
  };
};
