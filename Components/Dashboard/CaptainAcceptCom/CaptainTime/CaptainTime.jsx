import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CaptainTime = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.pinkText}>Rider on the way</Text>
      <Text style={styles.blackText}>ETA : 03:59</Text>
    </View>
  );
};

export default CaptainTime;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  pinkText: {
    color: "#e02e88",
    fontWeight: "600",
    fontSize: 16,
  },
  blackText: {
    fontWeight: "600",
    fontSize: 13,
    color: "black",
  },
});
