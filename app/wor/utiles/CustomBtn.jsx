import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { fonts } from "../fonts/Fonts";

const CustomBtn = ({
  title,
  onPress,
  btnColor,
  btnBg,
  width = "100%",
  height = 50,
  borderWidth,
  isLoding = false,
  borderColor,
  disabled = false,
}) => {
  return (
    <View style={[styles.container, { width: width, height: height }]}>
      <Pressable
        disabled={disabled}
        android_ripple={{
          color: "#EA4C89", // Set ripple color
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
        {isLoding ? (
          <ActivityIndicator color={isLoding ? "#fff" : "#EA4C89"} size={30} />
        ) : (
          <Text style={[styles.buttonText, { color: btnColor }]}>{title}</Text>
        )}
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
    borderRadius: 15,
  },
  pressable: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 5,
    width: "100%",
    height: "100%",
    borderRadius: 15, // Ensure the button has rounded corners
  },
  buttonText: {
    fontSize: 16,
    // fontWeight: "500",
    fontFamily: fonts.robotoMedium,
  },
});
