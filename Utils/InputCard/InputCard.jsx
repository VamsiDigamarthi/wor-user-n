import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const InputBox = ({
  label,
  isIconsNotText = true,
  icon,
  keyboardType = "default",
  placeholder = "",
  secureTextEntry = false,
  onChangeText = () => {},
  multiline = false, // New prop
  numberOfLines = 1,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputCard}>
        {isIconsNotText ? <Ionicons name={icon} size={20} /> : <Text>+91</Text>}
        <TextInput
          style={styles.textInput}
          keyboardType={keyboardType}
          placeholder={placeholder}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry} // Use secureTextEntry prop
          multiline={multiline} // Pass the multiline prop
          numberOfLines={numberOfLines}
        />
      </View>
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  container: {
    width: "100%", // Full width
    flexDirection: "column", // Flex column direction
    gap: 4, // Equivalent to gap-1 (you may need to manage the gap manually)
  },
  label: {
    fontSize: 11, // Font size equivalent to text-[11px]
    color: "#A0AEC0", // Gray color for text (equivalent to gray-600)
  },
  inputCard: {
    elevation: 1,
    backgroundColor: "#FFFFFF", // White background
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: "#000",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textInput: {
    width: "90%", // Set the width to 90%
    padding: 0, // Remove default padding
  },
});
