import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import BottomLayout from "../../../Layouts/BottomLayout";
import NewAadharNumbercard from "./NewAadharNumbercard";
import NewAadharOtpCard from "./NewAadharOtpCard";
import AadharFrontBackImageCard from "../../../Utils/AadharFrontBackImageCard/AadharFrontBackImageCard";
import { COLORS } from "../../../Constants/colors";
import { useNewAadharVefiricationHook } from "./NewAadharVefirication.hook";
import ModalUI from "../../../Utils/Modal/Modal";
import { infoModalStyles } from "../../InfoUi/Styles/InfoModalStyles";
import OtpInfoUi from "../../InfoUi/OtpInfoUi";
import { aadharVerification } from "../../InfoUi/data/infoData";

const NewAadharVefirication = ({ isPriceScreen }) => {
  const {
    aadharNumber,
    handleInputChange,
    aadharVerified,
    otpVerified,
    onAddharNumberGetOtpHandle,
    aadharError,
    aadharLoader,
    // OTP
    onOtpChangehandle,
    onOtpVefirified,
    otpLoader,
  } = useNewAadharVefiricationHook();
  // console.log(aadharVerified, otpVerified);

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const onHandleOpenInfoModal = () => {
    setIsInfoModalOpen(!isInfoModalOpen);
  };

  return (
    <BottomLayout
      title="Aadhar Verification"
      subTitle="Identity Check with Aadhaar and Face Scan for Safe Ride Bookings"
      onHandleOpenInfoModal={onHandleOpenInfoModal}
    >
      <View style={styles.container}>
        <NewAadharNumbercard
          value={aadharNumber}
          onTextChange={handleInputChange}
          onAddharNumberGetOtpHandle={onAddharNumberGetOtpHandle}
          aadharError={aadharError}
          aadharVerified={aadharVerified}
          isEditable={!aadharVerified}
          aadharLoader={aadharLoader}
          
        />

        <NewAadharOtpCard
          onTextChange={onOtpChangehandle}
          aadharVerified={aadharVerified}
          isEditable={aadharVerified && !otpVerified ? true : false}
          otpLoader={otpLoader}
          onPress={onOtpVefirified}
          placeholder={"Enter Otp"}
        />
        <Text style={styles.uploadFrontBackImageCard}>
          Upload Aadhar Front/Back Images
        </Text>
        <AadharFrontBackImageCard
          otpVerified={otpVerified}
          isPriceScreen={isPriceScreen}
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
        <OtpInfoUi mainTitle="Aadhar Verification " data={aadharVerification} />
      </ModalUI>
    </BottomLayout>
  );
};

export default NewAadharVefirication;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 15,
  },
  uploadFrontBackImageCard: {
    color: COLORS.subHeading,
    fontSize: 11,
  },
});
