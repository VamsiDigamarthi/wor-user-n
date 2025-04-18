import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Platform } from "react-native";
import { useChatBotHook } from "../Hooks/ChatBot.hook";
import AppBarLayout from "../../../ridebooking/sharedLogics/AppBarLayout";
import ChatBotMessage from "../Components/ChatBotMessage";
import { chatBot } from "../data/chatBotData";

const ChatBot = () => {
  const {
    caterogy,
    chatMessageHistory,
    scrollViewRef,
    handleNewQuestion,
    initiallMessage,
  } = useChatBotHook();

  console.log(caterogy, "caterogy");

  return (
    <AppBarLayout title="WoR Support" isPositionAppbar={true}>
      <View
        style={[
          styles.container,
          { paddingTop: Platform.OS == "ios" ? 110 : 80 },
        ]}
      >
        <Text style={styles.text}>{caterogy}</Text>
        <ScrollView
          style={styles.messageContainer}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          <ChatBotMessage
            chat={initiallMessage}
            handleNewQuestion={handleNewQuestion}
            isInitially={true}
          />
          {chatMessageHistory.map((each, index) => (
            <ChatBotMessage
              key={index}
              chat={each}
              handleNewQuestion={handleNewQuestion}
            />
          ))}
        </ScrollView>
      </View>
    </AppBarLayout>
  );
};

export default ChatBot;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 80,
    flex: 1,
  },
  text: {
    backgroundColor: "#fff7fb",
    paddingHorizontal: 10,
    paddingVertical: 15,
    fontSize: 18,
    fontWeight: "600",
  },
  messageContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 25,
  },
});
