import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import SettingprofileCardRight from "./Components/SettingprofileCardRight";
import SettingprofileCardLeft from "./Components/SettingprofileCardLeft";

const SettingProfileCard = () => {
  return (
    <View style={styles.container}>
      <SettingprofileCardLeft />
      <SettingprofileCardRight />
    </View>
  );
};

export default SettingProfileCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ffe2e8",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});
