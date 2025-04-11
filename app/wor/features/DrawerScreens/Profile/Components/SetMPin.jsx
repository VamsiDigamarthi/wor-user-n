import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import OtpUi from "../../../../utiles/OtpUi";
import CustomBtn from "../../../../utiles/CustomBtn";
import { useSetMPinHook } from "../Hooks/setMPin.hook";
import { fonts } from "../../../../fonts/Fonts";
import MpinSuccessModal from "../Modal/MPinModal/MpinSuccessModal";

const SetMPin = ({ handleChangeSetMpin }) => {
  const {
    handleSubmiteMPin,
    setPin,
    setNewPin,
    pin,
    newPin,
    error,
    reEnterError,
    successModal,
    setSuccessModal,
  } = useSetMPinHook({ handleChangeSetMpin });

  return (
    // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <View style={styles.newContainer}>
        <View style={{ gap: 15 }}>
          <Text style={styles.heading}>Set new Pin</Text>
          <Text style={styles.text}>
            You'r PIN Can't have repeating (e.g.0000), or consective(e.g.1234)
            numbers
          </Text>
          <View>
            {error && (
              <Text style={{ fontSize: 10, textAlign: "center", color: "red" }}>
                {error}
              </Text>
            )}
            <OtpUi otp={pin} setOtp={setPin} style={styles.borderWidth} />
          </View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              fontFamily: fonts.robotoSemiBold,
            }}
          >
            Confirm M-Pin
          </Text>
          <View>
            {reEnterError && (
              <Text style={{ fontSize: 10, textAlign: "center", color: "red" }}>
                {reEnterError}
              </Text>
            )}
          </View>
          <OtpUi otp={newPin} setOtp={setNewPin} style={styles.borderWidth} />
        </View>
        <CustomBtn
          onPress={handleSubmiteMPin}
          title="Continue"
          btnBg={
            pin.join("")?.length === 4 && newPin.join("")?.length === 4
              ? "#EA4C89"
              : "#f7f7f7"
          }
          btnColor={
            pin.join("")?.length === 4 && newPin.join("")?.length === 4
              ? "#fff"
              : "#EA4C89"
          }
        />
        <MpinSuccessModal
          successModal={successModal}
          closeModal={() => setSuccessModal(!successModal)}
        />
      </View>
    </KeyboardAvoidingView>
    // </TouchableWithoutFeedback>
  );
};

export default SetMPin;

const styles = StyleSheet.create({
  newContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
    // paddingHorizontal: 15,
    // paddingVertical: 10,
    paddingBottom: 30,
  },
  borderWidth: {
    borderWidth: 0,
  },
  heading: { fontSize: 18, fontFamily: fonts.robotoSemiBold },
  text: {
    fontSize: 13,
    color: "gray",
    lineHeight: 21,
    fontFamily: fonts.robotoRegular,
  },
});
