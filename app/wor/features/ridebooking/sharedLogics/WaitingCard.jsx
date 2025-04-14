import { View, Text, StyleSheet, AppState } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackgroundTimer from "react-native-background-timer";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

export default function WaitingCard() {
  const { completeRideDetails } = useSelector((state) => state.allRideDetails);
  const [timeLeft, setTimeLeft] = useState(180);
  const [timeAfter3Mins, setTimeAfter3Mins] = useState(0);
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const initializeTimer = async () => {
      const savedOrderId = await AsyncStorage.getItem("orderId");

      if (savedOrderId !== completeRideDetails?._id) {
        await AsyncStorage.multiRemove(["startTime", "timeAfter3Mins"]);
        await AsyncStorage.setItem("orderId", completeRideDetails?._id);
        await AsyncStorage.setItem("startTime", Date.now().toString());
        setTimeLeft(180);
        setTimeAfter3Mins(0);
        return;
      }

      const savedStartTime = await AsyncStorage.getItem("startTime");
      const savedExtraTime = await AsyncStorage.getItem("timeAfter3Mins");

      if (savedStartTime) {
        const elapsed = Math.floor(
          (Date.now() - parseInt(savedStartTime)) / 1000
        );
        if (elapsed < 180) {
          setTimeLeft(180 - elapsed);
        } else {
          setTimeLeft(0);
          setTimeAfter3Mins(
            (savedExtraTime ? parseInt(savedExtraTime) : 0) + (elapsed - 180)
          );
        }
      }
    };

    initializeTimer();
  }, [completeRideDetails?._id]);

  useEffect(() => {
    const timerId = BackgroundTimer.setInterval(async () => {
      const savedStartTime = await AsyncStorage.getItem("startTime");
      if (!savedStartTime) return;

      const elapsed = Math.floor(
        (Date.now() - parseInt(savedStartTime)) / 1000
      );
      if (elapsed < 180) {
        setTimeLeft(180 - elapsed);
        setTimeAfter3Mins(0);
      } else {
        setTimeLeft(0);
        setTimeAfter3Mins(elapsed - 180);
        await AsyncStorage.setItem(
          "timeAfter3Mins",
          (elapsed - 180).toString()
        );
      }
    }, 1000);

    return () => BackgroundTimer.clearInterval(timerId);
  }, []);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        const savedStartTime = await AsyncStorage.getItem("startTime");
        if (!savedStartTime) return;

        const elapsed = Math.floor(
          (Date.now() - parseInt(savedStartTime)) / 1000
        );
        if (elapsed < 180) {
          setTimeLeft(180 - elapsed);
          setTimeAfter3Mins(0);
        } else {
          setTimeLeft(0);
          setTimeAfter3Mins(elapsed - 180);
        }
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => subscription.remove();
  }, [appState]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <>
      <Ionicons size={24} name="timer" color={!timeLeft ? "red" : "green"} />
      <View style={styles.card}>
        {timeLeft > 0 && (
          <Text style={styles.timetext}>{formatTime(timeLeft)}</Text>
        )}
        {timeLeft === 0 && timeAfter3Mins > 0 && (
          <View style={styles.extraCharge}>
            <Text style={styles.timetext}>{formatTime(timeAfter3Mins)}</Text>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    // padding: 10,
    alignItems: "center",
  },
  timetext: {
    fontSize: 10,
    fontWeight: "600",
    color: "#000",
  },
  extraCharge: {
    // marginTop: 10,
  },
});
