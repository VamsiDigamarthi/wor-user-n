import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons"; // Importing icons

import fakcecallimg from "../../assets/images/fakecallicon.png";

export default function AcceptedCall({ name, mobile, handleReject }) {
  const [callTime, setCallTime] = useState(0); // Track call duration
  const [isMuted, setIsMuted] = useState(false); // Track mute status

  const toggleMute = () => {
    setIsMuted(!isMuted);
    console.log(isMuted ? "Unmuted" : "Muted");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCallTime((prevTime) => prevTime + 1); // Increment call time
    }, 1000);

    return () => clearInterval(timer); // Clear timer on component unmount
  }, []);

  const renderButton = (icon, label, onPress, isActive) => (
    <View>
      <TouchableOpacity
        style={[styles.button, isActive && styles.activeButton]}
        onPress={onPress}
      >
        {icon}
      </TouchableOpacity>
      <Text style={styles.buttonLabel}>{label}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.callStatus}>Call Ongoing</Text>

      <Image source={fakcecallimg} style={styles.callerImage} />

      <Text style={styles.callerName}>{name}</Text>
      <Text style={styles.callStatus}>{mobile}</Text>
      <Text style={styles.callTimer}>{formatTime(callTime)}</Text>

      <View style={styles.buttonsContainer}>
        {/* First Row */}
        <View style={styles.buttonRow}>
          {renderButton(
            <Ionicons name="mic-outline" size={30} color="white" />, // Mic icon
            "Mute",
            toggleMute,
            isMuted
          )}
          {renderButton(
            <MaterialIcons name="video-call" size={30} color="white" />, // Video icon
            "Video",
            () => console.log("Video pressed"),
            false
          )}
          {renderButton(
            <Ionicons name="add" size={30} color="white" />, // Add call icon
            "Add Call",
            () => console.log("Add Call pressed"),
            false
          )}
        </View>

        {/* Second Row */}
        <View style={styles.buttonRow}>
          {renderButton(
            <Ionicons name="recording-outline" size={30} color="white" />, // Record icon
            "Record",
            () => console.log("Record pressed"),
            false
          )}
          {renderButton(
            <FontAwesome name="volume-up" size={30} color="white" />, // Speaker icon
            "Speaker",
            () => console.log("Speaker pressed"),
            false
          )}
          {renderButton(
            <MaterialIcons name="dialpad" size={30} color="white" />, // Dialpad icon
            "Dialpad",
            () => console.log("Dialpad pressed"),
            false
          )}
        </View>
      </View>

      {/* Reject Button */}
      <TouchableOpacity style={styles.declineButton} onPress={handleReject}>
        <Ionicons name="call-outline" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    width: "100%",
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
  callTimer: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonsContainer: {
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    // width: "100%",
    marginBottom: 20,
    gap: 40,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    width: 70,
    height: 70,
  },
  activeButton: {
    backgroundColor: "#007bff",
  },
  buttonLabel: {
    color: "white",
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },
  declineButton: {
    backgroundColor: "red",
    padding: 20,
    marginTop: 20,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    position: "absolute",
    bottom: 50,
  },
});
