import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import axios from "axios";
import { launchImageLibrary } from "react-native-image-picker";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome! Choose an option:",
      options: ["Option 1", "Option 2", "Option 3", "Upload Image"],
    },
  ]);
  const [chatHistory, setChatHistory] = useState([]);

  const handleOptionSelect = async (option) => {
    let newMessages = [
      ...chatHistory,
      { text: `You selected: ${option}`, user: true },
    ];

    if (option === "Upload Image") {
      launchImageLibrary({ mediaType: "photo" }, (response) => {
        if (response.assets && response.assets.length > 0) {
          newMessages.push({ image: response.assets[0].uri, user: true });
          setChatHistory([...newMessages]);
        }
      });
    } else if (option === "Option 1") {
      // Example API call
      try {
        const response = await axios.get("https://api.example.com/data");
        newMessages.push({ text: response.data.message, user: false });
      } catch (error) {
        newMessages.push({ text: "Failed to fetch data!", user: false });
      }
    } else {
      newMessages.push({ text: `Bot response to ${option}`, user: false });
    }

    // Add new options dynamically
    let newOptions =
      option === "Option 1"
        ? ["Sub-option A", "Sub-option B"]
        : ["New Option 1", "New Option 2"];
    newMessages.push({ options: newOptions });

    setChatHistory([...newMessages]);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={[...messages, ...chatHistory]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          item.image ? (
            <Image
              source={{ uri: item.image }}
              style={{ width: 100, height: 100, marginVertical: 5 }}
            />
          ) : (
            <Text
              style={{
                padding: 10,
                backgroundColor: item.user ? "#d1e7ff" : "#f0f0f0",
                marginVertical: 5,
              }}
            >
              {item.text}
            </Text>
          )
        }
      />
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
        {(chatHistory.length > 0
          ? chatHistory[chatHistory.length - 1].options
          : messages[0].options
        ).map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleOptionSelect(option)}
            style={{
              backgroundColor: "#007bff",
              padding: 10,
              margin: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "#fff" }}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ChatBot;
