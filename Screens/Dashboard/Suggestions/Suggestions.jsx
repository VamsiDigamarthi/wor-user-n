import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import CustomeAppbar from "../../../Utils/CustomeAppbar/CustomeAppbar";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import { API } from "../../../Constants/url";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

export default function Suggestions() {
  const navigation = useNavigation();

  const [text, setText] = useState("");

  async function SendData() {
    // const data = await API.post("/suggestion", {
    //   data: text,
    // });

    setText("");

    Toast.show({
      text1: "Your Suggestion reached to us, Thank You !",
      position: "bottom",
    });

    // console.log("Pressed");
  }

  return (
    <View style={styles.container}>
      <CustomeAppbar title="Suggestions" onBack={() => navigation.goBack()} />
      <View style={{ flex: 1 }}>
        <Text style={styles.mainText}>Suggest To Wor</Text>

        <TextInput
          style={styles.textInput}
          placeholder="Write your Suggestions"
          placeholderTextColor="#a9a9a9"
          value={text}
          onChangeText={setText}
          multiline
          textAlignVertical="top" // Ensures the text starts at the top
        />

        <View style={styles.sendButton}>
          <CustomBtn
            title="send"
            onPress={() => {
              SendData();
            }}
            btnColor={text ? "#fff" : "#e02e88"}
            btnBg={text ? "#e02e88" : "#fff"}
            borderColor={!text && "#e02e88"}
            borderWidth={1}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    gap: 15,
  },
  mainText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#fff5f9",
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  sendButton: {
    position: "absolute", // Position the button
    bottom: 20, // Set the distance from the bottom
    width: "100%",
    // left: 10,
  },
});
