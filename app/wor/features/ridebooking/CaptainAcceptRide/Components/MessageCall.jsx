import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { CallIcon } from "../../../../Icons/Icons";
import { useNavigation } from "@react-navigation/native";

const MessageCall = ({ orderId, captainDetails }) => {
  const navigation = useNavigation();
  const handleNavigateChatScreen = () => {
    navigation.navigate("Chat", { orderId, captainDetails });
  };
  return (
    <View style={styles.container}>
      <Pressable style={styles.message} onPress={handleNavigateChatScreen}>
        <Text style={{ fontSize: 15, color: "gray" }}>
          Message to {captainDetails?.name}
        </Text>
      </Pressable>
      <Pressable style={styles.call}>
        <CallIcon size={22} color="#e02e88" />
      </Pressable>
    </View>
  );
};

export default MessageCall;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  message: {
    width: "80%",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e02e88",
  },
  call: {
    width: "15%",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ea4c89",
    justifyContent: "center",
    alignItems: "center",
  },
});
