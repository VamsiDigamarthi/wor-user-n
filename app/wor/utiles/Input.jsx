import { Animated, StyleSheet, Text, TextInput, View } from "react-native";
import {
  Ionicons,
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
  EvilIcons,
  FontAwesome,
  SimpleLineIcons,
  Octicons,
  Zocial,
} from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";

// Mapping icon type to component
const ICONS = {
  Ionicons,
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
  EvilIcons,
  FontAwesome,
  SimpleLineIcons,
  Octicons,
  Zocial,
};

const Input = ({
  icon,
  isIconsNotText = true,
  keyboardType = "default",
  label = "Enter Mobile Number",
  onChangeText = () => {},
  value = "",
  maxLength = undefined,
  iconType = "Ionicons",
}) => {
  const Icon = ICONS[iconType] || Ionicons; // Default to Ionicons if iconType is invalid
  const [isFocused, setIsFocused] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isFocused || value ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  // Animated styles for label
  const labelStyle = {
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 2],
    }),
    left: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [38, 33],
    }),
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 10],
    }),
    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgb(81, 81, 85)", "#e02e88"],
    }),
  };

  return (
    <View style={[styles.container, isFocused && styles.inputFocused]}>
      {isIconsNotText ? <Icon name={icon} size={20} /> : <Text>+91</Text>}
      <TextInput
        style={styles.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        maxLength={maxLength}
        value={value}
      />
      <Animated.Text style={[styles.placeholder, labelStyle]}>
        {label}
      </Animated.Text>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#b0b0b0",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    position: "relative",
  },
  input: {
    width: "91%",
    height: "100%",
    paddingHorizontal: 5,
    zIndex: 88,
  },
  inputFocused: {
    borderColor: "#e02e88", // Change border color when focused
  },
  placeholder: {
    position: "absolute",
    left: 38,
    top: 19,
    fontSize: 14,
    color: "rgb(81, 81, 85)",
    textTransform: "capitalize",
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    zIndex: 2,
  },
});
