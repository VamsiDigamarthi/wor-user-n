import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";

import io from "socket.io-client";
import { useCallback, useEffect, useRef, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import RecieveText from "./RecieveText";
import { useSelector } from "react-redux";
import { API, imageUrl } from "../../../../../../Constants/url";

export default function ChatWithCaptain({ onPress }) {
  const { token } = useSelector((state) => state.token);
  const { profile } = useSelector((state) => state.profileSlice);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // State to store messages
  const socketRef = useRef(null); // Ref to hold the socket instance

  useEffect(() => {
    // Initialize the socket and store it in the ref
    socketRef.current = io(`${imageUrl}/support`);

    // Fetch previous messages
    const fetchPreviousMessage = async () => {
      try {
        const response = await API.get("/support-chat", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(response?.data);
      } catch (error) {
        console.log("fetch previous messages failed");
      }
    };

    fetchPreviousMessage();

    // Join the room based on the user's ID
    if (profile?._id) {
      socketRef.current.emit("join", { userId: profile._id });
    }

    // Listen for incoming messages
    socketRef.current.on("newMessage", (message) => {
      console.log("Received message:", message);
      // Append the new message to the messages array
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup on component unmount
    return () => {
      socketRef.current.disconnect(); // Close the socket connection
    };
  }, [profile?._id, token]); // Added token as a dependency for security

  const handleSendMessage = useCallback(() => {
    if (message.trim() === "") return; // Avoid sending empty messages

    const newMessage = {
      userId: profile?._id,
      text: message,
      sender: "user",
    };

    // Emit the message to the server using the socket ref
    socketRef.current.emit("message", newMessage);

    // Update the messages array locally with the sent message
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender: "user", timestamp: new Date().toISOString() },
    ]);

    setMessage(""); // Clear the input
  }, [message, profile?._id]);

  return (
    <>
      {/* Chat Header */}
      <View style={styles.chatHeader}>
        <TouchableOpacity onPress={() => onPress("main")}>
          <Entypo name="chevron-left" size={30} color="#e02e88" />
        </TouchableOpacity>

        <View style={{ gap: 1, alignItems: "center" }}>
          <Text style={styles.headerBigText}>Wor Support</Text>
        </View>

        <Entypo name="phone" size={30} color="#e02e88" />
      </View>

      {/* Messages */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          data={messages}
          keyExtractor={(item, index) => item.timestamp + index} // Ensure uniqueness by appending index
          renderItem={({ item }) => (
            <RecieveText text={item.text} type={item.sender} />
          )}
        />

        {/* Input Section */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message"
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}
          >
            <Entypo name="paper-plane" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
  },
  chatHeader: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  headerSmallText: {
    color: "#757575",
    fontWeight: "bold",
    fontSize: 12,
  },
  headerBigText: {
    color: "#757575",
    fontWeight: "bold",
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  textInput: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  sendButton: {
    backgroundColor: "#e02e88",
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
