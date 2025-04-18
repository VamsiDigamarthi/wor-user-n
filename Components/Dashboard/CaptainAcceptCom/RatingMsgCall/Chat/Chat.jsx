import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ChatHead from "./ChatHead";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { useSelector } from "react-redux";
import { API, imageUrl } from "../../../../../Constants/url";
import { StatusBar } from "expo-status-bar";
import io from "socket.io-client";
import { useRoute } from "@react-navigation/native";
const Chat = () => {
  const route = useRoute();
  const { token } = useSelector((state) => state.token);
  const { profile } = useSelector((state) => state.profileSlice);
  const socketRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { orderId, captainDetails } = route.params || {};

  const mref = useRef(null);

  const fetchPreviousMessage = async () => {
    console.log(orderId);
    try {
      const response = await API.get(`/support-chat/ride-chat/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(response?.data);
    } catch (error) {
      console.log(error);
      console.log("fetch previous messages failed");
    }
  };

  useEffect(() => {
    socketRef.current = io(`${imageUrl}/ride-chat`);

    fetchPreviousMessage();

    if (orderId) {
      socketRef.current.emit("ride-chat-connected", {
        orderId: orderId,
        userId: profile?._id,
      });
    }
    socketRef.current.off("newMessage");
    socketRef.current.on("newMessage", (message) => {
      console.log("Received message:", message);
      // Append the new message to the messages array
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.disconnect(); // Close the socket connection
    };
  }, [token, orderId]);

  const handleSendMessage = useCallback(() => {
    if (message.trim() === "") return;

    const newMessage = {
      orderId: orderId,
      text: message,
      sender: "user",
      userId: profile._id,
    };

    socketRef.current.emit("message", newMessage);

    // Update the messages array locally with the sent message
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender: "user", timestamp: new Date().toISOString() },
    ]);

    setMessage("");
  }, [message, orderId]);

  // console.log(messages);

  useEffect(() => {
    mref.current.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ChatHead captainDetails={captainDetails} />
      <View style={{ padding: 10, marginBottom: 170 }}>
        <FlatList
          ref={mref}
          data={messages}
          keyExtractor={(item, index) => item.timestamp + index} // Ensure uniqueness by appending index
          renderItem={({ item }) => (
            <ChatMessage text={item.text} type={item.sender} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <ChatInput
        setMessage={setMessage}
        message={message}
        handleSendMessage={handleSendMessage}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
});
