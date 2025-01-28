import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from "@expo/vector-icons";
import { fonts } from "../../fonts/Fonts";
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
    case "FontAwesome":
      Icon = FontAwesome;
      break;
    case "Zocial":
      Icon = Zocial;
      break;
    default:
      Icon = Ionicons;
  }

  const [isFocused, setIsFocused] = useState(false);
  console.log(isFocused);

  const inputRef = useRef(null);

  return (
    <TouchableWithoutFeedback onPress={() => inputRef.current.focus()}>
      <View
        style={[
          styles.container,
          // !isValid && styles.invalidInputCard,
          isFocused && { borderColor: "#e02e88" },
        ]}
      >
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
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoCorrect={false}
            ref={inputRef}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#b0b0b0",
  },
  label: {
    fontSize: 12,
    color: "#000",
    fontFamily: fonts.robotoRegular,
  },
  invalidLabel: {
    color: "red", // Change label color to red
  },
  inputCard: {
    backgroundColor: "#FFFFFF",

    height: 40,
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
    fontFamily: fonts.robotoRegular,
  },
});
