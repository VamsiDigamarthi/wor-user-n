import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onSavedParcelAddress } from "../services/parSavedAddressServices";
import { mergeDropDetails } from "../../ridebooking/sharedLogics/rideDetailsSlice";

export const useParcelSavedAddressHook = () => {
  const { token } = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    senderName: "",
    mobile: "",
    landmark: "",
    address: "",
  });
  const [saveAddressChecked, setSavedAddressChecked] = useState(false);
  const [errors, setErrors] = useState({ senderName: "" });
  const [validationCheck, setValidationCheck] = useState({
    senderName: "",
    mobile: "",
    landmark: "",
    address: "",
  });

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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

    if (!formData.mobile.trim()) {
      validationErrors.mobile = "Mobile number is required.";
      valid = false;
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      validationErrors.mobile = "Mobile number must be 10 digits.";
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

    if (formData.mobile.trim() && /^\d{10}$/.test(formData.mobile)) {
      setErrors((prevState) => ({
        ...prevState,
        mobile: "",
      }));
      setValidationCheck((prev) => ({
        ...prev,
        mobile: true,
      }));
    }

    if (!formData.mobile && validationCheck.mobile) {
      setErrors((prev) => ({
        ...prev,
        mobile: "Mobile number is required.",
      }));
    } else if (!/^\d{10}$/.test(formData.mobile) && validationCheck.mobile) {
      setErrors((prev) => ({
        ...prev,
        mobile: "Invalid mobile number. Please enter 10 digits.",
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

  const onHandlerContinueNext = () => {
    if (validateInputs()) {
      if (saveAddressChecked) {
        onSavedParcelAddress({ token, formData });
      }
      dispatch(mergeDropDetails(formData));
      navigation.navigate("ParcelHome");
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
