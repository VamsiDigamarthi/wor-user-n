import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RideHistoryFirst from "../../../../Screens/Dashboard/RideHistory/RideHistoryFirst";
import { Ionicons } from "@expo/vector-icons";

const HelpDropPickCard = () => {
  return (
    <View style={styles.mainContainer}>
      <RideHistoryFirst />
      <View style={styles.fullRideHistory}>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Ionicons name="contract" size={25} color="black" />
          <Text>Full Ride History</Text>
        </View>
        <Ionicons name="arrow-forward" size={20} color="#e02e88" />
      </View>
    </View>
  );
};

export default HelpDropPickCard;

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 1,
    borderColor: "#ffe2e6",
    borderRadius: 10,
    backgroundColor: "#fff",

    marginHorizontal: 10,
  },
  fullRideHistory: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
