import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

const CustomBtn = ({
  title,
  onPress,
  btnColor,
  btnBg,
  width,
  height,
  borderWidth,
  borderColor,
}) => {
  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{
          color: "#E02E88", // Set ripple color
          borderless: false, // Ensures ripple stays within the bounds of the button
        }}
        style={({ pressed }) => [
          styles.pressable, // Keep the style for Pressable button here
          {
            backgroundColor: pressed ? "#f2f2f2" : btnBg, // Optional background change when pressed
            borderWidth: borderWidth, // Apply border width dynamically
            borderColor: borderColor, // Apply border color dynamically
          },
        ]}
        onPress={onPress}
      >
        <Text style={[styles.buttonText, { color: btnColor }]}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default CustomBtn;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    overflow: "hidden",
    borderRadius: 25,
  },
  pressable: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 5,
    width: "100%",
    height: "100%",
    borderRadius: 25, // Ensure the button has rounded corners
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
