import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

const SettingprofileCardRight = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View style={styles.rightCard}>
      <TouchableOpacity
        style={[
          styles.switchTrack,
          isEnabled ? styles.switchTrackOn : styles.switchTrackOff,
        ]}
        onPress={toggleSwitch}
      >
        <View
          style={[
            styles.switchThumb,
            isEnabled ? styles.switchThumbOn : styles.switchThumbOff,
          ]}
        />
      </TouchableOpacity>
      <Text style={styles.text}>Active</Text>
    </View>
  );
};

export default SettingprofileCardRight;

const styles = StyleSheet.create({
  rightCard: {
    width: "30%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  switchTrack: {
    width: 60,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ddd",
    padding: 3,
    justifyContent: "center",
  },
  switchTrackOn: {
    backgroundColor: "#e02e88",
  },
  switchTrackOff: {
    backgroundColor: "#767577",
  },
  switchThumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#fff",
    margin: 2,
  },
  switchThumbOn: {
    position: "absolute",
    right: 3,
  },
  switchThumbOff: {
    position: "absolute",
    left: 3,
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
  },
});
