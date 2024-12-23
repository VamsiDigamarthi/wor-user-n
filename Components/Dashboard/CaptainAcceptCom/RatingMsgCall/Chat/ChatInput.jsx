import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ChatInput = ({ setMessage, message, handleSendMessage }) => {
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput
          placeholder="Send message..!"
          style={styles.inputCard}
          placeholderTextColor="#fff"
          onChangeText={setMessage}
          value={message}
        />
        <Pressable onPress={handleSendMessage}>
          <Ionicons name="send" size={20} color="#fff" />
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
    bottom: 10,
    left: 0,
    // backgroundColor: "red",
    padding: 10,
  },
  input: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#f263aa",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  inputCard: {
    width: "90%",
    // backgroundColor: "red",
    fontSize: 16,
    color: "#fff",
    // height
  },
});
