import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";

const SupportInputCard = ({
  pickImage,
  handleAudioRecording,
  isRecording,
  handleSendMessage,
  setMessage,
  message,
  hasSoftwareNavigationBar,
}) => {
  return (
    <View
      style={[styles.conainer, { bottom: hasSoftwareNavigationBar ? 9 : 0 }]}
    >
      <Pressable onPress={pickImage} style={styles.iconContainer}>
        <AntDesign name="paperclip" size={24} color="#e02e88" />
      </Pressable>
      <Pressable style={styles.iconContainer} onPress={handleAudioRecording}>
        <FontAwesome
          name={isRecording ? "stop-circle" : "microphone"}
          size={24}
          color={isRecording ? "red" : "#e02e88"}
        />
      </Pressable>
      <TextInput
        onChangeText={setMessage}
        value={message}
        style={styles.input}
        placeholder="Enter text here...!"
      />
      <Pressable style={styles.iconContainer} onPress={handleSendMessage}>
        <Ionicons name="send" size={24} color="#e02e88" />
      </Pressable>
    </View>
  );
};

export default SupportInputCard;

const styles = StyleSheet.create({
  conainer: {
    width: "94.5%",
    position: "absolute",
    bottom: 4,
    left: 0,
    right: 0,
    padding: 10,
    gap: 15,
    height: 55,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e02e88",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  input: {
    flex: 1,
  },
});
