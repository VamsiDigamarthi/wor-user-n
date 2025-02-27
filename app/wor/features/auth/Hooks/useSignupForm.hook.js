import { useState, useEffect } from "react";
import { API } from "../../../../../Constants/url";
import DeviceInfo from "react-native-device-info";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setToken } from "../../../../../redux/Features/Auth/LoginSlice";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { nearPlacesByText } from "../../../../../Constants/displaylocationmap";

export const useSignupForm = ({ mobile }) => {
  const [errors, setErrors] = useState({ name: "" });
  const [apiError, setApiError] = useState("");
  const [refDetails, setRefDetails] = useState(null);

  // Fetch refDetails from AsyncStorage
  useEffect(() => {
    async function fetchRefData() {
      try {
        const storedData = await AsyncStorage.getItem("refdetails");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setRefDetails(parsedData); // Update refDetails state
        } else {
          console.log("No ref details found in AsyncStorage");
        }
      } catch (error) {
        console.log("Error fetching ref details:", error);
      }
    }

    fetchRefData();
  }, []);

  // Initialize formData
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    referalCode: "",
    mobile,
    refDetails: null, // Initialize refDetails as null
  });

  // Update formData when refDetails changes
  useEffect(() => {
    if (refDetails) {
      setFormData((prevData) => ({
        ...prevData,
        refDetails, // Update refDetails in formData
      }));
    }
  }, [refDetails]); // Dependency on refDetails

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