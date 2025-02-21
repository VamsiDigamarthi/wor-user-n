import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import ModalUI from "../../../utiles/Modal/Modal";
import { useCheckMPinModalHook } from "./CheckMPinModal.hook";
import { COLORS } from "../../../../../Constants/colors";
import Entypo from "@expo/vector-icons/Entypo";
import CustomBtn from "../../../utiles/CustomBtn";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "../../../fonts/Fonts";

const CheckMPinModal = ({
  isOpenEnterConfirmMPinModal,
  onOpenIsEnterConfirmPinModal,
  pickUpPlace,
  newMarker,
}) => {
  const { mPin, inputRefs, handleChange } = useCheckMPinModalHook({
    pickUpPlace,
    newMarker,
    onOpenIsEnterConfirmPinModal,
  });

  const [hide, setHide] = useState(true); // Default to hiding M-PIN
  const navigation = useNavigation();

  const handleBackspace = (index) => {
    if (index > 0) {
      handleChange("", index); // Clear the current input
      inputRefs.current[index - 1]?.focus(); // Focus on the previous input
    } else {
      handleChange("", index); // Clear the first input if no previous input exists
    }
  };

  return (
    <ModalUI
      openCloseState={isOpenEnterConfirmMPinModal}
      closeModalFun={onOpenIsEnterConfirmPinModal}
      closebtn={false}
    >
      <View style={styles.mainContainer}>
        <Text style={styles.heading}>Enter WoR-PIN</Text>
        <Text style={styles.text}>
          WoR-PIN is a secure 4 digit code for safe account access and ride
          protection
        </Text>
        <View style={styles.inputContainer}>
          {mPin.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.inputBox}
              maxLength={1}
              secureTextEntry={hide} // Controlled by the `hide` state
              keyboardType="numeric"
              value={digit}
              onChangeText={(value) => handleChange(value, index)}
              ref={(el) => (inputRefs.current[index] = el)} // Assign refs to inputs
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  handleBackspace(index); // Handle backspace logic
                }
              }}
            />
          ))}

          {/* Eye Icon with Press-and-Hold Functionality */}
          <TouchableOpacity
            onPressIn={() => setHide(false)} // Show M-PIN when pressed
            onPressOut={() => setHide(true)} // Hide M-PIN when released
            style={{ alignItems: "center" }}
          >
            <Entypo
              name={hide ? "eye-with-line" : "eye"}
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <Text style={styles.text}>Having Trouble</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SetNewMpinj")}>
            <Text style={[styles.text, { color: "blue" }]}>Forgot Mpin ?</Text>
          </TouchableOpacity>
        </View>

        <CustomBtn
          title="Close"
          borderColor={"#EA4C89"}
          onPress={onOpenIsEnterConfirmPinModal}
          borderWidth={1}
        />
      </View>
    </ModalUI>
  );
};

export default CheckMPinModal;

const styles = StyleSheet.create({
  mainContainer: {
    gap: 10,
    width: "100%",
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
    width: "100%",
    alignItems: "flex-end",
    // backgroundColor: "red",
  },

  inputBox: {
    marginTop: 10,
    borderBottomWidth: 1,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "#fff",
    // elevation: 1,
    width: 20,
  },

  heading: { fontFamily: fonts.robotoSemiBold, fontSize: 16 },
  text: { fontFamily: fonts.robotoRegular },
});
