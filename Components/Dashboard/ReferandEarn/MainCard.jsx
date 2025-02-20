import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import LinearGradient from "react-native-linear-gradient";

import * as Clipboard from "expo-clipboard";
import mainImg from "../../../assets/images/referalwomen.png";
import { useState } from "react";
export default function MainCard() {
  const [text, setText] = useState("GOWOR");

  const copyToClipboard = () => {
    if (text) {
      Clipboard.setStringAsync(text); // Copies text to clipboard
      // Alert.alert("Copied to Clipboard", text);
    } else {
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <LinearGradient
      colors={["#EA4C89", "#fff5f9"]} // Gradient colors
      start={{ x: 0, y: 0 }} // Gradient start point (top-left)
      end={{ x: 0, y: 1 }} // Gradient end point (bottom-right)
      style={styles.card} // Apply styles
    >
      <View style={{ width: "60%", gap: 10 }}>
        <Text style={styles.mainText}>25% off for you</Text>
        <Text style={styles.mainText}>25% off for them</Text>

        <TouchableOpacity onPress={copyToClipboard} style={styles.copyBtn}>
          <Text style={{ fontWeight: "bold", color: "#000" }}>GOWOR</Text>
          <MaterialCommunityIcons name="content-copy" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <Image source={mainImg} style={styles.image} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    // backgroundColor: "#fff",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    // borderWidth: 1,
    height: 250,
  },

  mainText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },

  copyBtn: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 10,
    width: 120,
    justifyContent: "space-between",
  },

  image: {
    height: 200,
    width: 200,
    resizeMode: "contain",
    // marginTop: 40,
    // marginRight: 10,
    position: "relative",
    right: 60,
  },
});
