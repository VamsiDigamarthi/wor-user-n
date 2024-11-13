import { StyleSheet, Text, View } from "react-native";
import React from "react";

const PaymentMethodCard = ({ titles, children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{titles}</Text>
      <View style={styles.innerCard}>{children}</View>
    </View>
  );
};

export default PaymentMethodCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    borderColor: "#ffe2e6",
    borderWidth: 1,
    backgroundColor: "#fff",
    gap: 13,
    // elevation: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  innerCard: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    borderColor: "#ffe2e6",
    borderWidth: 1,
    backgroundColor: "#fff",
    gap: 10,
  },
});
