import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CaptainTime = ({ title, time }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.pinkText}>{title}</Text>
      <Text style={styles.blackText}>ETA : {time}</Text>
    </View>
  );
};

export default CaptainTime;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    // borderRadius: 10,
    // borderWidth: 1,
    // borderColor: "#ffe2e6",
    // elevation: 1,
    // shadowColor: "red",
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
