import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";

export default function WaitingCard() {
  const { completeRideDetails } = useSelector((state) => state.allRideDetails);
  const [timeLeft, setTimeLeft] = useState(180); // 180 seconds = 3 minutes
  const [timeAfter3Mins, setTimeAfter3Mins] = useState(0); // Timer after 3 minutes

  const dispatch = useDispatch();

  // Initialize timer and load data
  useEffect(() => {
    const initializeTimer = async () => {
      const savedOrderId = await AsyncStorage.getItem("orderId");

      // If the orderId has changed, reset the timer
      if (savedOrderId !== completeRideDetails?._id) {
        await AsyncStorage.multiRemove([
          "timeLeft",
          "timeAfter3Mins",
          "timestamp",
        ]);
        await AsyncStorage.setItem("orderId", completeRideDetails?._id);
        setTimeLeft(180);
        setTimeAfter3Mins(0);
        return;
      }

      // Load saved data for the current orderId
      const savedTimeLeft = await AsyncStorage.getItem("timeLeft");
      const savedTimestamp = await AsyncStorage.getItem("timestamp");
      const savedExtraTime = await AsyncStorage.getItem("timeAfter3Mins");

      if (savedTimeLeft && savedTimestamp) {
        const elapsed = Math.floor((Date.now() - parseInt(savedTimestamp)) / 1000);

        if (parseInt(savedTimeLeft) - elapsed > 0) {
          // Still in the first 3 minutes
          setTimeLeft(parseInt(savedTimeLeft) - elapsed);
        } else {
          // First 3 minutes are over
          setTimeLeft(0);
          setTimeAfter3Mins(
            savedExtraTime
              ? Math.floor(parseInt(savedExtraTime) + (elapsed - parseInt(savedTimeLeft)))
              : Math.floor(elapsed - parseInt(savedTimeLeft))
          );
        }
      }
    };

    initializeTimer();
  }, [completeRideDetails?._id]);

  // Handle timer updates and extra charge increments
  useEffect(() => {
    const updateTimeAndCharge = async () => {
      const savedTimestamp = await AsyncStorage.getItem("timestamp");
      const savedTimeLeft = await AsyncStorage.getItem("timeLeft");
      const savedTimeAfter3Mins = await AsyncStorage.getItem("timeAfter3Mins");

      const now = Date.now();

      if (savedTimestamp) {
        const elapsedTime = Math.floor((now - parseInt(savedTimestamp)) / 1000);

        let remainingTime = parseInt(savedTimeLeft) || 0;
        let extraTime = parseInt(savedTimeAfter3Mins) || 0;

        if (remainingTime > 0) {
          if (remainingTime - elapsedTime > 0) {
            setTimeLeft(remainingTime - elapsedTime);
          } else {
            setTimeLeft(0);
            extraTime += Math.floor(elapsedTime - remainingTime); // Round extra time to whole seconds
            setTimeAfter3Mins(extraTime);
          }
        } else {
          extraTime += Math.floor(elapsedTime); // Round extra time to whole seconds
          setTimeAfter3Mins(extraTime);
        }

        await AsyncStorage.setItem("timeAfter3Mins", extraTime.toString());
        await AsyncStorage.setItem("timestamp", now.toString());
      }
    };

    updateTimeAndCharge();

    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => {
          const updatedTime = prevTime - 1;
          AsyncStorage.setItem("timeLeft", updatedTime.toString());
          AsyncStorage.setItem("timestamp", Date.now().toString());
          return updatedTime;
        });
      }, 1000);

      return () => clearInterval(timerId);
    } else {
      const extraTimerId = setInterval(() => {
        setTimeAfter3Mins((prevTime) => {
          const updatedTime = prevTime + 1;
          AsyncStorage.setItem("timeAfter3Mins", updatedTime.toString());
          AsyncStorage.setItem("timestamp", Date.now().toString());
          return updatedTime;
        });
      }, 1000);

      return () => clearInterval(extraTimerId);
    }
  }, [timeLeft]);

  // Format time for display
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const displayedTime = timeLeft > 0 ? formatTime(timeLeft) : null;
  const after3MinsDisplayedTime = timeAfter3Mins > 0 ? formatTime(timeAfter3Mins) : null;

  return (
    <View style={styles.card}>
      {displayedTime && <Text style={styles.timetext}>{displayedTime}</Text>}
      {timeLeft === 0 && (
        <View style={styles.extrCahrS}>
          <Text style={styles.timetext}>{after3MinsDisplayedTime}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    // width: 40,
  },
  timetext: {
    fontSize: 10,
    fontWeight: "600",
    color: "#000",
  },
  extrCahrS: {
    height: 40,
    alignItems: "center",
  },
});
