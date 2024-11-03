import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const RatingMsgCall = () => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingCard}>
        <Text style={styles.ratingText}>4.3</Text>
        <Ionicons name="star" size={20} color="#e02e88" />
      </View>
      <View style={styles.messageCard}>
        <TextInput placeholder="Message Dharani" />
      </View>
      <View style={styles.callCard}>
        <Ionicons name="call" size={20} color="#e02e88" />
      </View>
    </View>
  );
};

export default RatingMsgCall;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    // backgroundColor: "red",
  },
  ratingCard: {
    width: "25%",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e02e88",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 4,
    flexDirection: "row",
    gap: 5,
  },
  ratingText: {
    color: "#e02e88",
    fontWeight: "700",
  },
  messageCard: {
    width: "60%",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e02e88",
    padding: 4,
    paddingHorizontal: 10,
  },
  callCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e02e88",
    paddingHorizontal: 7,
    justifyContent: "center",
    alignItems: "center",
  },
});
