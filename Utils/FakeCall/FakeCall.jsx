import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";
import Sound from "react-native-sound";
import { Ionicons } from "@expo/vector-icons"; // Importing icons
import { useFocusEffect } from "@react-navigation/native";
import IncomingCall from "./IncomingCall";
import AcceptedCall from "./AcceptedCall";

// Enable playback in silent mode
Sound.setCategory("Playback");

const FakeCall = ({ route, navigation }) => {
  const { mobile, name } = route.params;
  const [ringtone, setRingtone] = useState(null);
  const [callOngoing, setCallOngoing] = useState(false); // Track call state
  const [callTime, setCallTime] = useState(0); // Track call duration
  const [isMuted, setIsMuted] = useState(false); // Track mute status

  useEffect(() => {
    if (!callOngoing) {
      // Load a system sound (e.g., default ringtone on Android)
      const whoosh = new Sound("sound.mp3", Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log("Failed to load sound", error);
          return;
        }
        whoosh.setNumberOfLoops(-1); // Loop indefinitely
        whoosh.play((success) => {
          if (!success) {
            console.log("Playback failed due to audio decoding errors");
          }
        });

        setRingtone(whoosh);
      });
    }

    // Clean up the sound when the component unmounts
    return () => {
      if (ringtone) {
        ringtone.stop(() => ringtone.release());
      }
    };
  }, [callOngoing]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (ringtone) {
          ringtone.stop(() => ringtone.release());
        }
      };
    }, [ringtone])
  );

  const handleAnswer = () => {
    if (ringtone) {
      ringtone.stop(() => ringtone.release());
    }
    setCallOngoing(true); // Switch to call ongoing state
    setCallTime(0); // Reset call timer
  };

  const handleReject = () => {
    console.log("Call Ended");
    if (ringtone) {
      ringtone.stop(() => ringtone.release());
    }
    navigation.goBack(); // Navigate back after ending the call
  };

  useEffect(() => {
    let timer;
    if (callOngoing) {
      timer = setInterval(() => {
        setCallTime((prevTime) => prevTime + 1); // Increment call time
      }, 1000);
    }
    return () => clearInterval(timer); // Clear timer on component unmount
  }, [callOngoing]);

  return (
    <>
      <StatusBar barStyle={"light-content"} />

      {callOngoing ? (
        <AcceptedCall name={name} mobile={mobile} handleReject={handleReject} />
      ) : (
        <IncomingCall
          name={name}
          mobile={mobile}
          handleAnswer={handleAnswer}
          handleReject={handleReject}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default FakeCall;
