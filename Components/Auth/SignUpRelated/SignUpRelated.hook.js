import { useEffect, useState } from "react";
import { API } from "../../../Constants/url";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMimeType } from "../../../Constants/imageAccepts";
import { signUpValidation } from "../../../Validations/SignUoValidation";

export const useSignUpRelatedHook = ({
  selectedImage,
  mobile,
  onImageError,
  imageBorder,
}) => {
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
    emergencyContact: "",
    role: "user",
  });

  const [validationCheck, setValidationCheck] = useState({
    name: false,
    dob: false,
    email: false,
    address: false,
  });

  // Handle input change and reset validation errors for that field
  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleNavigateToOTP = async () => {
    if (!selectedImage) {
      console.log(onImageError);
      onImageError();
      setApiError("Provide Profile Images");
    } else {
      setApiError("");
    }
    const errors = signUpValidation(onImageError, selectedImage, formData);
    console.log(errors);
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

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
        name: "Name is required",
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
    }

    if (formData.dob) {
      // const today = new Date();
      // const birthDate = new Date(formData.dob);
      // const age = today.getFullYear() - birthDate.getFullYear();
      // const m = today.getMonth() - birthDate.getMonth();
      // if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      //   age--;
      // }
      // if(age < 18){
      //   setErrors((prevState) => ({
      //    ...prevState,
      //     dob: "Age should be 18 or above",
      //   }));
      // }
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
    console.log(validationCheck.email);
    console.log(!/^\S+@\S+\.\S+$/.test(formData.email));
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
        address: "Address is required",
      }));
    }
  }, [formData]);

  return {
    formData,
    handleInputChange,
    handleNavigateToOTP,
    apiError,
    errors,
  };
};
