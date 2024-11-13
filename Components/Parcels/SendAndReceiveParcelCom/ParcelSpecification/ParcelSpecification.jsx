import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ParcelSpecificationItem from "./ParcelSpecificationItem";

const ParcelSpecification = () => {
  let data = [
    {
      name: "Parcel Weights 10kgs or Less",
    },
    {
      name: "No Illegal, alcohol or restricted items",
    },
    {
      name: "Item should fit in a backpack",
    },
    {
      name: "Avoid sending high value & Fragile items",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Fit these specifications:</Text>
      {data?.map((eachItem, index) => (
        <ParcelSpecificationItem key={index} item={eachItem} />
      ))}
    </View>
  );
};

export default ParcelSpecification;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ffe2e6",
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 1,
    shadowColor: "#000",
    gap: 12,
    padding: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
