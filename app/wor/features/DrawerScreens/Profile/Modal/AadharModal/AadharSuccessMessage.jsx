import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { fonts } from "../../../../../fonts/Fonts";

const AadharSuccessMessage = ({ genderFailed }) => {
  const message =
    genderFailed === "Gender"
      ? "Sorry Your Gender has not Verified"
      : genderFailed === "server"
      ? "Try Again after some times"
      : genderFailed === "ownServer"
      ? "Wor Server Update Your details failed Please try again later"
      : "Your Gender has been verified successfully";

  return (
    <View style={styles.container}>
      <View style={styles.iconCard}></View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default AadharSuccessMessage;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  iconCard: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "red",
  },
  message: {
    fontSize: 20,
    fontFamily: fonts.robotoSemiBold,
    textAlign: "center",
  },
});
