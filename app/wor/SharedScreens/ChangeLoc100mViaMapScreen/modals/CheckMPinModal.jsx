import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform
} from "react-native";
import React, { useState } from "react";
import ModalUI from "../../../utiles/Modal/Modal";
import { useCheckMPinModalHook } from "./CheckMPinModal.hook";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "../../../fonts/Fonts";

const CheckMPinModal = ({
  isOpenEnterConfirmMPinModal,
  onOpenIsEnterConfirmPinModal,
}) => {
  const { mPin, inputRefs, handleChange } = useCheckMPinModalHook({
    onOpenIsEnterConfirmPinModal,
  });

  const [hide, setHide] = useState(true);
  const navigation = useNavigation();

  const handleBackspace = (index) => {
    if (index > 0) {
      handleChange("", index);
      inputRefs.current[index - 1]?.focus(); // Move focus to previous input
    } else {
      handleChange("", index);
    }
  };

  return (
    <ModalUI
      openCloseState={isOpenEnterConfirmMPinModal}
      closeModalFun={onOpenIsEnterConfirmPinModal}
      closebtn={false}
      padding={0}
    >
      <View style={styles.mainContainer}>
        <Text style={styles.heading}>Enter WoR Verification PIN</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputCard}>
            {mPin.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.inputBox}
                maxLength={1}
                keyboardType="numeric"
                value={hide ? (digit ? "*" : "") : digit}
                onChangeText={(value) => handleChange(value, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace") {
                    handleBackspace(index);
                  }
                }}

                onFocus={() => {
                  if (index > 0 && !mPin[index - 1]) {
                    inputRefs.current[index - 1]?.focus();
                  }
                }}

                placeholderTextColor="#000"
              />
            ))}
          </View>
          <TouchableOpacity
            onPressIn={() => setHide(false)}
            onPressOut={() => setHide(true)}
            style={{ alignItems: "center" }}
          >
            <Entypo
              name={hide ? "eye-with-line" : "eye"}
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.forgotText}>
          <Text numberOfLines={2} style={styles.infoText}>
            You will be asked for it periodically to help you remember it.{" "}
            <Text
              onPress={() => navigation.navigate("SetNewMpin")}
              style={styles.forgotPinText}
            >
              Forgot PIN?
            </Text>
          </Text>
        </View>
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

  heading: {
    backgroundColor: "#e02e88",
    padding: 20,
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  inputCard: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 15,
    paddingVertical: 5,
    width : Platform.OS === "ios" && 120
  },

  forgotText: {
    paddingHorizontal: 10,
    flexDirection: "row",
    width: "100%",
    paddingBottom: 20,
  },

  infoText: {
    fontSize: 14,
    color: "gray",
    flex: 1,
    textAlign: "center",
    lineHeight: 22,
  },

  forgotPinText: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "bold",
  },

  inputBox: {
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "#fff",
    fontFamily: fonts.robotoRegular,
    justifyContent: "center",
    borderRadius: 5,
    borderColor: "#ccc",

    width : Platform.OS === "ios" && 20

  },
});
