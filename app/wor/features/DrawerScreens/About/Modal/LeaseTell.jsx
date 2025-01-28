import { StyleSheet, Text, View } from "react-native";
import React from "react";

const LeaseTell = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Lease tell us why you're leaving women rider
      </Text>
    </View>
  );
};

export default LeaseTell;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 10,
    backgroundColor: "red",
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
  },
});
