import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "../../../Constants/colors";

const NewAadharOtpCard = ({
  isInput,
  isEditable,
  onTextChange,
  value,
  otpValue,
  aadharVerified,
  otpLoader,
  onPress,
}) => {
  return (
    <View style={styles.mainCard}>
      <Text style={styles.enterOtpText}>
        Enter OTP From your Aadhar link Number
      </Text>
      <View style={styles.container}>
        <View style={[styles.firstCard]}>
          {!isInput ? (
            <TextInput
              onChangeText={onTextChange}
              placeholder="Enter your aadhar number"
              value={value}
              keyboardType="numeric"
              editable={isEditable}
            />
          ) : (
            <Text>{otpValue}</Text>
          )}
        </View>
        <View
          style={[
            styles.secondCard,
            !aadharVerified && { backgroundColor: "#808080" },
          ]}
        >
          <Pressable onPress={onPress}>
            {otpLoader ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.getOtpText}>Verify</Text>
            )}
          </Pressable>
        </View>
      </View>
      <View style={styles.otpCardText}>
        <Text style={styles.resendOTPText}>Resend OTP? 0:56</Text>
      </View>
    </View>
  );
};

export default NewAadharOtpCard;

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: "#E02E88",
    justifyContent: "center",
    alignItems: "center",
  },
  getOtpText: {
    color: "#fff",
    fontSize: 16,
  },
  mainCard: {
    gap: 6,
  },
  otpCardText: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  enterOtpText: {
    fontSize: 10,
    color: COLORS.subHeading,
  },
  resendOTPText: {
    color: "#e02e88",
    fontSize: 11,
  },
});
