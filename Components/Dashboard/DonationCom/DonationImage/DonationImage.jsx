import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const DonationImage = () => {
  return (
    <Image
      style={styles.image}
      source={require("../../../../assets/images/profile/donation.png")}
    />
  );
};

export default DonationImage;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain", // or 'stretch'
  },
});
