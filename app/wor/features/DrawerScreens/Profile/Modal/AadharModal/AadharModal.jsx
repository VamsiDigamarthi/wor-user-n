import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ModalUI from "../../../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../../../Components/InfoUi/Styles/InfoModalStyles";
import AadharOtp from "./AadharOtp";
import AadharCardNumber from "./AadharCardNumber";
import { useAadharModalHook } from "./AadharModal.hook";
import AadharSuccessMessage from "./AadharSuccessMessage";

const AadharModal = ({ openModal, closeModal }) => {
  const {
    otpPress,
    setOtpPress,
    setClientId,
    otpVerified,
    otp,
    setOtp,
    handleSubmitOtp,
    genderFailed,
    otpError,
    isLoading,
    setAadharNumber,
    aadharNumber,
  } = useAadharModalHook();

  // const otpVerified = true;

  return (
    <ModalUI
      openCloseState={openModal}
      closeModalFun={closeModal}
      modalStyle="slide"
      style={infoModalStyles.aadharModalStyles}
      insideCardStyle={infoModalStyles.insideCardStyle}
      closebtn={false}
    >
      {otpVerified ? (
        <AadharSuccessMessage genderFailed={genderFailed} />
      ) : (
        <>
          {!otpPress ? (
            <AadharCardNumber
              setOtpPress={setOtpPress}
              setClientId={setClientId}
              setAadharNumber={setAadharNumber}
              aadharNumber={aadharNumber}
            />
          ) : (
            <AadharOtp
              otpError={otpError}
              otp={otp}
              setOtp={setOtp}
              handleSubmitOtp={handleSubmitOtp}
              isLoading={isLoading}
              text={`Linked to your Aadhar ${aadharNumber}`}
            />
          )}
        </>
      )}
    </ModalUI>
  );
};

export default AadharModal;

const styles = StyleSheet.create({});
