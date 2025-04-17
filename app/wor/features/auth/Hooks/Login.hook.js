import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Linking } from "react-native";
import { API } from "../../../../../Constants/url";
import { loginApi } from "../services/authServices";

export const useLoginHook = () => {
  const handleCheck = () => {
    const url = "https://womenrider.nuhvin.com/privacypolicy"; // Replace with your desired URL
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const onNavigateTermsAndConditions = () => {
    const url = "https://womenrider.nuhvin.com/termsandconditions"; // Replace with your desired URL
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const openLink = () => {
    const url = "https://nuhvin.com"; // Replace with your desired URL
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const [mobile, setMobile] = useState("");
  const [errorState, setErrorState] = useState({
    mobile: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigation = useNavigation();
  const handleMobileChange = (text) => {
    setMobile(text);
  };

  useEffect(() => {
    if (mobile?.length === 10) {
      setErrorState((prevState) => ({
        ...prevState,
        mobile: "",
      }));
    }
    if (mobile?.length === 10) {
      setErrorState({});
    }
  }, [mobile]);

  const loginValidation = (mobile) => {
    const errors = { mobile: "" };

    if (!mobile) {
      errors.mobile = "Mobile number is required.";
    } else if (!/^[0-9]{10}$/.test(mobile)) {
      errors.mobile = "Please enter a valid 10-digit mobile number.";
    }

    return errors.mobile ? errors : {};
  };

  const handleLogin = async () => {
    const error = loginValidation(mobile);
    setErrorState(error);
    if (Object.keys(error).length > 0) {
      return;
    }
    setIsLoading(true);

    const data = await loginApi({ mobile });
    // console.log("data", data);

    setIsLoading(false);
    if (!data) {
      setApiError(error?.response?.data?.message);
      return;
    }
    navigation.navigate("otp", {
      mobile: mobile,
      message: data.data?.name === "user not found" ? "WOR" : data.data?.name,
    });
  };

  return {
    handleLogin,
    mobile,
    setMobile,
    handleCheck,
    onNavigateTermsAndConditions,
    openLink,
    handleMobileChange,
    errorState,
    isLoading,
    apiError,
  };
};
