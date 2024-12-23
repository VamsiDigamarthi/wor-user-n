import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ChatMessage = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  text: {
    backgroundColor: "#fff",
    color: "#fff",
    // fontWeight: "600",
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
    // textAlign: "center",
    paddingHorizontal: 15,
    // borderRadius: 20,
    color: "#e02e88",
    lineHeight: 20,
  },
});
