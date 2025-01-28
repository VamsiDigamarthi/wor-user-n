import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native";

const WhatWeSay = ({ handleRatingChange }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16, fontWeight: "600" }}>What did you like</Text>
      <View style={{ width: "100%", gap: 10 }}>
        <Text style={{ fontSize: 13, fontWeight: "500" }}>
          Write your Expereinece
        </Text>
        <TextInput
          placeholder="Write your expereinece"
          style={styles.inputCard}
          onChangeText={(value) => handleRatingChange("reviewTest", value)}
        />
      </View>
    </View>
  );
};

export default WhatWeSay;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 35,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  inputCard: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#e02e88",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});
