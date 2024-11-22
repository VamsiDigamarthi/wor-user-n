import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import {
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from "@expo/vector-icons";

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
  iconType = "Ionicons",
}) => {
  let Icon;
  switch (iconType) {
    case "Ionicons":
      Icon = Ionicons;
      break;
    case "Entypo":
      Icon = Entypo;
      break;
    case "FontAwesome5":
      Icon = FontAwesome5;
      break;
    case "MaterialCommunityIcons":
      Icon = MaterialCommunityIcons;
      break;
    case "MaterialIcons":
      Icon = MaterialIcons;
      break;
    case "SimpleLineIcons":
      Icon = SimpleLineIcons;
      break;
    case "Zocial":
      Icon = Zocial;
      break;
    case "Octicons":
      Icon = Octicons;
      break;
    case "Feather":
      Icon = Feather;
      break;
    case "EvilIcons":
      Icon = EvilIcons;
      break;
    default:
      Icon = Ionicons;
  }

  return (
    <View style={[styles.container, !isValid && styles.invalidInputCard]}>
      <Text style={[styles.label, !isValid && styles.invalidLabel]}>
        {label}
      </Text>
      <View style={[styles.inputCard]}>
        {isIconsNotText ? <Icon name={icon} size={20} /> : <Text>+91</Text>}
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
    // gap: 4,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 10,
    elevation: 1,

    shadowColor: "red",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  label: {
    fontSize: 8,
    color: "#000",
  },
  invalidLabel: {
    color: "red", // Change label color to red
  },
  inputCard: {
    backgroundColor: "#FFFFFF",

    // height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
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
