import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BottomSheetTitle from "./Components/BottomSheetTitle/BottomSheetTitle";
import LoginRelatedInput from "../../Components/Auth/Login/Login";
import OtpRelatedInput from "../../Components/Auth/OtpCom/OtpCom";
import SignUpRelated from "../../Components/Auth/SignUpRelated/SignUpRelated";
import DocumentRelatedCheck from "../../Components/Auth/DocumentRelatedCheck/DocumentRelatedCheck";
import AadharVerificationCom from "../../Components/Auth/AadharVerificationCom/AadharVerificationCom";

const BottomSheet = ({ uiDisplay, selectedImage = "", mobile = "" }) => {
  const onUiChange = () => {
    switch (uiDisplay) {
      case "login":
        return <LoginRelatedInput />;
      case "otp":
        return <OtpRelatedInput />;
      case "signup":
        return <SignUpRelated selectedImage={selectedImage} mobile={mobile} />;
      case "documentCheck":
        return <DocumentRelatedCheck />;
      case "aadharVerification":
        return <AadharVerificationCom />;
      default:
        return <LoginRelatedInput />;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}></Text>
      <BottomSheetTitle title="Verify Your Mobile Number" />
      <Text style={styles.subText}>
        By Entering your mobile number you are agreeing to our terms & condition
      </Text>
      {onUiChange()}
    </View>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "fit-content",
    paddingHorizontal: 26,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 28,
    backgroundColor: "#fff5f9",
  },
  text: {
    width: 120,
    height: 4,
    backgroundColor: "#E02E88",
    borderRadius: 100,
  },
  subText: {
    fontSize: 12,
    color: "gray",
  },
});
