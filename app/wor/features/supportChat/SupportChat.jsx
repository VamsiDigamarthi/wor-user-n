import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import React from "react";
import SupportChatHeader from "./Components/SupportChatHeader";
import SupportInputCard from "./Components/SupportInputCard";
import { useSupportChatHook } from "./Hooks/SupportChat.hook";
import SupportChatMessage from "./Components/SupportChatMessage";
import { Ionicons } from "@expo/vector-icons";
import SupportAudioBox from "./Components/SupportAudioBox";

const SupportChat = () => {
  const {
    hasSoftwareNavigationBar,
    mref,
    chatMessages,
    pickImage,
    imageSource,
    clearImage,
    audioPath,
    isPlaying,
    isRecording,
    clearAudio,
    handleAudioRecording,
    handleAudioPreview,
    handleSendMessage,
    setMessage,
    message,
    scrollToBottom,
    showScrollButton,
    handleScroll,
  } = useSupportChatHook();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, position: "relative" }}
    >
      {/* <View style={styles.container}> */}
      <SupportChatHeader />

      <View style={{ flex: 1, paddingBottom: 100, position: "relative" }}>
        <FlatList
          ref={mref}
          data={chatMessages}
          extraData={chatMessages}
          keyExtractor={(item, index) => item._id ?? index}
          renderItem={({ item }) => (
            <SupportChatMessage
              image={item.imageUrl || item.mediaUrl}
              message={item.message}
              sender={item.sender}
              type={item.type}
            />
          )}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll} // Detect scrolling position
          scrollEventThrottle={16} // Optimize performance
        />
      </View>
      <SupportInputCard
        pickImage={pickImage}
        handleAudioRecording={handleAudioRecording}
        isRecording={isRecording}
        handleSendMessage={handleSendMessage}
        setMessage={setMessage}
        message={message}
        hasSoftwareNavigationBar={hasSoftwareNavigationBar}
      />
      {/* display Image */}
      {imageSource && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageSource }} style={styles.image} />
          <Pressable onPress={clearImage} style={styles.clearButton}>
            <Ionicons name="close-circle" size={24} color="white" />
          </Pressable>
        </View>
      )}

      {audioPath && (
        <SupportAudioBox
          clearAudio={clearAudio}
          handleAudioPreview={handleAudioPreview}
          isDisplayCrossIcon={true}
          isPlaying={isPlaying}
        />
      )}
      {/* </View> */}
    </KeyboardAvoidingView>
  );
};

export default SupportChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    gap: 10,
  },

  imageContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    width: "100%",
    height: 350,
    bottom: 100,
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",

    borderRadius: 10,
  },
  clearButton: {
    position: "absolute",
    top: 10,
    right: 10,
    // backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 12,
    padding: 4,
  },
  scrollToBottomButton: {
    position: "absolute",
    bottom: 75,
    right: "46%",
  },
});
