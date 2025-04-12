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
import { mainImg } from "../../../../Images/ReferAndEarnImages";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { fonts } from "../../../../fonts/Fonts";
export default function MainCard({ refCode }) {
  const [text, setText] = useState("GOWOR");

  const copyToClipboard = () => {
    if (text) {
      Clipboard.setStringAsync(text);
      Alert.alert("Copied to Clipboard", text);
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
      <View style={styles.innerCard}>
        <Text style={styles.mainText}>25% off for you</Text>
        <Text style={styles.mainText}>25% off for them</Text>

        <TouchableOpacity onPress={copyToClipboard} style={styles.copyBtn}>
          <Text style={{ fontFamily: fonts.robotoSemiBold }}>{refCode}</Text>
          <MaterialCommunityIcons name="content-copy" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <Image source={mainImg} style={styles.image} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    // borderRadius: 10,
    height: 250,
    position: "relative",
    zIndex: -1,
    top: -18,
  },

  mainText: {
    color: "#fff",
    fontSize: 14,
    // fontWeight: "bold",
    fontFamily: fonts.robotoSemiBold,
  },

  copyBtn: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 10,
    width: 120,
    justifyContent: "space-between",
    alignItems: "center",
  },

  image: {
    height: 200,
    width: 200,
    resizeMode: "contain",
    // marginTop: 40,
    // marginRight: 10,
    position: "relative",
    right: 60,
    top: 10,
  },

  innerCard: {
    width: "60%",
    gap: 10,
    position: "relative",
    top: 50,
  },
});
