import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AadharFaceNavigator from "../../../Utils/AadharFaceNagivetor/AadharFaceNagivetor";

import AadharFrontBackImageCard from "../../../Utils/AadharFrontBackImageCard/AadharFrontBackImageCard";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import AddharOtpUi from "./OtpUi/OtpUi";
import { useAadharVerificationComHook } from "./AadharVerificationCom.hook";

const AadharVerificationCom = () => {
  const {
    handleInputChange,
    aadharNumber,
    onAadharCardGetOtpFunction,
    error,
    displayOtpBox,
    onVerifyAddharOtp,
    aadharUploadImageDisplay,
    otpVerificationFailed,
    // otp related
    inputs,
    handleKeyPress,
    handleChange,
    otp,
    otpInputEditable,
    changeGetOtpToVerified,
  } = useAadharVerificationComHook();

  return (
    <View style={styles.container}>
      <Text>AadharVerificationCom</Text>
      <AadharFaceNavigator
        isInput={true}
        isText={true}
        textWidth="30%"
        inputWidth="70%"
        onPress={onAadharCardGetOtpFunction}
        onTextChange={handleInputChange}
        value={aadharNumber}
        isEditable={otpInputEditable}
        pressBtnOrText={changeGetOtpToVerified}
        displayOtpBox={displayOtpBox}
      />
      {error && (
        <View style={styles.errorCard}>
          <Text style={styles.errorMsg}>{error}</Text>
        </View>
      )}
      {displayOtpBox && (
        <>
          <Text style={styles.checkingOtp}>
            check <Text style={styles.checkingOtpHighlight}>OTP</Text> from your
            aadhar linked number
          </Text>

          <AddharOtpUi
            handleChange={handleChange}
            handleKeyPress={handleKeyPress}
            inputs={inputs}
            otp={otp}
          />
          <CustomBtn
            title="Verify OTP"
            btnBg="#fff"
            btnColor="#E02E88"
            onPress={onVerifyAddharOtp}
          />
          {otpVerificationFailed && (
            <View style={styles.errorCard}>
              <Text style={styles.otpVerificationFailed}>{error}</Text>
            </View>
          )}
        </>
      )}

      {aadharUploadImageDisplay && (
        <>
          <Text style={styles.uploadAddarText}>
            Update Your Aadhar Front & Back Photos
          </Text>

          <AadharFrontBackImageCard />
        </>
      )}
    </View>
  );
};

export default AadharVerificationCom;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 20,
  },
  checkingOtp: {
    fontSize: 12,
  },
  checkingOtpHighlight: {
    fontWeight: "bold",
    color: "#E02E88",
  },
  uploadAddarText: {
    fontSize: 14,
  },

  errorCard: {
    width: "100%",
  },
  errorMsg: {
    color: "red",
    fontSize: 14,
  },
});
