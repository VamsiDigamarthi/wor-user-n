import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import DropLocationItem from "./Components/DropLocationItem/DropLocationItem";
const DropLocation = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inputCard}>
        <Ionicons name="location" size={25} color="#E02E88" />
        <TextInput style={styles.input} placeholder="Enter Drop Location" />
      </View>
      <DropLocationItem />
      <DropLocationItem />
      <DropLocationItem />
    </View>
  );
};

export default DropLocation;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 10,
  },
  inputCard: {
    width: "100%",
    height: 50,
    borderColor: "#f5f0f0",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    elevation: 0,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
  },
  input: {
    width: "90%",
    height: "100%",
  },
});
