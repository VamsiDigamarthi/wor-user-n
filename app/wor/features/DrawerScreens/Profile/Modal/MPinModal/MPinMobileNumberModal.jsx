import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ModalUI from "../../../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../../../Components/InfoUi/Styles/InfoModalStyles";
import MPinMobileNumber from "./MPinMobileNumber";
import AadharOtp from "../AadharModal/AadharOtp";
import { onVerifiOtp } from "../../services/mPin.servi";
import { fonts } from "../../../../../fonts/Fonts";
import { useAadharModalHook } from "../AadharModal/AadharModal.hook";

const MPinMobileNumberModal = ({
  openModal,
  closeModal,
  handleChangeSetMpin,
}) => {
  const [mobile, setMobile] = useState("");
  const [isMobileOrOtp, setIsMobileOrOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  const { resendAvailable, handleResendOtp , timer} = useAadharModalHook();

  const handleSubmitOtp = async () => {
    setIsLoading(true);
    // console.log("iugf");
    const data = await onVerifiOtp({ otp: otp?.join(""), mobile });
    console.log(data);

    setIsLoading(false);
    if (!data) return;
    handleChangeSetMpin();
  };

  return (
    <ModalUI
      openCloseState={openModal}
      closeModalFun={closeModal}
      modalStyle="slide"
      style={infoModalStyles.aadharModalStyles}
      insideCardStyle={infoModalStyles.insideCardStyle}
      closebtn={false}
    >
      {isMobileOrOtp ? (
        <AadharOtp
        resendAvailable={resendAvailable}
        handleResendOtp={handleResendOtp}
          otp={otp}
          setOtp={setOtp}
          handleSubmitOtp={handleSubmitOtp}
          isLoading={isLoading}
          timer={timer}
        />
      ) : (
        <MPinMobileNumber
          setMobile={setMobile}
          mobile={mobile}
          setIsMobileOrOtp={setIsMobileOrOtp}
        />
      )}
    </ModalUI>
  );
};

export default MPinMobileNumberModal;

const styles = StyleSheet.create({});
