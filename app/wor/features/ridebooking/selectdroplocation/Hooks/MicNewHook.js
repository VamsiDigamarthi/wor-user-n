import { useState, useEffect } from "react";
import { Alert, Platform } from "react-native";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import Voice from "@react-native-community/voice";

export const useNewMicHook = ({
  setMicVoiceText,
  setIsMicModalOpenClose,
  isMicModalOpenClose,
}) => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!isMicModalOpenClose && isListening) {
      stopListening();
    }
  }, [isMicModalOpenClose]);

  // Function to handle microphone permissions
  const requestMicrophonePermission = async () => {
    try {
      const permissionStatus = await check(
        Platform.OS === "android"
          ? PERMISSIONS.ANDROID.RECORD_AUDIO
          : PERMISSIONS.IOS.MICROPHONE
      );
      if (permissionStatus === RESULTS.GRANTED) {
        return true;
      }
      if (permissionStatus === RESULTS.DENIED) {
        const requestStatus = await request(
          Platform.OS === "android"
            ? PERMISSIONS.ANDROID.RECORD_AUDIO
            : PERMISSIONS.IOS.MICROPHONE
        );
        return requestStatus === RESULTS.GRANTED;
      }
      if (permissionStatus === RESULTS.UNAVAILABLE) {
        Alert.alert(
          "Permission Unavailable",
          "Microphone permission is unavailable on this device."
        );
        return false;
      }
      if (permissionStatus === RESULTS.BLOCKED) {
        Alert.alert(
          "Permission Blocked",
          "You have blocked microphone access. Please enable it in Settings."
        );
        return false;
      }
    } catch (error) {
      console.error("Error requesting microphone permission:", error);
      Alert.alert("Error", "Failed to request microphone permission.");
      return false;
    }
  };

  // Set up Voice event listeners
  useEffect(() => {
    const onSpeechStartHandler = () => {
      setIsListening(true);
    };

    let timeoutId; // To track the timeout for delayed stopping
    const onSpeechEndHandler = () => {
      timeoutId = setTimeout(() => {
        setIsListening(false);
      }, 2000); // Wait 2 seconds before stopping
    };

    const onSpeechResultsHandler = (event) => {
      if (event.value && event.value.length > 0) {
        setMicVoiceText(event.value[0]); // Update the recognized text
      }
    };

    const onSpeechErrorHandler = (event) => {
      Alert.alert("Something Went Wrong", "Your voice is not captured");
      setIsListening(false);
    };

    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    Voice.onSpeechError = onSpeechErrorHandler;

    return () => {
      clearTimeout(timeoutId); // Clear any pending timeouts
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    try {
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) return;
      setIsListening(true);
      await Voice.start("en-US"); // Start listening with English language
    } catch (error) {
      console.error("Error starting speech recognition:", error);
      Alert.alert("Error", "Failed to start speech recognition.");
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop(); // Stop listening
      setIsListening(false);
      console.log("Stopped listening manually"); // Debugging
    } catch (error) {
      console.error("Error stopping speech recognition:", error);
    }
  };

  const handleMicPress = async () => {
    if (isListening) {
      await stopListening();
    } else {
      await startListening();
    }
  };

  return {
    handleMicPress,
    isListening,
    stopListening,
  };
};
