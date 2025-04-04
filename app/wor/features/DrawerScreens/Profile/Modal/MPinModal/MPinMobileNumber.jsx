import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import InputBox from "../../../../../utiles/InputCard/InputCard";
import { AntDesign } from "@expo/vector-icons";
import CustomBtn from "../../../../../utiles/CustomBtn";
import { sendOtpToMobileNumber } from "../../services/mPin.servi";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { fonts } from "../../../../../fonts/Fonts";

const MPinMobileNumber = ({ mobile, setMobile, setIsMobileOrOtp }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { profile } = useSelector((state) => state.profileSlice);

  const handleSendOtp = async () => {
    if (profile?.mobile !== mobile) {
      // console.log("mobile number not match");
      Toast.show({
        text1: "Please Enter Your Register Mobile Number",
        type: "error",
        position: "top",
      });
      return;
    }
    setIsLoading(true);
    const data = await sendOtpToMobileNumber({ mobile });
    if (!data) return;
    setIsMobileOrOtp(true);
    // setMobile("");
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter Mobile Number</Text>
      <Text
        style={{
          fontSize: 11,
          color: "gray",
          fontFamily: fonts.robotoRegular,
        }}
      >
        Received OTP From Your Register Mobile Number
      </Text>
      <InputBox
        keyboardType="numeric"
        maxLength={10} // Includes spaces
        placeholder="XXXXXXXXXX"
        label="Enter Mobile Number"
        isIconsNotText={true}
        icon="call"
        iconType="Zocial"
        value={mobile} // Use formatted value for display
        onChangeText={setMobile}
      />
      <View style={{ gap: 10, marginTop: 20 }}>
        <View style={styles.verifiicons}>
          <AntDesign name="Safety" size={20} color="#036413" />
          <Text style={{ fontFamily: fonts.robotoRegular }}>
            Your Data is 100% Safe and Secure
          </Text>
        </View>
        <CustomBtn
          width="100%"
          onPress={handleSendOtp}
          title="Continue"
          btnBg={mobile.length === 10 ? "#EA4C89" : "#F7F7F7"}
          btnColor={mobile.length === 10 ? "#fff" : "#000"}
          isLoding={isLoading}
        />
      </View>
    </View>
  );
};

export default MPinMobileNumber;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 25,
    gap: 10,
    width: "100%",
  },
  heading: {
    fontSize: 18,
    // fontWeight: "600",
    fontFamily: fonts.robotoSemiBold,
  },
  verifiicons: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
});
