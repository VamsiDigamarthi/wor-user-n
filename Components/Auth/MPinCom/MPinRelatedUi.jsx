import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState, useRef } from "react";
import BottomLayout from "../../../Layouts/BottomLayout";
import { COLORS } from "../../../Constants/colors";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { API } from "../../../Constants/url";
import { useNavigation } from "@react-navigation/native";
import ModalUI from "../../../Utils/Modal/Modal";
import { infoModalStyles } from "../../InfoUi/Styles/InfoModalStyles";
import OtpInfoUi from "../../InfoUi/OtpInfoUi";
import { setMPinData } from "../../InfoUi/data/infoData";
import { setToken } from "../../../redux/Features/Auth/LoginSlice";
import { useDispatch } from "react-redux";

const MPinRelatedUi = ({ isPriceScreen }) => {
  const [mPin, setMPin] = useState(["", "", "", ""]);
  const [reEnterMPin, setReEnterMPin] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [reEnterError, setReEnterError] = useState("");
  const navigation = useNavigation();

  const dispatch = useDispatch();
  // Create refs for each set of TextInputs
  const inputRefs = useRef([]);
  const reEnterInputRefs = useRef([]);

  // Handle M-PIN input changes
  const handleChange = (value, index, setPin, pinState, refs) => {
    const newPin = [...pinState];

    if (value) {
      newPin[index] = value;
      setPin(newPin);
      if (index < refs.current.length - 1) {
        refs.current[index + 1].focus(); // Move to next input
      }
    } else {
      newPin[index] = "";
      setPin(newPin);
      if (index > 0) {
        refs.current[index - 1].focus(); // Move to previous input
      }
    }
  };

  // Check if the PIN is valid: unique digits, no consecutive ascending/descending order
  const isValidMPin = (pinArray) => {
    // <<<<<<< changes-from-last-4-days
    //     // Check if all fields are filled
    //     if (pinArray.includes("")) return false;

    //     // Check if all digits are unique
    //     const uniqueDigits = new Set(pinArray);
    //     if (uniqueDigits.size !== pinArray.length) return false;

    //     // Check for no three identical numbers
    //     for (let i = 0; i < pinArray.length - 2; i++) {
    //       if (
    //         pinArray[i] === pinArray[i + 1] &&
    //         pinArray[i + 1] === pinArray[i + 2]
    //       ) {
    //         return false;
    //       }
    //     }

    //     // Check for no sequential numbers (ascending or descending)
    //     const pinNumbers = pinArray.map(Number);
    //     const isAscending = pinNumbers.every(
    //       (val, idx, arr) => idx === 0 || val === arr[idx - 1] + 1
    //     );
    //     const isDescending = pinNumbers.every(
    //       (val, idx, arr) => idx === 0 || val === arr[idx - 1] - 1
    //     );

    //     if (isAscending || isDescending) return false;

    //     return true;
    // =======
    const uniqueDigits = new Set(pinArray);
    const isUnique =
      uniqueDigits.size === pinArray.length && !pinArray.includes("");
    const isConsecutiveAsc = pinArray.every((digit, idx) => {
      if (idx === 0) return true;
      return parseInt(pinArray[idx]) === parseInt(pinArray[idx - 1]) + 1;
    });
    const isConsecutiveDesc = pinArray.every((digit, idx) => {
      if (idx === 0) return true;
      return parseInt(pinArray[idx]) === parseInt(pinArray[idx - 1]) - 1;
    });

    // PIN is invalid if digits are not unique, or if they are in ascending/descending order
    return isUnique && !isConsecutiveAsc && !isConsecutiveDesc;
    // >>>>>>> master
  };

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem("token");
    let valid = true;

    // Reset errors before checking
    setError("");
    setReEnterError("");

    // Validate M-PIN
    if (mPin.includes("")) {
      setError("Please enter a complete M-PIN.");
      valid = false;
    } else if (!isValidMPin(mPin)) {
      setError("M-PIN must contain unique digits and no consecutive numbers.");
      valid = false;
    }

    if (reEnterMPin.includes("")) {
      setReEnterError("Please re-enter the M-PIN.");
      valid = false;
    } else if (!isValidMPin(reEnterMPin)) {
      setReEnterError(
        "Re-entered M-PIN must contain unique digits and no consecutive numbers."
      );
      valid = false;
    } else if (mPin.join("") !== reEnterMPin.join("")) {
      setReEnterError("M-PINs do not match.");
      valid = false;
    }

    if (valid) {
      try {
        await API.patch(
          "/user/m-pin",
          {
            mpin: mPin.join(""),
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        );
        Toast.show({
          text1: "M-Pin added Successfully",
          type: "success",
          position: "bottom",
        });
        if (isPriceScreen) {
          navigation.goBack();
        } else {
          dispatch(setToken(JSON.parse(token)));
          navigation.navigate("AuthenticatedStack");
        }
      } catch (error) {
        Toast.show({
          text1: "SET M-PIN failed",
          type: "error",
          position: "bottom",
        });
      }
    }
  };

  const renderInputBoxes = (pinState, setPin, refs) => {
    return (
      <View style={styles.inputContainer}>
        {pinState.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.inputBox}
            maxLength={1}
            keyboardType="numeric"
            value={digit}
            onChangeText={(value) =>
              handleChange(value, index, setPin, pinState, refs)
            }
            ref={(el) => (refs.current[index] = el)} // Assign refs to inputs
          />
        ))}
      </View>
    );
  };

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const onHandleOpenInfoModal = () => {
    setIsInfoModalOpen(!isInfoModalOpen);
  };

  return (
    <BottomLayout
      title="Set Your New MPIN"
      subTitle="By entering your MPIN, you agree it will be used for verification and updates."
      onHandleOpenInfoModal={onHandleOpenInfoModal}
    >
      <View style={styles.container}>
        <Text style={styles.mpin}>Enter M-PIN</Text>
        <Text style={styles.mpinsub}>
          Set Your 4 Digit M-PIN to securely Access Your Account
        </Text>
        {error && <Text style={styles.error}>{error}</Text>}
        {renderInputBoxes(mPin, setMPin, inputRefs)}

        <Text style={styles.mpin}>Re-Enter M-PIN</Text>
        {reEnterError && <Text style={styles.error}>{reEnterError}</Text>}
        {renderInputBoxes(reEnterMPin, setReEnterMPin, reEnterInputRefs)}

        <CustomBtn
          title="Continue"
          btnBg={
            mPin.join("").length === 4 && reEnterMPin.join("").length === 4
              ? "#EA4C89"
              : "#fff"
          }
          btnColor={
            mPin.join("").length === 4 && reEnterMPin.join("").length === 4
              ? "#fff"
              : "#EA4C89"
          }
          onPress={handleSubmit}
        />
      </View>
      <ModalUI
        openCloseState={isInfoModalOpen}
        closeModalFun={onHandleOpenInfoModal}
        modalStyle="slide"
        style={infoModalStyles.aadharModalStyles}
        insideCardStyle={infoModalStyles.insideCardStyle}
        btnText="Okay, Got It"
        btnStyles={infoModalStyles.modalCloseBtn}
        btnTextStyle={infoModalStyles.btnTextStyle}
      >
        <OtpInfoUi mainTitle="Set M-PIN" data={setMPinData} />
      </ModalUI>
    </BottomLayout>
  );
};

export default MPinRelatedUi;

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  mpin: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.heading,
  },
  mpinsub: {
    color: COLORS.subHeading,
    fontSize: 11,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  inputBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderColor: COLORS.border,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "#fff",
    elevation: 1,
  },
  error: {
    fontSize: 10,
    color: "red",
  },
});
