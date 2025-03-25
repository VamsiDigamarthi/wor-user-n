import { Pressable, StyleSheet, Text, View } from "react-native";

import { Ionicons, FontAwesome } from "@expo/vector-icons";

const SupportAudioBox = ({
  handleAudioPreview,
  clearAudio,
  isDisplayCrossIcon = false,
  isPlaying,
  width = "100%",
}) => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.audioContainer, { width }]}>
        <Text style={styles.audioText}>Recorded Audio</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Pressable onPress={handleAudioPreview} style={styles.playButton}>
            <FontAwesome
              name={isPlaying ? "pause-circle" : "play-circle"}
              size={24}
              color="#e02e88"
            />
          </Pressable>
          {isDisplayCrossIcon && (
            <Pressable onPress={clearAudio} style={styles.clearButton}>
              <Ionicons name="close-circle" size={24} color="#000" />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

export default SupportAudioBox;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    width: "100%",
    bottom: 100,
    padding: 10,
  },
  audioContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
  },
  audioText: {
    fontSize: 16,
    color: "#000",
  },
});
