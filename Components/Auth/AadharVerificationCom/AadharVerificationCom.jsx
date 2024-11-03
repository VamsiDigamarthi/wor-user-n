import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AadharFaceNavigator from "../../../Utils/AadharFaceNagivetor/AadharFaceNagivetor";
import OtpRelatedInput from "../OtpCom/OtpCom";
import AadharFrontBackImageCard from "../../../Utils/AadharFrontBackImageCard/AadharFrontBackImageCard";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";

const AadharVerificationCom = () => {
  const handlePress = () => {};
  const handleNavigateToOTP = () => {};
  return (
    <View style={styles.container}>
      <Text>AadharVerificationCom</Text>
      <AadharFaceNavigator
        isInput={true}
        isText={true}
        textWidth="30%"
        inputWidth="70%"
        onPress={handlePress}
      />
      <Text style={styles.checkingOtp}>
        check <Text style={styles.checkingOtpHighlight}>OTP</Text> from your
        aadhar linked number
      </Text>
      <OtpRelatedInput btnShow={false} />

      <Text style={styles.uploadAddarText}>
        Update Your Aadhar Front & Back Photos
      </Text>

      <AadharFrontBackImageCard />
      <CustomBtn
        title="continue"
        btnBg="#fff"
        btnColor="#E02E88"
        onPress={handleNavigateToOTP}
      />
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
});
