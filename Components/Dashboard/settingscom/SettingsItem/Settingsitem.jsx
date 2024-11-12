import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome,
  AntDesign,
  Octicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Settingsitem = ({
  iconType = "MaterialIcons",
  iconName,
  label,
  screenName,
  displayIcon = true,
  onPress,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress(); // Call the custom onPress function if provided
    } else if (screenName) {
      navigation.navigate(screenName); // Otherwise, navigate to the screen
    }
  };
  let Icon;
  switch (iconType) {
    case "MaterialIcons":
      Icon = MaterialIcons;
      break;
    case "Ionicons":
      Icon = Ionicons;
      break;
    case "FontAwesome":
      Icon = FontAwesome;
      break;
    case "AntDesign":
      Icon = AntDesign;
      break;
    case "Octicons":
      Icon = Octicons;
      break;
    default:
      Icon = MaterialIcons;
  }
  return (
    <Pressable onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.left}>
          {displayIcon && ( // this condition using  about screen
            <View style={styles.circle}>
              <Icon name={iconName} size={24} color="#e02e88" />
            </View>
          )}
          <Text style={styles.text}>{label}</Text>
        </View>
        <MaterialIcons name="arrow-forward-ios" size={20} color="#e02e88" />
      </View>
    </Pressable>
  );
};

export default Settingsitem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBlockColor: "#ffe2e6",
    marginBottom: 10,
  },
  left: {
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  circle: {
    width: 45,
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000000",
  },
});
