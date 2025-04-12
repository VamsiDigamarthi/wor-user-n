import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ChatInput = ({
  setMessage,
  message,
  handleSendMessage,
  hasSoftwareNavigationBar,
}) => {
  return (
    <View style={[styles.container, { bottom: 0 }]}>
      <View style={styles.input}>
        <TextInput
          placeholder="Send message..!"
          style={styles.inputCard}
          placeholderTextColor="gray"
          onChangeText={setMessage}
          value={message}
        />
        <Pressable onPress={handleSendMessage}>
          <Ionicons name="send" size={20} color="gray" />
        </Pressable>
      </View>
    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    // bottom: 10,
    left: 0,
    // backgroundColor: "red",
    padding: 10,
    // paddingBottom: 20,
    // backgroundColor: "red",
  },
  input: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#EA4C89",
  },
  inputCard: {
    width: "92%",
    // backgroundColor: "red",
    fontSize: 16,
    color: "#000",
    // height
  },
});
