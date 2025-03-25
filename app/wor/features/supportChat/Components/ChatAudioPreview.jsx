import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import { Ionicons, FontAwesome } from "@expo/vector-icons";

import AudioRecorderPlayer from "react-native-audio-recorder-player";

const audioRecorderPlayer = new AudioRecorderPlayer();

const ChatAudioPreview = ({ chatAudio }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePreviewAudioFromChat = async () => {
    if (isPlaying) {
      await audioRecorderPlayer.stopPlayer();
      setIsPlaying(false);
    } else {
      await audioRecorderPlayer.startPlayer(chatAudio);
      setIsPlaying(true);

      // Listen for when playback completes
      audioRecorderPlayer.addPlayBackListener((e) => {
        if (e.currentPosition === e.duration) {
          setIsPlaying(false);
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerCard}>
        <Text style={styles.audioText}>Recorded Audio</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Pressable
            onPress={handlePreviewAudioFromChat}
            style={styles.playButton}
          >
            <FontAwesome
              name={isPlaying ? "pause-circle" : "play-circle"}
              size={24}
              color="#e02e88"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ChatAudioPreview;

const styles = StyleSheet.create({
  container: {
    width: "70%",
  },
  innerCard: {
    maxWidth: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    gap: 10,
  },
  audioText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
});
