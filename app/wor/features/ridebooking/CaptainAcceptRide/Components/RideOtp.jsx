import { StyleSheet, Text, View } from "react-native";
import React from "react";

const RideOtp = ({ otp }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 15, fontWeight: "600" }}>
        Start your ride with PIN
      </Text>
      <View style={styles.otp}>
        {String(otp)
          ?.split("")
          ?.map((digit, index) => (
            <Text
              key={index}
              style={{ fontSize: 15, fontWeight: "600", color: "#e02e88" }}
            >
              {digit}
            </Text>
          ))}
      </View>
    </View>
  );
};

export default RideOtp;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
  },
  otp: {
    flexDirection: "row",
    gap: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#fccfe6",
    paddingHorizontal: 10,
  },
});
