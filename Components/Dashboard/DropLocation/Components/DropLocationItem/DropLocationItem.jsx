import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

import { Ionicons } from "@expo/vector-icons";
import { useDropLocationItemHook } from "./DropLocationItem.hook";

const DropLocationItem = ({
  mainPlace,
  subPlace,
  onPress,
  eachPlace,
  favoriteIconDisplay = true,
}) => {
  const { onAddPlaceToFavoriteHandler } = useDropLocationItemHook();
  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{
          color: "#f7e1ec", // Set ripple color
          borderless: false, // Ensures ripple stays within the bounds of the button
        }}
        style={styles.pressableCard}
        onPress={onPress}
      >
        <View style={styles.first}>
          <Ionicons name="location" size={25} color="#fff" />
        </View>
        <View style={styles.second}>
          <Text style={styles.locText}>{mainPlace}</Text>
          <Text style={styles.subLocText} numberOfLines={1}>
            {subPlace}
          </Text>
        </View>
        {favoriteIconDisplay && (
          <View style={styles.third}>
            <Pressable>
              <Ionicons
                name="heart-outline"
                size={23}
                color="gray"
                style={{ backgroundColor: "#fff" }}
                onPress={() => onAddPlaceToFavoriteHandler(eachPlace)}
              />
            </Pressable>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default DropLocationItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ffe2e6",
  },

  pressableCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    alignItems: "center",
    position: "relative",
    borderBottomWidth: 2,
    borderColor: "#fff",
    paddingVertical: 5,
  },

  first: {
    width: 35,
    height: 35,
    borderRadius: 30,
    backgroundColor: "#E02E88",
    justifyContent: "center",
    alignItems: "center",
  },
  second: {
    width: "90%",
    // gap: 2,
  },
  locText: {
    fontSize: 13,
    fontWeight: "600",
  },
  subLocText: {
    fontSize: 11,
    color: "#666666",
    overflow: "hidden", // Ensure any overflow is hidden
    whiteSpace: "nowrap",
  },
  third: {
    position: "absolute",
    top: 1,
    right: 10,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
