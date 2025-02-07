import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../../Constants/colors";

const SupportIcons = ({ navigationText, rightText }) => {
  const navigation = useNavigation();
  
  const openDrivingSchool = () => {
    const url = "https://drivingschools.nuhvin.com/register"; // Replace with your desired URL
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };
  return (
    <Pressable
      // onPress={() => navigation.navigate(navigationText)}
      onPress={openDrivingSchool}
      style={styles.rightIconCard}
    >
      <Ionicons
        // style={{ marginTop: 1 }}
        name="add-circle-outline"
        size={25}
        color="#0080ff"
      />
      {rightText && <Text style={styles.supportText}>{rightText}</Text>}
    </Pressable>
  );
};

export default SupportIcons;

const styles = StyleSheet.create({
  rightIconCard: {
    backgroundColor: COLORS.inputBackGround,
    // width: 40,
    width: 120,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 3,
  },
  supportText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.subHeading,
  },
});
