import { StyleSheet, Text, View } from "react-native";
import React from "react";

const NoData = ({ height = 300, message }) => {
  return (
    <View style={[styles.container, { height }]}>
      <Text style={{ fontSize: 14, fontWeight: "600" }}>No Data</Text>
      <Text style={styles.subHeading}>{message}</Text>
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 5,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "600",
    color: "gray",
  },
});
