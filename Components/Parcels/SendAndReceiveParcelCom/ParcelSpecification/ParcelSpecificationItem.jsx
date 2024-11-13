import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ParcelSpecificationItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerCard}></View>
      <Text style={styles.text}>{item?.name}</Text>
    </View>
  );
};

export default ParcelSpecificationItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  innerCard: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#e02e88",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 13,
    fontWeight: "500",
    flex: 1,
    flexWrap: "wrap",
  },
});
