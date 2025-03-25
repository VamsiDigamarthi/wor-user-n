import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import ChatImage from "./ChatImage";
import ChatAudioPreview from "./ChatAudioPreview";
import { imageUrl } from "../../../../../Constants/url";

const COLORS = {
  captain: {
    background: "#e02e88",
    text: "#fff",
  },
  user: {
    background: "#fff",
    text: "#e02e88",
  },
};

const SupportChatMessage = ({ sender = "captain", image, type, message }) => {
  const isCaptain = sender === "captain";
  const messageStyle = isCaptain ? COLORS.captain : COLORS.user;

  return (
    <View
      style={[
        styles.container,
        { justifyContent: isCaptain ? "flex-end" : "flex-start" },
      ]}
    >
      {type === "image" && <ChatImage imageUrl={`${imageUrl}/${image}`} />}

      {type === "audio" && (
        <>
          <ChatAudioPreview chatAudio={`${imageUrl}/${image}`} />
        </>
      )}

      {type === "text" && (
        <Text
          style={[
            styles.text,
            {
              backgroundColor: messageStyle.background,
              color: messageStyle.text,
            },
          ]}
        >
          {message}
        </Text>
      )}
    </View>
  );
};

export default SupportChatMessage;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },

  text: {
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
    paddingHorizontal: 15,
    lineHeight: 20,
  },
});
