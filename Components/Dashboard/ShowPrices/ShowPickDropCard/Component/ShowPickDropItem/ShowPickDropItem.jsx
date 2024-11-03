import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const ShowPickDropItem = ({ icons, location, border, time }) => {
  return (
    <View style={[styles.constainer, border]}>
      <Ionicons name={icons} size={25} color="#E02E88" />
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.locationText}>
        {location}
      </Text>
      {time && (
        <View style={styles.timeCard}>
          <Ionicons name="time-outline" size={18} color="#E02E88" />
          <Text style={styles.timeText}>Time</Text>
        </View>
      )}
    </View>
  );
};

export default ShowPickDropItem;

const styles = StyleSheet.create({
  constainer: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: "center",
    gap: 10,
    flexDirection: "row",
    // overflow: "hidden",
  },
  locationText: {
    flex: 1, // Allow the text to take up available space
  },
  timeCard: {
    width: 70,
    backgroundColor: "#fff5f9",
    borderWidth: 1,
    borderColor: "#f5f3f2",
    position: "absolute",
    bottom: -14,
    right: 5,
    zIndex: 23,
    padding: 2,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  timeText: {
    fontSize: 12,
  },
});
