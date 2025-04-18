import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
const IconButton = ({ iconsName, icons, title, onPress = () => {} }) => {
  let Icons;
  switch (iconsName) {
    case "MaterialIcons":
      Icons = MaterialIcons;
      break;
    case "Ionicons":
      Icons = Ionicons;
      break;
    default:
      Icons = Ionicons;
  }
  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{
          color: "#EA4C89", // Set ripple color
          borderless: false, // Ensures ripple stays within the bounds of the button
        }}
        style={({ pressed }) => [
          styles.pressable, // Keep the style for Pressable button here
          { backgroundColor: pressed ? "#f2f2f2" : "white" }, // Optional background change when pressed
        ]}
        onPress={onPress}
      >
        <Icons name={icons} size={20} color="#EA4C89" />
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 5,
    width: "100%",
    height: "100%",
  },
  container: {
    width: 135,
    height: 40,
    borderWidth: 1,
    borderColor: "#ffe2e6",
    borderRadius: 30,
    overflow: "hidden",
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
});
