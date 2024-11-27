import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../Constants/colors";

const WalletBenefitCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Benefit</Text>
      <Text style={styles.subTitle}>No Need to carry cash.</Text>
      <Text style={styles.subTitle}>Earn rewards or cashback</Text>

      <Text style={styles.subTitle}>Fast Checkout process</Text>
    </View>
  );
};

export default WalletBenefitCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 1,
    borderRadius: 10,
    gap: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.heading,
  },
  subTitle: {
    fontSize: 12,
    color: COLORS.subHeading,
  },
});
