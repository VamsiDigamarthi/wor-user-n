import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setIsSendOrReceiveParcel } from "../../ridebooking/sharedLogics/rideDetailsSlice";
import { fonts } from "../../../fonts/Fonts";

const ParSendReceiveCard = () => {
  const dispatch = useDispatch();
  const { isSendOrReceiveParcel } = useSelector(
    (state) => state.allRideDetails
  );
  const sendBackground = useRef(new Animated.Value(0)).current;
  const receiveBackground = useRef(new Animated.Value(1)).current;

  // Trigger animation based on the selected card
  useEffect(() => {
    if (isSendOrReceiveParcel === "send") {
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
  }, [isSendOrReceiveParcel, sendBackground, receiveBackground]);

  // Interpolate background and text color based on animation values
  const sendBackgroundColor = sendBackground.interpolate({
    inputRange: [0, 1],
    outputRange: ["#EA4C89", "#f7f7f7"],
  });
  const sendTextColor = sendBackground.interpolate({
    inputRange: [0, 1],
    outputRange: ["white", "#757575"],
  });

  const receiveBackgroundColor = receiveBackground.interpolate({
    inputRange: [0, 1],
    outputRange: ["#EA4C89", "#f7f7f7"],
  });
  const receiveTextColor = receiveBackground.interpolate({
    inputRange: [0, 1],
    outputRange: ["white", "#757575"],
  });

  const onSelectParcelType = (type) => {
    dispatch(setIsSendOrReceiveParcel(type));
  };

  return (
    <View style={styles.container}>
      {/* Send Card */}
      <TouchableOpacity
        onPress={() => onSelectParcelType("send")}
        style={styles.touchableArea}
      >
        <Animated.View
          style={[styles.textCard, { backgroundColor: sendBackgroundColor }]}
        >
          <Animated.Text style={[styles.text, { color: sendTextColor }]}>
            I'm Sending
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>

      {/* Receive Card */}
      <TouchableOpacity
        onPress={() => onSelectParcelType("receive")}
        style={styles.touchableArea}
      >
        <Animated.View
          style={[styles.textCard, { backgroundColor: receiveBackgroundColor }]}
        >
          <Animated.Text style={[styles.text, { color: receiveTextColor }]}>
            I'm Receiving
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
    elevation: 1,
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
    fontFamily: fonts.robotoSemiBold,
    // fontWeight: "600",
  },
});
