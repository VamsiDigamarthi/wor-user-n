import { useState, useEffect } from "react";
import { API } from "../../../../../Constants/url";
import DeviceInfo from "react-native-device-info";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setToken } from "../../../../../redux/Features/Auth/LoginSlice";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { nearPlacesByText } from "../../../../../Constants/displaylocationmap";
import { PlayInstallReferrer } from "react-native-play-install-referrer";
import { Platform } from "react-native";

export const useSignupForm = ({ mobile }) => {
  const [errors, setErrors] = useState({ name: "" });
  const [apiError, setApiError] = useState("");
  const [refCode, setRefCode] = useState("");

  console.log(refCode, "refCode");

  useEffect(() => {
    PlayInstallReferrer.getInstallReferrerInfo((installReferrerInfo, error) => {
      if (!error) {
        console.log(
          "Install referrer = " + installReferrerInfo.installReferrer
        );

        if (!installReferrerInfo?.installReferrer.includes("utm") && Platform.OS === "android") {
          setRefCode(installReferrerInfo.installReferrer);
        } else {
          setRefCode("");
        }

        setRefCode(installReferrerInfo.installReferrer);
        const referrerParams = new URLSearchParams(
          installReferrerInfo.installReferrer
        );
        const referrerId = referrerParams.get("utm_content");
        console.log("Referrer ID = " + referrerId);

        console.log("UTM Source = " + referrerParams.get("utm_source"));
        console.log("UTM Medium = " + referrerParams.get("utm_medium"));
        console.log("UTM Campaign = " + referrerParams.get("utm_campaign"));
        console.log("UTM Content = " + referrerParams.get("utm_content"));
      } else {
        console.log("Failed to get install referrer info!");
        console.log("Response code: " + error.responseCode);
        console.log("Message: " + error.message);
      }
    });
  }, []);

  // Initialize formData
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    referalCode: refCode,
    mobile,
    refDetails: null, // Initialize refDetails as null
  });

  useEffect(() => {
    if (!refCode.includes("utm")) {
      setFormData({
        ...formData,
        referalCode: refCode,
      });
    }
  }, [refCode]);

  const [isLoading, setIsLoading] = useState(false);
  const [onOpenTextBasedLocationModal, setOnOpenTextBasedLocationModal] =
    useState(false);
  const [storeNearLocation, setStoreNearLocation] = useState([]);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const signUpValidation = (formData) => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Full Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = "Name should only contain alphabetic characters";
    } else if (formData.name?.length < 3) {
      newErrors.name = "Name should be at least 3 characters long";
    }

    return Object.keys(newErrors)?.length > 0 ? newErrors : {};
  };

  const onFethcNearLocation = async (text) => {
    const data = await nearPlacesByText(text);
    setStoreNearLocation(data);
  };

  const handleInputChange = (field, value) => {
    if (field === "address" && value?.length > 2) {
      setOnOpenTextBasedLocationModal(true);
      onFethcNearLocation(value);
    }

    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const onAddressSelect = (address) => {
    setOnOpenTextBasedLocationModal(false);
    setFormData((prev) => ({
      ...prev,
      address: `${address?.name} | ${address?.vicinity}`,
    }));
  };

  const handleNavigateToOTP = async () => {
    const errors = signUpValidation(formData);
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      const deviceId = await DeviceInfo.getUniqueId();

      // Include refDetails in the payload
      const payload = {
        ...formData,
        deviceId,
        refDetails: formData.refDetails, // Ensure refDetails is included
      };

      const response = await API.post("/auth/new-register", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      await AsyncStorage.setItem("token", JSON.stringify(response.data.token));
      await AsyncStorage.setItem(
        "ownUser",
        JSON.stringify(response.data.ownUser)
      );

      setIsLoading(false);

      dispatch(setToken(response.data.token));
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "AuthenticatedStack" }],
        })
      );
      return response;
    } catch (error) {
      console.log(error?.response?.data?.message);
      setIsLoading(false);
      setApiError(error?.response?.data?.message);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    onOpenTextBasedLocationModal,
    storeNearLocation,
    handleInputChange,
    onAddressSelect,
    handleNavigateToOTP,
  };
};
