import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import AadharFaceNavigator from "../../../Utils/AadharFaceNagivetor/AadharFaceNagivetor";

import AadharFrontBackImageCard from "../../../Utils/AadharFrontBackImageCard/AadharFrontBackImageCard";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import AddharOtpUi from "./OtpUi/OtpUi";
import { useAadharVerificationComHook } from "./AadharVerificationCom.hook";
import BottomLayout from "../../../Layouts/BottomLayout";

const AadharVerificationCom = ({ isPriceScreen }) => {
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
    otpVerified,
    otp,
    otpInputEditable,
    changeGetOtpToVerified,
    isAddharLoading,
    otpLoading,
    handleOTPChange,
  } = useAadharVerificationComHook();

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const onHandleOpenInfoModal = () => {
    setIsInfoModalOpen(!isInfoModalOpen);
  };

  // console.log(displayOtpBox);

  return (
    <BottomLayout
      title="Aadhar Verification"
      subTitle="Identity Check with Aadhaar and Face Scan for Safe Ride Bookings"
      onHandleOpenInfoModal={onHandleOpenInfoModal}
    >
      <View style={styles.container}>
        {/* <Text>Aadhar Verification </Text> */}
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
          loading={isAddharLoading}
        />
        {error && (
          <View style={styles.errorCard}>
            <Text style={styles.errorMsg}>{error}</Text>
          </View>
        )}
        {displayOtpBox && (
          <>
            <Text style={styles.checkingOtp}>
              check <Text style={styles.checkingOtpHighlight}>OTP</Text> from
              your aadhar linked number
            </Text>

            {/* <AddharOtpUi
              handleChange={handleChange}
              handleKeyPress={handleKeyPress}
              inputs={inputs}
              otp={otp}
            />
            <CustomBtn
              title="Verify OTP"
              btnBg="#fff"
              btnColor="#EA4C89"
              onPress={onVerifyAddharOtp}
            /> */}
            <OTPFiled
              onVerifyAddharOtp={onVerifyAddharOtp}
              otpLoading={otpLoading}
              handleOTPChange={handleOTPChange}
              value={otp}
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

            <AadharFrontBackImageCard
              otpVerified={otpVerified}
              isPriceScreen={isPriceScreen}
            />
          </>
        )}
      </View>
    </BottomLayout>
  );
};

export default AadharVerificationCom;

const OTPFiled = ({
  onVerifyAddharOtp,
  otpLoading,
  handleOTPChange,
  value,
}) => (
  <View style={styles.containers}>
    <View style={[styles.firstCard]}>
      <TextInput
        onChangeText={handleOTPChange}
        placeholder="Enter your OTP number"
        value={value}
        keyboardType="numeric"
      />
    </View>
    <View style={[styles.secondCard]}>
      {otpLoading ? (
        <ActivityIndicator size={20} />
      ) : (
        <Pressable
          android_ripple={{ color: "#ccc" }}
          onPress={onVerifyAddharOtp}
          style={{
            width: "100%",
            height: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.otpTextColor}>Verify OTP</Text>
        </Pressable>
      )}
    </View>
  </View>
);

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
    color: "#EA4C89",
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
  containers: {
    width: "100%",
    height: 55,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EDEDED",
    backgroundColor: "#F7F7F7",
    overflow: "hidden",
  },
  firstCard: {
    width: "70%",
    height: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  secondCard: {
    width: "30%",
    height: "100%",
    backgroundColor: "#EA4C89",
    justifyContent: "center",
    alignItems: "center",
  },
  otpTextColor: {
    color: "#fff",
    fontWeight: "600",
  },
});
