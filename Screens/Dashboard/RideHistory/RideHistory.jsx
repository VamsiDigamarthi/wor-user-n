import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import RideHistoryItem from "./RideHistoryItem";

const RideHistory = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff5f9" />
      <RideHistoryItem />
    </View>
  );
};

export default RideHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff5f9",
    paddingHorizontal: 26,
    paddingVertical: 12,
    gap: 20,
  },
});
