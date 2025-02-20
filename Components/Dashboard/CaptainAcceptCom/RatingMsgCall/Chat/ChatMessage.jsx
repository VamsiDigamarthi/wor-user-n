import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ChatMessage = ({ text, type }) => {
  return (
    <View
      style={[
        styles.container,
        { justifyContent: type === "user" ? "flex-end" : "flex-start" },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            backgroundColor: type === "user" ? "#EA4C89" : "#fff",
            color: type === "user" ? "#fff" : "#EA4C89",
          },
        ]}
      >
        {text}
      </Text>
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
    color: "#EA4C89",
    lineHeight: 20,
  },
});
