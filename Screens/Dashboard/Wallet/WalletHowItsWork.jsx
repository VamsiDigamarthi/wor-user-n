import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../Constants/colors";

const WalletHowItsWork = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How Its Work</Text>
      <Text style={styles.subTitle}>
        <Text
          style={{ fontSize: 13, fontWeight: "600", color: COLORS.heading }}
        >
          Load Funds :{" "}
        </Text>
        Explain how users can add money using bank transfers, UPI, or cards.
      </Text>
      <Text style={styles.subTitle}>
        <Text
          style={{ fontSize: 13, fontWeight: "600", color: COLORS.heading }}
        >
          Pay Anywhere:{" "}
        </Text>
        Highlight where and how they can use the wallet (rides payment, pre
        booking,).
      </Text>
      <Text style={styles.subTitle}>
        <Text
          style={{ fontSize: 13, fontWeight: "600", color: COLORS.heading }}
        >
          Track Transactions:{" "}
        </Text>
        Mention real-time updates and transparency in s
      </Text>
    </View>
  );
};

export default WalletHowItsWork;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 1,
    borderRadius: 10,
    gap: 10,
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
