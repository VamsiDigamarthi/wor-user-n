import { View, Text, StyleSheet } from "react-native";
import React from "react";
export default function SendText() {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <View style={styles.image}></View>
      <Text style={styles.text}>SendText</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: "#00A6ED",
  },

  text: {
    backgroundColor: "#F2F4F5",
    color: "#000",
    fontWeight: "bold",
    padding: 10,
    borderRadius: 20,
    width: "40%",
    textAlign: "center",
  },
});
