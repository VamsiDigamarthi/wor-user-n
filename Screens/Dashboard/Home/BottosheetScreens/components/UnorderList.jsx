import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function UnorderList({ instructions }) {
  return (
    <View style={styles.list}>
      {instructions.map((item, index) => (
        <View key={index} style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 10,
    marginLeft: 8,
  },

  listItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
