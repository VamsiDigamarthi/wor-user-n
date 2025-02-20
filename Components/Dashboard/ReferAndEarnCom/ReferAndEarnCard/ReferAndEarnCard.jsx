import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const ReferAndEarnCard = () => {
  return (
    <View style={styles.constainer}>
      <View style={styles.textContainer}>
        <Text style={styles.textCard}>Earn upto ₹50 per friend</Text>
        <Text style={styles.textCard}>You Invite to women rider</Text>
        <View style={styles.couponContiner}>
          <Text style={styles.textCard}>JGJ86</Text>
          <Ionicons name="copy-outline" size={20} color="#fff" />
        </View>
      </View>
      <Image
        style={styles.image}
        source={require("../../../../assets/images/profile/Refer.png")}
      />
    </View>
  );
};

export default ReferAndEarnCard;

const styles = StyleSheet.create({
  constainer: {
    width: "100%",
    height: 130,
    backgroundColor: "#EA4C89",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  textContainer: {
    width: "65%",
    gap: 7,
    alignItems: "flex-start",
    overflow: "scroll",
  },
  textCard: {
    color: "#fff",
    fontSize: 13,
  },
  couponContiner: {
    flexDirection: "row",
    gap: 10,
    padding: 5,
    backgroundColor: "rgba(239, 233, 236, 0.21)",
    borderRadius: 10,
  },
  image: {
    width: "30%",
    height: "100%",
    resizeMode: "contain",
  },
});
