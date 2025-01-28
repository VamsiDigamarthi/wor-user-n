import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const AProductFromNuhvin = () => {
  const openLink = () => {
    const url = "https://nuhvin.com"; // Replace with your desired URL
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };
  return (
    <View style={styles.nuhvinProduct}>
      <Text style={{ fontSize: 14, fontWeight: "500" }}>A Product From</Text>
      <Pressable onPress={openLink}>
        <Text style={{ fontSize: 14, fontWeight: "500", color: "#e02e88" }}>
          Visit NuHvin
        </Text>
      </Pressable>
    </View>
  );
};

export default AProductFromNuhvin;

const styles = StyleSheet.create({
  nuhvinProduct: {
    position: "absolute",
    width: "100%",
    height: 40,
    backgroundColor: "#b0b0b0",
    bottom: 0,
    left: 0,
    zIndex: 10000,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
