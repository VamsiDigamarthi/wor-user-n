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
  isValid = true,
  value = "",
  maxLength = undefined,
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, !isValid && styles.invalidLabel]}>
        {label}
      </Text>
      <View style={[styles.inputCard, !isValid && styles.invalidInputCard]}>
        {isIconsNotText ? <Ionicons name={icon} size={20} /> : <Text>+91</Text>}
        <TextInput
          style={styles.textInput}
          keyboardType={keyboardType}
          placeholder={placeholder}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          value={value}
          maxLength={maxLength}
        />
      </View>
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    gap: 4,
  },
  label: {
    fontSize: 11,
    color: "#000",
  },
  invalidLabel: {
    color: "red", // Change label color to red
  },
  inputCard: {
    elevation: 1,
    backgroundColor: "#FFFFFF",
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
  invalidInputCard: {
    borderWidth: 1,
    borderColor: "red", // Change border color to red
  },
  textInput: {
    width: "90%",
    padding: 0,
  },
});
