import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { API } from "../../../../Constants/url";
import { useNavigation } from "@react-navigation/native";

export const useParcelEnterSenderReciverDetailsHook = ({
  pickUpLocationCoorWithName,
  typeOfLocation,
}) => {
  const { token } = useSelector((state) => state.token);
  const navigation = useNavigation();
  // Single state object to manage all input fields
  const [formData, setFormData] = useState({
    senderName: "",
    senderPhone: "",
    landmark: "",
    address: "",
  });

  const [saveAddressChecked, setSavedAddressChecked] = useState(false);
  const [errors, setErrors] = useState({ senderName: "" });
  const [validationCheck, setValidationCheck] = useState({
    senderName: "",
    senderPhone: "",
    landmark: "",
    address: "",
  });

  // Function to handle input changes
  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //   User Save Addres Click to Send API
  const onHandlerSaveAddress = () => {
    setSavedAddressChecked(!saveAddressChecked);
  };

  const validateInputs = () => {
    let valid = true;
    let validationErrors = {};

    // Validation for each field
    if (!formData.senderName.trim()) {
      validationErrors.senderName = "Sender name is required.";
      valid = false;
    }

    if (!formData.senderPhone.trim()) {
      validationErrors.senderPhone = "Mobile number is required.";
      valid = false;
    } else if (!/^\d{10}$/.test(formData.senderPhone)) {
      validationErrors.senderPhone = "Mobile number must be 10 digits.";
      valid = false;
    }

    if (!formData.landmark.trim()) {
      validationErrors.landmark = "Landmark is required.";
      valid = false;
    }

    if (!formData.address.trim()) {
      validationErrors.address = "Address is required.";
      valid = false;
    }

    setErrors(validationErrors);
    return valid;
  };

  useEffect(() => {
    if (formData.senderName.trim()) {
      setErrors((prevState) => ({
        ...prevState,
        senderName: "",
      }));
      setValidationCheck((prev) => ({
        ...prev,
        senderName: true,
      }));
    }
    if (!formData.senderName && validationCheck.senderName) {
      setErrors((prev) => ({
        ...prev,
        senderName: "Name is required",
      }));
    }
    // mobile number

    if (formData.senderPhone.trim() && /^\d{10}$/.test(formData.senderPhone)) {
      setErrors((prevState) => ({
        ...prevState,
        senderPhone: "",
      }));
      setValidationCheck((prev) => ({
        ...prev,
        senderPhone: true,
      }));
    }

    if (!formData.senderPhone && validationCheck.senderPhone) {
      setErrors((prev) => ({
        ...prev,
        senderPhone: "Mobile number is required.",
      }));
    } else if (
      !/^\d{10}$/.test(formData.senderPhone) &&
      validationCheck.senderPhone
    ) {
      setErrors((prev) => ({
        ...prev,
        senderPhone: "Invalid mobile number. Please enter 10 digits.",
      }));
    }

    if (formData.landmark.trim()) {
      setErrors((prevState) => ({
        ...prevState,
        landmark: "",
      }));
      setValidationCheck((prev) => ({
        ...prev,
        landmark: true,
      }));
    }

    if (!formData.landmark && validationCheck.landmark) {
      setErrors((prev) => ({
        ...prev,
        landmark: "Landmark is required.",
      }));
    }

    if (formData.address.trim()) {
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
        address: "Address is required.",
      }));
    }

    // land marks
  }, [formData]);

  // Handler to continue to the next step with validation
  const onHandlerContinueNext = () => {
    if (validateInputs()) {
      if (saveAddressChecked) {
        // saved address api
        try {
          API.post(
            "/saved-address",
            {
              name: formData.senderName,
              mobile: formData.senderPhone,
              landMark: formData.landmark,
              address: formData.address,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          Toast.show({
            text1: "successfully added address",
            type: "success",
            position: "bottom",
          });
        } catch (error) {
          Toast.show({
            text1:
              error?.response?.data?.message ?? "Failed to add saved address",
            type: "error",
            position: "bottom",
          });
        }
      }

      // navigate to Parcel Home screen
      if (typeOfLocation === "Pick Up") {
        navigation.navigate("ParcelHome", {
          pickUpLocationCoorWithName: {
            ...pickUpLocationCoorWithName,
            personName: formData.senderName,
            mobile: formData.senderPhone,
            landMark: formData.landmark,
            address: formData.address,
          },
        });
      } else {
        navigation.navigate("ParcelHome", {
          dropLocationCoorWithName: {
            ...pickUpLocationCoorWithName,
            personName: formData.senderName,
            mobile: formData.senderPhone,
            landMark: formData.landmark,
            address: formData.address,
          },
        });
      }
    } else {
      console.log("Validation failed.");
    }
  };

  return {
    handleInputChange,
    formData,
    saveAddressChecked,
    onHandlerSaveAddress,
    onHandlerContinueNext,
    errors, // Expose the errors to display on the UI
  };
};
