import * as Clipboard from "expo-clipboard";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ImageBackground,
} from "react-native";
import Toast from "react-native-toast-message";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { fonts } from "../fonts/Fonts";
import { CopyBoxImg } from "../Images/Home";
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
    <ImageBackground style={styles.copyBox} source={CopyBoxImg}>
      <Text style={{ fontFamily: fonts.robotoRegular }}>
        Invite Your Friends to women rider
      </Text>
      <TouchableOpacity
        style={styles.copyBtn}
        onPress={() => copyToClipboard("GOWOR")}
      >
        <Text style={{ fontFamily: fonts.robotoBold }}>Code : GOWOR</Text>
        <MaterialCommunityIcons name="content-copy" size={24} color="black" />
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  copyBox: {
    marginTop: 10,
    padding: 10,
    height: 120,
    borderRadius: 20,
    overflow: "hidden",
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
    borderStyle: Platform.OS === "ios" ? "solid" : "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
});
