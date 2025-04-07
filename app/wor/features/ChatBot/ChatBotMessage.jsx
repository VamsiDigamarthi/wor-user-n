import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const ChatBotMessage = ({ chat, handleSelectOption }) => {
  // console.log("chat", chat);

  return (
    <View
      style={{
        width: "100%",
        flexDirection: chat?.isSender ? "row-reverse" : "row",
      }}
    >
      <View style={styles.container}>
        <Text style={styles.message}>{chat?.message}</Text>
        {chat?.options && (
          <View
            style={[
              styles.actionButtonCard,
              {
                flexDirection: chat.options.some((opt) => opt.text === "👍")
                  ? "row"
                  : "column",
                justifyContent: chat.options.some((opt) => opt.text === "👍")
                  ? "space-between"
                  : "",
              },
            ]}
          >
            {chat.options.map((opt, idx) => (
              <Pressable
                key={`${opt.text}-${idx}`}
                onPress={() => handleSelectOption(opt)}
                style={styles.button}
              >
                <Text style={styles.question}>{opt.text}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {chat?.subMessage &&
          chat?.subMessage?.map((subText) => (
            <Text key={subText} style={styles.subQuestion}>
              {subText}
            </Text>
          ))}
      </View>
    </View>
  );
};

export default ChatBotMessage;

const styles = StyleSheet.create({
  container: {
    maxWidth: "90%",
    // padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    // backgroundColor: "#f3f4f8",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#fcfffd",
    overflow: "hidden",
  },
  message: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 21,
    padding: 15,

    backgroundColor: "#f0f4ff",
  },
  question: {
    fontSize: 14,
    color: "#8db8fc",
    lineHeight: 22,
    fontWeight: "600",
  },

  actionButtonCard: {
    backgroundColor: "#fff",
  },

  button: {
    borderBottomColor: "#e8edea",
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },

  subQuestion: {
    paddingHorizontal: 15,
    paddingVertical: 4,
    lineHeight: 21,
    fontSize: 14,
    fontWeight: "500",
  },
});
