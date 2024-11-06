import { useState } from "react";
import { API } from "../../../Constants/url";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMimeType } from "../../../Constants/imageAccepts";

export const useSignUpRelatedHook = ({
  selectedImage,
  mobile,
  onImageError,
}) => {
  const navigate = useNavigation();
  const [apiError, setApiError] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    address: "",
    emergencyContact: "",
    role: "user",
  });

  // Handle input change and reset validation errors for that field
  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: null, // Clear the error for this field
      }));
    }
  };

  // Basic validation function
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
      valid = false;
    }
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Valid email is required";
      valid = false;
    }
    if (!formData.address) {
      newErrors.address = "Address is required";
      valid = false;
    }
    if (!selectedImage) {
      onImageError();
    }

    setErrors(newErrors);
    return valid;
  };

  // Submit form and navigate to OTP screen
  const handleNavigateToOTP = async () => {
    if (!validateForm()) return; // If form is invalid, stop submission

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("dateOfBirth", formData.dob);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("mobile", mobile);
    formDataToSend.append("role", "user");
    formDataToSend.append("longitude", "76.978987");
    formDataToSend.append("latitude", "17.8765678");

    if (selectedImage) {
      const mimeType = getMimeType(selectedImage);
      formDataToSend.append("profilePic", {
        uri: selectedImage,
        type: mimeType,
        name: `profilePic.${mimeType.split("/")[1]}`,
      });
    }

    try {
      const response = await API.post("/auth/new-register", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await AsyncStorage.setItem("token", JSON.stringify(response.data.token));
      navigate.navigate("documentCheck");
    } catch (error) {
      console.log(error?.response?.data?.message);
      setApiError(error?.response?.data?.message);
    }
  };

  return {
    formData,
    handleInputChange,
    handleNavigateToOTP,
    apiError,
    errors,
  };
};
