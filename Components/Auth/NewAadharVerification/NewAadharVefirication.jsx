import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BottomLayout from "../../../Layouts/BottomLayout";
import NewAadharNumbercard from "./NewAadharNumbercard";
import NewAadharOtpCard from "./NewAadharOtpCard";
import AadharFrontBackImageCard from "../../../Utils/AadharFrontBackImageCard/AadharFrontBackImageCard";
import { COLORS } from "../../../Constants/colors";
import { useNewAadharVefiricationHook } from "./NewAadharVefirication.hook";

const NewAadharVefirication = () => {
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
  return (
    <BottomLayout
      title="Aadhar Verification"
      subTitle="Identity Check with Aadhaar and Face Scan for Safe Ride Bookings"
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
          isEditable={aadharVerified}
          otpLoader={otpLoader}
          onPress={onOtpVefirified}
        />
        <Text style={styles.uploadFrontBackImageCard}>
          Upload Aadhar Front/Back Images
        </Text>
        <AadharFrontBackImageCard otpVerified={otpVerified} />
      </View>
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
