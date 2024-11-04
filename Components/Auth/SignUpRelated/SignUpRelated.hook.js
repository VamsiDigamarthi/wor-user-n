import { useState } from "react";

export const useSignUpRelatedHook = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    address: "",
    emergencyContact: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleNavigateToOTP = () => {
    // Prepare form data to send to API
    const dataToSend = {
      mobile,
      ...formData, // Spread the form data
      image: onImageSelect, // Include the image URI in the request
    };
  };

  console.log(formData);

  return {
    formData,
    handleInputChange,
    handleNavigateToOTP,
  };
};
