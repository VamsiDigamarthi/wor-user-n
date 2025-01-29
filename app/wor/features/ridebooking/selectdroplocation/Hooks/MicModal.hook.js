import { useEffect, useState } from "react";
import { Alert } from "react-native";
import Voice from "@react-native-voice/voice";
export const useMicModalHook = ({
  setMicVoiceText,
  setIsMicModalOpenClose,
}) => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = () => {
    setIsListening(true);
  };

  const onSpeechResults = (e) => {
    if (e.value && e.value.length > 0) {
      setMicVoiceText(e.value[0]);
      setIsMicModalOpenClose(false);
    }
    setIsListening(false);
  };

  // const onSpeechResults = (e) => {
  //   if (e.value && e.value.length > 0) {
  //     setMicVoiceText(e.value.join(" ")); // Update text dynamically
  //   }
  // };

  const onSpeechError = (e) => {
    console.error(e);
    Alert.alert("Error", "Speech recognition error");
    setIsListening(false);
  };

  const startListening = async () => {
    try {
      setIsListening(true);
      await Voice.start("en-US");
    } catch (e) {
      console.error(e);
    }
  };

  const stopListening = async () => {
    try {
      setIsListening(false);
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const handleMicPress = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return {
    handleMicPress,
    isListening,
  };
};
