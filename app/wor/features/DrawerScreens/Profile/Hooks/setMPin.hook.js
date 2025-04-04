import { useDispatch, useSelector } from "react-redux";
import { setNewmPin } from "../services/mPin.servi";
import { useState } from "react";
import { onProfileSection } from "../../../ridebooking/home/redux/profileSlice";

export const useSetMPinHook = ({ handleChangeSetMpin }) => {
  const { token } = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [reEnterError, setReEnterError] = useState("");

  const [pin, setPin] = useState(["", "", "", ""]);
  const [newPin, setNewPin] = useState(["", "", "", ""]);

  // const [mpinSuccessmodal, setMpinSuccessModal] = useState(true);
  const [successModal, setSuccessModal] = useState(false);

  const isValidMPin = (pinArray) => {
    // Check if all fields are filled and no digits are repeated
    const uniqueDigits = new Set(pinArray);
    return uniqueDigits.size === pinArray.length && !pinArray.includes("");
  };

  const validatePins = () => {
    let valid = true;

    // Reset errors before validating
    setError("");
    setReEnterError("");

    // Validate the first M-PIN (pin)
    if (pin.includes("")) {
      setError("Please enter a complete M-PIN.");
      valid = false;
    } else if (!isValidMPin(pin)) {
      setError("M-PIN must contain unique digits.");
      valid = false;
    } else if (hasConsecutiveNumbers(pin)) {
      setError("M-PIN must not contain consecutive numbers.");
      valid = false;
    }

    // Validate the re-entered M-PIN (newPin)
    if (newPin.includes("")) {
      setReEnterError("Please re-enter the M-PIN.");
      valid = false;
    } else if (!isValidMPin(newPin)) {
      setReEnterError("Re-entered M-PIN must contain unique digits.");
      valid = false;
    } else if (pin.join("") !== newPin.join("")) {
      setReEnterError("M-PINs do not match.");
      valid = false;
    } else if (hasConsecutiveNumbers(newPin)) {
      setReEnterError("Re-entered M-PIN must not contain consecutive numbers.");
      valid = false;
    }

    return valid; // Return validation result
  };

  // Function to check if the pin contains consecutive numbers
  const hasConsecutiveNumbers = (pinArray) => {
    const numbers = pinArray.map(Number); // Convert strings to numbers
    for (let i = 0; i < numbers.length - 1; i++) {
      if (numbers[i] + 1 !== numbers[i + 1]) {
        return false; // Not consecutive
      }
    }
    return true; // Consecutive numbers found
  };

  const handleSubmiteMPin = async () => {
    if (validatePins()) {
      const data = await setNewmPin({ token, mpin: pin.join("") });
      if (!data) return;
      // console.log("data", data);

      handleChangeSetMpin();
      setPin[("", "", "", "")];
      setNewPin(["", "", "", ""]);

      setSuccessModal(true);

      dispatch(onProfileSection({ token }));
      console.log(
        "----------------------------------------------------------------------------------------"
      );
    } else {
      console.log("Validation failed.");
    }
  };

  return {
    handleSubmiteMPin,
    setPin,
    setNewPin,
    pin,
    newPin,
    error,
    reEnterError,

    successModal,
    setSuccessModal,
  };
};
