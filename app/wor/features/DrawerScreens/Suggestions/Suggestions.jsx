import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
// import CustomeAppbar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";

import CustomeAppbar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";
import CustomBtn from "../../../utiles/CustomBtn";

export default function Suggestions() {
  const navigation = useNavigation();

  const [text, setText] = useState("");

  async function SendData() {
    setText("");

    Toast.show({
      text1: "Your Suggestion reached to us, Thank You !",
      position: "bottom",
    });

    // console.log("Pressed");
  }

  return (
     <KeyboardAvoidingView
        style={{flex:1}}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust for iOS and Android
        
      >
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    <View style={{ flex: 1 }}>
      <CustomeAppbar title="Suggestions" onBack={() => navigation.goBack()} />
      <View style={styles.container}>
        <Text style={styles.mainText}>Suggest To Wor</Text>

        <TextInput
          style={styles.textInput}
          placeholder="Write your Suggestions"
          placeholderTextColor="#a9a9a9"
          value={text}
          onChangeText={setText}
          maxLength={500}
          multiline
          textAlignVertical="top" // Ensures the text starts at the top
        />

        <Text
          style={{
            textAlign: "right",
          }}
        >
          {text.length} / 500 Charecters
        </Text>

        <View style={styles.sendButton}>
          <CustomBtn
            title="send"
            onPress={() => {
              SendData();
            }}
            btnColor={text ? "#fff" : "#EA4C89"}
            btnBg={text ? "#EA4C89" : "#fff"}
            borderColor={!text && "#EA4C89"}
            borderWidth={1}
          />
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    left: 10,
  },
});
