import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const ChatBotMessage = ({ chat, handleNewQuestion, isInitially = false }) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: chat?.isSender ? "row-reverse" : "row",
      }}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: chat?.isSender ? "#cfe9ff" : "#f7f7f7" }, // Change background color
        ]}
      >
        <Text style={styles.text}>
          {isInitially ? (
            <>{chat?.message}</>
          ) : (
            <>{chat?.isSender ? chat?.message : chat?.description}</>
          )}
        </Text>
        <View style={styles.card}>
          {chat?.subQuestion?.map((each, index) => (
            <Pressable
              key={each + index}
              onPress={() => handleNewQuestion(each.text)}
            >
              <Text style={styles.subText}>{each.text}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

export default ChatBotMessage;

const styles = StyleSheet.create({
  container: {
    maxWidth: "90%",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    paddingVertical: 4,
  },
  card: {
    gap: 2,
  },
  subText: {
    fontSize: 12,
    color: "gray",
    paddingVertical: 4,
  },
});
