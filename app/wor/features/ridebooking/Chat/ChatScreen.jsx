import {
  FlatList,
  StyleSheet,
  Keyboard,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ChatHead from "./ChatHead";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import io from "socket.io-client";
import { useRoute } from "@react-navigation/native";
import { API, imageUrl } from "../../../../../Constants/url";
import { COLORS } from "../../../../../Constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ChatScreen = () => {
  const route = useRoute();
  const { token } = useSelector((state) => state.token);
  const { profile } = useSelector((state) => state.profileSlice);
  const socketRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { orderId, captainDetails, isWorSupport } = route.params || {};

  const mref = useRef(null);

  const insets = useSafeAreaInsets();

  const hasSoftwareNavigationBar = insets.bottom > 0;

  const fetchPreviousMessage = async () => {
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

  // const fetchSupportMessage = async () => {
  //   try {
  //     const response = await API.get("/support-chat", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setMessages(response?.data);
  //   } catch (error) {
  //     console.log("fetch previous messages failed");
  //   }
  // };

  useEffect(() => {
    // isWorSupport
    //   ? (socketRef.current = io(`${imageUrl}/support`))
    //   :
    socketRef.current = io(`${imageUrl}/ride-chat`);

    // isWorSupport ? fetchSupportMessage() :
    fetchPreviousMessage();

    // if (isWorSupport) {
    //   if (profile?._id) {
    //     socketRef.current.emit("join", { userId: profile._id });
    //   }
    // } else {
    if (orderId) {
      socketRef.current.emit("ride-chat-connected", {
        orderId: orderId,
        userId: profile?._id,
        userType: "user",
      });
    }
    // }

    socketRef.current.off("newMessage");
    socketRef.current.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.disconnect(); // Close the socket connection
    };
  }, [token, orderId, profile?._id]);

  const handleSendMessage = useCallback(() => {
    if (message.trim() === "") return;

    let newMessage;
    // if (isWorSupport) {
    //   newMessage = {
    //     userId: profile?._id,
    //     text: message,
    //     sender: "user",
    //   };
    // } else {
    newMessage = {
      orderId: orderId,
      text: message,
      sender: "user",
      userId: profile._id,
    };
    // }

    socketRef.current.emit("message", newMessage);

    // Update the messages array locally with the sent message
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender: "user", timestamp: new Date().toISOString() },
    ]);

    setMessage("");
  }, [message, orderId, profile?._id]);

  // console.log(messages);

  useEffect(() => {
    mref.current.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          {/* <StatusBar style="dark" /> */}

          <ChatHead
            captainDetails={captainDetails}
            isWorSupport={isWorSupport}
          />
          <View style={{ padding: 10, marginBottom: 170 }}>
            <FlatList
              ref={mref}
              data={messages}
              keyExtractor={(item, index) => item.timestamp + index} // Ensure uniqueness by appending index
              renderItem={({ item }) => (
                <ChatMessage
                  text={item.text}
                  type={item.sender}
                  captainProfilePic={captainDetails?.profilePic}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <ChatInput
            setMessage={setMessage}
            message={message}
            handleSendMessage={handleSendMessage}
            hasSoftwareNavigationBar={hasSoftwareNavigationBar}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: COLORS.mainBackgroundColor,
  },
});
