import { useEffect, useState } from "react";
import { API } from "../../../Constants/url";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMimeType } from "../../../Constants/imageAccepts";
import { signUpValidation } from "../../../Validations/SignUoValidation";
import { nearPlacesByText } from "../../../Constants/displaylocationmap";

export const useSignUpRelatedHook = ({ mobile }) => {
  const navigate = useNavigation();
  const [apiError, setApiError] = useState("");
  const [errors, setErrors] = useState({
    name: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    address: "",
    role: "user",
    referalCode: "",
    mobile,
    longitude: "76.978987",
    latitude: "17.8765678",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [validationCheck, setValidationCheck] = useState({
    name: false,
    dob: false,
    email: false,
    address: false,
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [onOpenTextBasedLocationModal, setOnOpenTextBasedLocationModal] =
    useState(false);

  const [storeNearLocation, setStoreNearLocation] = useState([]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setFormData((prev) => ({
      ...prev,
      dob: date?.toISOString()?.slice(0, 10),
    }));
    hideDatePicker();
  };

  const onFethcNearLocation = async (text) => {
    const data = await nearPlacesByText(text);
    setStoreNearLocation(data);
  };

  const onAddressSelect = (address) => {
    // console.log(address);
    setOnOpenTextBasedLocationModal(false);
    setFormData((prev) => ({
      ...prev,
      address: `${address?.name} | ${address?.vicinity}`,
    }));
  };

  // Handle input change and reset validation errors for that field
  const handleInputChange = (field, value) => {
    if (field === "address" && value?.length > 2) {
      setOnOpenTextBasedLocationModal(true);
      onFethcNearLocation(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleNavigateToOTP = async () => {
    const errors = signUpValidation(formData);
    console.log(errors);
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await API.post("/auth/new-register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      await AsyncStorage.setItem("token", JSON.stringify(response.data.token));
      setIsLoading(false);
      navigate.navigate("documentCheck");
    } catch (error) {
      console.log(error?.response?.data?.message);
      setIsLoading(false);
      setApiError(error?.response?.data?.message);
      if (error?.response?.data?.message === "User Already Exist ....!") {
        navigate.navigate("documentCheck");
      }
    }
  };

  useEffect(() => {
    if (
      formData.name &&
      /^[A-Za-z\s]+$/.test(formData.name) &&
      formData.name?.length >= 3
    ) {
      setErrors((prevState) => ({
        ...prevState,
        name: "",
      }));
      setValidationCheck((prev) => ({
        ...prev,
        name: true,
      }));
    }

    if (!formData.name && validationCheck.name) {
      setErrors((prev) => ({
        ...prev,
        name: "Full Name is required",
      }));
    } else if (!/^[A-Za-z\s]+$/.test(formData.name) && validationCheck.name) {
      setErrors((prev) => ({
        ...prev,
        name: "Name should only contain alphabetic characters",
      }));
    } else if (formData.name?.length < 3 && validationCheck.name) {
      setErrors((prev) => ({
        ...prev,
        name: "Name should be at least 3 characters long",
      }));
    } else {
      delete errors?.name;
    }

    if (formData.dob) {
      setErrors((prevState) => ({
        ...prevState,
        dob: "",
      }));
      setValidationCheck((prev) => ({
        ...prev,
        dob: true,
      }));
    }

    if (!formData.dob && validationCheck.dob) {
      setErrors((prev) => ({
        ...prev,
        dob: "Date of birth is required",
      }));
    }
    if (/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrors((prevState) => ({
        ...prevState,
        email: "",
      }));
      setValidationCheck((prev) => ({
        ...prev,
        email: true,
      }));
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email) && validationCheck.email) {
      setErrors((prev) => ({
        ...prev,
        email: "Invalid email address",
      }));
    }

    if (formData.address) {
      setErrors((prevState) => ({
        ...prevState,
        address: "",
      }));
      setValidationCheck((prev) => ({
        ...prev,
        address: true,
      }));
    }

    if (!formData.address && validationCheck.address) {
      setErrors((prev) => ({
        ...prev,
        address: "Current Address is required",
      }));
    }
  }, [formData]);

  return {
    formData,
    handleInputChange,
    handleNavigateToOTP,
    apiError,
    errors,
    hideDatePicker,
    handleConfirm,
    isDatePickerVisible,
    showDatePicker,
    onOpenTextBasedLocationModal,
    storeNearLocation,
    onAddressSelect,
    validationCheck,
    isLoading,
  };
};
