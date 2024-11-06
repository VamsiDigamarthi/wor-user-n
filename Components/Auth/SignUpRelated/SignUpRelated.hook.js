import { useState } from "react";
import { API } from "../../../Constants/url";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMimeType } from "../../../Constants/imageAccepts";

export const useSignUpRelatedHook = ({ selectedImage, mobile }) => {
  const navigate = useNavigation();
  const [apiError, setApiError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    address: "",
    emergencyContact: "",
    role: "user",
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleNavigateToOTP = async () => {
    console.log(selectedImage);
    console.log(formData);
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
      console.log("formdate", formDataToSend);
      const response = await API.post("/auth/new-register", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Data sent successfully:", response.data);

      await AsyncStorage.setItem("token", JSON.stringify(response.data.token));
      navigate.navigate("documentCheck");
    } catch (error) {
      console.error("Error sending data:", error);
      setApiError(error?.response?.data?.message);
    }
  };

  return {
    formData,
    handleInputChange,
    handleNavigateToOTP,
    apiError,
  };
};
