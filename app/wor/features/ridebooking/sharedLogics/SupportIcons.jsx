import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../../Constants/colors";

const SupportIcons = ({ navigationText, rightText }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate(navigationText)}
      style={styles.rightIconCard}
    >
      <MaterialIcons
        style={{ marginTop: 10 }}
        name="support-agent"
        size={25}
        color="#fff"
      />
      {rightText && <Text style={styles.supportText}>{rightText}</Text>}
    </Pressable>
  );
};

export default SupportIcons;

const styles = StyleSheet.create({
  rightIconCard: {
    backgroundColor: "#e02e88",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  supportText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.subHeading,
  },
});
