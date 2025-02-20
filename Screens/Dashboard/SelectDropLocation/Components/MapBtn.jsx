import { Pressable, StyleSheet, Text, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MapBtn = ({ onNavigateToMapPreviewScreen }) => {
  return (
    <View style={styles.mapCard}>
      <Pressable style={styles.innerMap} onPress={onNavigateToMapPreviewScreen}>
        <EvilIcons size={25} name="location" color="#EA4C89" />
        <Text style={styles.text}>Select on Map</Text>
      </Pressable>
    </View>
  );
};

export default MapBtn;

const styles = StyleSheet.create({
  mapCard: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    elevation: 1,
    backgroundColor: "#fff",
    borderTopColor: "#ebedf0",
    borderTopWidth: 1,
  },
  innerMap: {
    gap: 2,
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // elevation: 1,
  },
  text: {
    fontSize: 17,
    color: "#EA4C89",
    fontWeight: "600",
  },
});
