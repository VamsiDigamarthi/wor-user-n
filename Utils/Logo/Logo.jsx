import { Image, StyleSheet } from "react-native";
import React from "react";

const Logo = () => {
  return (
    <Image
      style={styles.logo} // Use the styles defined in the StyleSheet
      resizeMode="contain"
      source={require("../../assets/images/logo.png")}
    />
  );
};

export default Logo;

const styles = StyleSheet.create({
  logo: {
    width: "40%", // Set the width to 40%
    // You can add more styles here if needed
  },
});
