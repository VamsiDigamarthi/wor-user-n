import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { imageUrl } from "../../../../../Constants/url";

const ChatMessage = ({ text, type, captainProfilePic }) => {
  const captainImageUrl = `${imageUrl}/${captainProfilePic}`;
  console.log("captainImageUrl", captainImageUrl);
  return (
    <View
      style={[
        styles.container,
        { justifyContent: type === "user" ? "flex-end" : "flex-start" },
      ]}
    >
      <Image
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          overflow: "hidden",
          resizeMode: "contain",
        }}
        source={{ uri: captainImageUrl }}
      />
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
    // backgroundColor: "red",
  },
  text: {
    backgroundColor: "#fff",
    color: "#fff",
    // fontWeight: "600",
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
    backgroundColor: "blue",
    // textAlign: "center",
    paddingHorizontal: 15,
    color: "#EA4C89",
    lineHeight: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
});
