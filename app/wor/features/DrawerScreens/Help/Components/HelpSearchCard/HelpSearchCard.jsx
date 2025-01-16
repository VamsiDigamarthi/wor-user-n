import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const HelpSearchCard = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={25} color="#E02E88" />
      <TextInput style={styles.inputCard} placeholder="Search Help Topics" />
    </View>
  );
};

export default HelpSearchCard;

const styles = StyleSheet.create({
  container: {
    // width: "100%",
    borderRadius: 10,
    // borderWidth: 1,
    borderColor: "#e02e88",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    elevation: 1,
  },
  inputCard: {
    width: "88%",
    height: "100%",
  },
});
