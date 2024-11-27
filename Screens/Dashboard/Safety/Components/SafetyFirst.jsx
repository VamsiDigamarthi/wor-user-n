import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../../Constants/colors";

const SafetyFirst = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 19, fontWeight: "600", color: COLORS.heading }}>
        Safety
      </Text>
      <Text style={{ fontSize: 11, color: COLORS.subHeading }}>
        We ensure fairnessand transparency in every rating
      </Text>
    </View>
  );
};

export default SafetyFirst;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff5f9",
    padding: 30,
    gap: 6,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    elevation: 2,
    shadowColor: "red",
  },
});
