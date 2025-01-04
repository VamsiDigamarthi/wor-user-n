import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

import fakcecallimg from "../../assets/images/fakecallicon.png";
import { Ionicons } from "@expo/vector-icons"; // Importing icons

export default function IncomingCall({
  name,
  mobile,
  handleAnswer,
  handleReject,
}) {
  return (
    <View style={styles.callScreen}>
      <Image source={fakcecallimg} style={styles.callerImage} />
      <Text style={styles.callStatus}>Incoming Call from</Text>
      <Text style={styles.callerName}>{name}</Text>
      <Text style={styles.callStatus}>{mobile}</Text>

      <View style={styles.buttons}>
        {/* Decline Button */}
        <TouchableOpacity style={styles.declineButton} onPress={handleReject}>
          <Ionicons name="call-outline" size={30} color="white" />
        </TouchableOpacity>

        {/* Answer Button */}
        <TouchableOpacity style={styles.answerButton} onPress={handleAnswer}>
          <Ionicons name="call" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  callScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  callerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  callerName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  callStatus: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 20,
  },
  declineButton: {
    backgroundColor: "red",
    padding: 20,
    margin: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  answerButton: {
    backgroundColor: "green",
    padding: 20,
    margin: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    marginTop: 20,
    position: "absolute",
    bottom: 30,
    justifyContent: "space-between",
    width: "80%",
  },
});
