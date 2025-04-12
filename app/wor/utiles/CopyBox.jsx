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
import { useSelector } from "react-redux";
export default function CopyBox() {
  const { profile } = useSelector((state) => state.profileSlice);

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
      {/* Overlay with opacity */}
      <View style={styles.overlay} />

      {/* Foreground content */}
      <View style={styles.content}>
        <Text
          style={{
            fontFamily: fonts.robotoMedium,
            fontSize: 17,
            color: "#e02e88",
          }}
        >
          Invite Your Friends to women rider
        </Text>
        <TouchableOpacity
          style={styles.copyBtn}
          onPress={() => copyToClipboard(profile.ownRefCode)}
        >
          <Text style={{ fontFamily: fonts.robotoBold }}>
            Code : {profile?.ownRefCode}
          </Text>
          <MaterialCommunityIcons name="content-copy" size={24} color="black" />
        </TouchableOpacity>
      </View>
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

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.6)", // White background with 60% opacity
    borderRadius: 20, // match parent radius
  },

  content: {
    flex: 1,
    justifyContent: "center",
    gap: 10,
    padding: 10,
  },
});
