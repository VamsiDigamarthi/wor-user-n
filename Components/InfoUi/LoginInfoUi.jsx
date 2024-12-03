import { StyleSheet, Text, View } from "react-native";
import React from "react";
import InfoModalIconsWithText from "./ReUseableComponents/InfoModalIconsWithText";
import InfoListCard from "./ReUseableComponents/InfoListCard";
import { infoModalStyles } from "./Styles/InfoModalStyles";

const LoginInfoUi = () => {
  return (
    <View style={infoModalStyles.insideModalCard}>
      <InfoModalIconsWithText
        headerText="Login To Your Account Info"
        suHeading=""
      />
      <InfoListCard text="The number must be valid and capable of receiving text messages or calls." />
      <InfoListCard text="Provide your number in the required format (with country code, if necessary)." />
      <InfoListCard text="Need to agree to terms allowing the service to use your number for verification, updates and promotional messages." />

      <InfoListCard text="Review our Terms & Conditions for full details." />
      <InfoListCard text="You’ll typically receive a one-time password (OTP) that must be entered correctly within a specified time." />
    </View>
  );
};

export default LoginInfoUi;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // backgroundColor: "yellow",
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 10,
  },
});
