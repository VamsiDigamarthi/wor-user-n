import * as Clipboard from "expo-clipboard";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CopyBox() {
  const copyToClipboard = (text) => {
    if (text) {
      Clipboard.setStringAsync(text);
      Toast.show({ text1: "Copied to Clipboard", type: "success" });
    } else {
      Toast.show({ text1: "Error", type: "error" });
    }
  };

  return (
    <View style={styles.copyBox}>
      <Text>Invite Your Friends to women rider</Text>
      <TouchableOpacity
        style={styles.copyBtn}
        onPress={() => copyToClipboard("GOWOR")}
      >
        <Text style={{ fontWeight: "bold" }}>Code : GOWOR</Text>
        <MaterialCommunityIcons name="content-copy" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  copyBox: {
    marginTop: 10,
    padding: 10,
    height: 120,
    borderRadius: 20,
    gap: 10,
    justifyContent: "center",
    backgroundColor: "#F2F0F5",
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
