import { StyleSheet, Text, View } from "react-native";
import { SupportIcons } from "../../Icons/icons";

const SupportIcon = () => {
  return (
    <View style={styles.container}>
      <SupportIcons size={20} color="black" />
      <Text>Support</Text>
    </View>
  );
};

export default SupportIcon;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 40,
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
