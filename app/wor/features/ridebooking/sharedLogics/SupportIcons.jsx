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
      <MaterialIcons name="support-agent" size={15} color="#e02e88" />
      <Text style={styles.supportText}>{rightText}</Text>
    </Pressable>
  );
};

export default SupportIcons;

const styles = StyleSheet.create({
  supportText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.subHeading,
  },
});
