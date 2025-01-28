import { useState } from "react";
import { aadharCardOtpVerification } from "./AadharModal.Serv";
import { useSelector } from "react-redux";

export const useAadharModalHook = () => {
  const { token } = useSelector((state) => state.token);
  const [aadharNumber, setAadharNumber] = useState("");
  const [otpPress, setOtpPress] = useState(false);
  const [clientId, setClientId] = useState(null);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [genderFailed, setGenderFailed] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      } else if (data?.ownServerFailed) {
        setGenderFailed("ownServer");
      } else {
        setOtpError(data?.otpFailed);
        return;
      }
    }

    setOtpVerified(true);
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
  };
};
