import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

const CustomBtn = ({ title, onPress, btnColor, btnBg, width, height }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.button,
          {
            backgroundColor: btnBg,
            width,
            paddingVertical: height ? height : 8,
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
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 25, // Rounded corners
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 500,
  },
});
