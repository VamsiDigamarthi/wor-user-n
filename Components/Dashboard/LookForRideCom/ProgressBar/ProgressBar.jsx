import React, { useEffect, useRef, useState } from "react";
import { View, Animated, StyleSheet, Text } from "react-native";

const ProgressBar = () => {
  const [isAccepted, setIsAccepted] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 100,
      duration: 10000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (!isAccepted && finished) {
        console.log("Ride not accepted, go back.");
      }
    });
  }, [isAccepted, progress]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Waiting for captain to accept the ride...</Text>
      <View style={styles.progressBarContainer}>
        <View style={styles.grayBar} />
        <Animated.View style={[styles.pinkBar, { width: progressWidth }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
  },
  progressBarContainer: {
    width: "100%",
    height: 10,
    flexDirection: "row",
    backgroundColor: "#ccc", // Gray color for the background
    borderRadius: 10,
    overflow: "hidden",
  },
  grayBar: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "gray", // Initial gray bar
  },
  pinkBar: {
    height: "100%",
    backgroundColor: "#E02E88", // Pink progress bar
  },
});

export default ProgressBar;
