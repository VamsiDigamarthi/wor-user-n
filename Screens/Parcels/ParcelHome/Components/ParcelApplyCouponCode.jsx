import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../../Constants/colors";
import { MaterialIcons } from "@expo/vector-icons";

const ParcelApplyCouponCode = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: 40,
          height: 25,
          backgroundColor: "#e02e88",
          borderRadius: 5,
        }}
      ></View>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: COLORS.heading,
          flex: 1,
        }}
      >
        Apply Coupon
      </Text>
      <MaterialIcons
        name="arrow-forward-ios"
        size={15}
        color={COLORS.subHeading}
      />
    </View>
  );
};

export default ParcelApplyCouponCode;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // borderWidth: 1,
    borderColor: "#ffe2e6",
    borderRadius: 10,
    backgroundColor: "#ffe2e6",
    elevation: 1,
    shadowColor: "#000",
    gap: 12,
    padding: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
