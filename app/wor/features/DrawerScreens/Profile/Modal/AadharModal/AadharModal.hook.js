import { useEffect, useState } from "react";
import { aadharCardOtpVerification, aadharNumberSendOtp } from "./AadharModal.Serv";
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
  const [isLoading, setIsLoading] = useState(false);
  const [resendAvailable , setIsResendAvailable] = useState(false)

  const [timer, setTimer] = useState(120); // Timer starts at 60 seconds

  const handleSubmitOtp = async () => {
    setIsLoading(true);

    const data = await aadharCardOtpVerification({
      otp: otp?.join(""),
      clientId,
      token,
    });

    setIsLoading(false);

    if (!data.status) {
      if (data?.gengerFailed) {
        setGenderFailed("Gender");
      } else if (data?.serverError) {
        setGenderFailed("server");
      } else if (data?.ownServerFailed === "Aadhar Number Already Exist....!") {
        setOtpError("Aadhar Number Already Exist....!");
        return;
      } else if (data?.ownServerFailed !== "Aadhar Number Already Exist....!") {
        setGenderFailed("ownServer");
      } else {
        setOtpError(data?.otpFailed);
        return;
      }
    }

    dispatch(onProfileSection({ token }));
    setOtpVerified(true);
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
      aadharNumberSendOtp({ aadharNumber })

      console.log(data , "From otp");
      
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
    isLoading,
    setAadharNumber,
    aadharNumber,
    handleResendOtp,
    resendAvailable,
    timer
  };
};
