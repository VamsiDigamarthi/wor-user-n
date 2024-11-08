import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CaptainRideOpt = ({ orderOtp }) => {
  const otpString = orderOtp.toString();
  return (
    <View style={styles.container}>
      <Text style={styles.pinText}>Start your ride with PIN</Text>
      <View style={styles.allOtpBox}>
        {orderOtp
          ?.toString()
          ?.split("")
          ?.map((digit, index) => (
            <View key={index} style={styles.otpBox}>
              <Text style={styles.otp}>{digit}</Text>
            </View>
          ))}
      </View>
    </View>
  );
};

export default CaptainRideOpt;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  pinText: {
    color: "black",
    fontSize: 12,
    fontWeight: "600",
  },
  allOtpBox: {
    flexDirection: "row",
    gap: 8,
  },

  otpBox: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    elevation: 2,
    backgroundColor: "#fff",
  },
  otp: {
    color: "#e02e88",
  },
});
