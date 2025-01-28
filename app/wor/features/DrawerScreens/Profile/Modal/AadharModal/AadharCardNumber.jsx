import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomBtn from "../../../../../utiles/CustomBtn";
import InputBox from "../../../../../utiles/InputCard/InputCard";
import { AntDesign } from "@expo/vector-icons";
import { aadharNumberSendOtp } from "./AadharModal.Serv";

const AadharCardNumber = ({
  aadharNumber,
  setAadharNumber,
  setOtpPress,
  setClientId,
}) => {
  const [formattedAadhar, setFormattedAadhar] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(false);
    if (data?.status) {
      setClientId(data?.clientId);
      setOtpPress(true);
    }
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
        <Text style={{ textAlign: "justify", fontSize: 12, fontWeight: "400" }}>
          By clicking this checkbox and the sign Document button, I voluntarily
          agree to aadhaar esign the previewed document
        </Text>
      </View>

      <View style={styles.rowCard}>
        <View style={styles.dot}></View>
        <Text style={{ textAlign: "justify", fontSize: 12, fontWeight: "400" }}>
          By clicking this checkbox and the sign Document button, I voluntarily
          agree to aadhaar esign the previewed document
        </Text>
      </View>

      <View style={styles.verifiicons}>
        <AntDesign name="Safety" size={20} color="#036413" />
        <Text>Your Data is 100% Safe and Secure</Text>
      </View>

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
    fontWeight: "600",
  },
  rowCard: {
    flexDirection: "row",
    gap: 4,
    justifyContent: "flex-start",
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
    backgroundColor: "black",
    marginTop: 5,
  },
});
