import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";

const ParSendReceiveCard = ({ selectedCard, setSelectedCard }) => {
  const sendBackground = useRef(new Animated.Value(0)).current; // Animation for send card
  const receiveBackground = useRef(new Animated.Value(1)).current; // Animation for receive card

  // Trigger animation based on the selected card
  useEffect(() => {
    if (selectedCard === "send") {
      Animated.timing(sendBackground, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      Animated.timing(receiveBackground, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(sendBackground, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
      Animated.timing(receiveBackground, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [selectedCard, sendBackground, receiveBackground]);

  // Interpolate background and text color based on animation values
  const sendBackgroundColor = sendBackground.interpolate({
    inputRange: [0, 1],
    outputRange: ["#e02e88", "#f7f7f7"],
  });
  const sendTextColor = sendBackground.interpolate({
    inputRange: [0, 1],
    outputRange: ["white", "#757575"],
  });

  const receiveBackgroundColor = receiveBackground.interpolate({
    inputRange: [0, 1],
    outputRange: ["#e02e88", "#f7f7f7"],
  });
  const receiveTextColor = receiveBackground.interpolate({
    inputRange: [0, 1],
    outputRange: ["white", "#757575"],
  });

  return (
    <View style={styles.container}>
      {/* Send Card */}
      <TouchableOpacity
        onPress={() => setSelectedCard("send")}
        style={styles.touchableArea}
      >
        <Animated.View
          style={[styles.textCard, { backgroundColor: sendBackgroundColor }]}
        >
          <Animated.Text style={[styles.text, { color: sendTextColor }]}>
            I'm Send
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>

      {/* Receive Card */}
      <TouchableOpacity
        onPress={() => setSelectedCard("receive")}
        style={styles.touchableArea}
      >
        <Animated.View
          style={[styles.textCard, { backgroundColor: receiveBackgroundColor }]}
        >
          <Animated.Text style={[styles.text, { color: receiveTextColor }]}>
            I'm Receive
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default ParSendReceiveCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    elevation: 2,
    backgroundColor: "#fff",
    borderRadius: 13,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 10,
  },
  touchableArea: {
    width: "45%",
  },
  textCard: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
