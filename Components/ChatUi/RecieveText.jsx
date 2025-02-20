import { View, Text, StyleSheet } from "react-native";
import React from "react";
export default function RecieveText() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 8,
      }}
    >
      <Text style={styles.text}>Recieve Text</Text>
      <View style={styles.image}></View>
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
    backgroundColor: "#EA4C89",
    color: "#fff",
    fontWeight: "bold",
    padding: 10,
    borderRadius: 20,
    width: "40%",
    textAlign: "center",
  },
});
