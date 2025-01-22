import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";
const IconButton = ({
  iconsName,
  icons,
  title,
  onPress = () => {},
  isSelected = false,
}) => {
  let Icons;
  switch (iconsName) {
    case "MaterialIcons":
      Icons = MaterialIcons;
      break;
    case "Ionicons":
      Icons = Ionicons;
      break;
    case "Entypo":
      Icons = Entypo;
      break;
    default:
      Icons = Ionicons;
  }
  // console.log(isSelected);
  return (
    <View style={[styles.container]}>
      <Pressable
        android_ripple={{
          color: "#E02E88", // Set ripple color
          borderless: false, // Ensures ripple stays within the bounds of the button
        }}
        style={({ pressed }) => [
          styles.pressable, // Keep the style for Pressable button here
          { backgroundColor: isSelected ? "pink" : "white" }, // Optional background change when pressed
        ]}
        onPress={onPress}
      >
        <Icons name={icons} size={20} color="#E02E88" />
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 10,
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
    borderRadius: 10,
    overflow: "hidden",
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
});
