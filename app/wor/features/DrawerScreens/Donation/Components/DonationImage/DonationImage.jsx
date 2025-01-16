import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { DonationImg } from "../../../../../Images/Donation";

const DonationImage = () => {
  return <Image style={styles.image} source={DonationImg} />;
};

export default DonationImage;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain", // or 'stretch'
  },
});
