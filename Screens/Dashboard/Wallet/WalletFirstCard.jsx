import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../Constants/colors";

const WalletFirstCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image
          source={require("../../../assets/images/staticscreens/wallet.png")}
          style={styles.rightImage}
        />
      </View>
      <View style={styles.right}>
        <Text
          style={{ fontSize: 25, fontWeight: "600", color: COLORS.heading }}
        >
          Easy Payments
        </Text>
        <Text style={{ fontSize: 11, color: COLORS.subHeading }}>
          Pay smarter, faster, and safer.
        </Text>
      </View>
    </View>
  );
};

export default WalletFirstCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20,
    elevation: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    // shadowColor: "red",
  },
  left: {
    width: "35%",
  },
  rightImage: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },
  right: {
    width: "65%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    gap: 10,
    // backgroundColor: "red",
  },
});
