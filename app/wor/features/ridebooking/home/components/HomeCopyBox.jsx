import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HomeCopyBox = ({ backgroundColor = "#F2F0F5" }) => {
  return (
    <View style={[styles.copyBox, { backgroundColor }]}>
      <Text>Invite Your Friends to women rider</Text>
      <TouchableOpacity style={styles.copyBtn}>
        <Text style={{ fontWeight: "bold" }}>Code : GOWOR</Text>
        <MaterialCommunityIcons name="content-copy" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeCopyBox;

const styles = StyleSheet.create({
  copyBox: {
    marginTop: 10,
    padding: 10,
    height: 120,
    borderRadius: 20,
    gap: 10,
    // alignItems: "center",
    justifyContent: "center",
  },
  copyBtn: {
    flexDirection: "row",
    gap: 10,
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    width: 160,
    borderStyle: "dashed",
  },
});
