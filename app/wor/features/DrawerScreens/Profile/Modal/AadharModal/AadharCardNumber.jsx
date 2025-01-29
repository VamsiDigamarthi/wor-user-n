import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomBtn from "../../../../../utiles/CustomBtn";
import InputBox from "../../../../../utiles/InputCard/InputCard";
import { AntDesign } from "@expo/vector-icons";
import { aadharNumberSendOtp } from "./AadharModal.Serv";
import { fonts } from "../../../../../fonts/Fonts";

const AadharCardNumber = ({
  aadharNumber,
  setAadharNumber,
  setOtpPress,
  setClientId,
}) => {
  const [formattedAadhar, setFormattedAadhar] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleAadharChange = (text) => {
    const numericValue = text.replace(/\D/g, "");
    if (numericValue.length <= 12) {
      const formatted = numericValue
        .replace(/(\d{4})(\d{1,4})?(\d{1,4})?/, "$1 $2 $3")
        .trim();

      setAadharNumber(numericValue);
      setFormattedAadhar(formatted);
    }
  };

  const handleSubmitAadharCard = async () => {
    setIsLoading(true);
    const data = await aadharNumberSendOtp({ aadharNumber });
    console.log("data", data);
    setIsLoading(false);
    if (data?.status) {
      setClientId(data?.clientId);
      setOtpPress(true);
      return;
    }
    setErrMsg(data?.error);
  };

  return (
    <View style={styles.bottomCardContainer}>
      <Text style={styles.heading}>Aadhaar Details</Text>
      <InputBox
        keyboardType="numeric"
        maxLength={14} // Includes spaces
        placeholder="XXXX XXXX XXXX"
        label="Enter Aadhar Number"
        isIconsNotText={true}
        icon={"id-card-o"}
        iconType="FontAwesome"
        value={formattedAadhar} // Use formatted value for display
        onChangeText={handleAadharChange}
      />

      <View style={styles.rowCard}>
        <View style={styles.dot}></View>
        <Text style={styles.listText}>
          we prioritize your safety and privacy. Aadhaar is used only for
          verification to keep our services secure.
        </Text>
      </View>

      <View style={styles.rowCard}>
        <View style={styles.dot}></View>
        <Text style={styles.listText}>
          We handle Aadhaar data carefully and never misuse or share it. Your
          security is our top concern.
        </Text>
      </View>

      <View style={styles.verifiicons}>
        <AntDesign name="Safety" size={20} color="#036413" />
        <Text style={{ color: "#757575", fontFamily: fonts.robotoRegular }}>
          Your Data is 100% Safe and Secure
        </Text>
      </View>
      {errMsg && <Text style={{ fontSize: 11, color: "red" }}>{errMsg}</Text>}
      <CustomBtn
        width="100%"
        onPress={handleSubmitAadharCard}
        title="Continue"
        btnBg={aadharNumber.length === 12 ? "#EA4C89" : "#F7F7F7"}
        btnColor={aadharNumber.length === 12 ? "#fff" : "#000"}
        isLoding={isLoading}
      />
    </View>
  );
};

export default AadharCardNumber;

const styles = StyleSheet.create({
  bottomCardContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 15,
  },
  heading: {
    fontSize: 16,
    // fontWeight: "600",
    fontFamily: fonts.robotoSemiBold,
  },
  rowCard: {
    flexDirection: "row",
    gap: 4,
    justifyContent: "flex-start",

    width: "99%",
    marginHorizontal: "auto",
  },
  verifiicons: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  dot: {
    height: 5,
    width: 5,
    borderRadius: 200,
    backgroundColor: "#757575",
    marginTop: 5,
  },
  listText: {
    textAlign: "justify",
    fontSize: 10,
    fontFamily: fonts.robotoRegular,
    color: "#757575",
  },
});
