import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const CustomDrawerItem = ({ label, onPress, icon }) => {
  return (
    <View style={styles.drccontainer}>
      <Image source={icon} style={styles.iconImg} />
      <TouchableOpacity onPress={onPress} style={styles.textCard}>
        <Text style={styles.text}>{label}</Text>
        <FontAwesome name="chevron-right" size={15} color="#B0B0B0" />
      </TouchableOpacity>
    </View>
  );
};

export default CustomDrawerItem;

const styles = StyleSheet.create({
  drccontainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 5,
    paddingLeft: 20,
    // paddingRight: 10,
  },
  iconImg: {
    height: 16,
    width: 16,
    resizeMode: "contain",
  },
  textCard: {
    width: "90%",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
    paddingVertical: 8,
    paddingRight: 15,
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
  },
});
