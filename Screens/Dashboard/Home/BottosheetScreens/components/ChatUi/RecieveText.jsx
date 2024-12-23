import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function RecieveText({ type, text }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: type === "user" ? "flex-end" : "flex-start",
        gap: 8,
        marginBottom: 10,
        // maxWidth: "80%",
        // backgroundColor: "red",
      }}
    >
      {type === "user" ? (
        <>
          <Text style={styles.text}>{text}</Text>
          <View style={styles.image}></View>
        </>
      ) : (
        <>
          <View style={styles.image}></View>
          <Text style={styles.text}>{text}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: "#dce0e6",
  },

  text: {
    backgroundColor: "#e02e88",
    color: "#fff",
    fontWeight: "bold",
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
    textAlign: "center",
    paddingHorizontal: 15,
  },
});
