import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import LinearGradient from "react-native-linear-gradient";
import { mainImg } from "../../../../Images/ReferAndEarnImages";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { fonts } from "../../../../fonts/Fonts";
import { AntDesign } from "@expo/vector-icons";

export default function MainCard({ refCode, onClickInfo }) {
  const [text, setText] = useState(refCode);

  const copyToClipboard = () => {
    if (text) {
      Clipboard.setStringAsync(text);
      // Alert.alert("Copied to Clipboard", text);
    } else {
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <LinearGradient
      colors={["#e02e88", "#fff5f9"]} // Gradient colors
      start={{ x: 0, y: 0 }} // Gradient start point (top-left)
      end={{ x: 0, y: 1 }} // Gradient end point (bottom-right)
      style={styles.card} // Apply styles
    >
      <View style={styles.innerCard}>
        <View>
          <Text style={styles.bigText}>Refer and Earn ₹ 100</Text>
          <Text style={styles.mainText}>
            Refer 10 Users and Earn ₹ 100 In your Wallet
          </Text>
        </View>

        <TouchableOpacity onPress={copyToClipboard} style={styles.copyBtn}>
          <Text style={{ fontWeight: "bold", color: "#000" }}>{refCode}</Text>
          <MaterialCommunityIcons name="content-copy" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.termsBtn} onPress={onClickInfo}>
          <Text style={styles.termsText}>Terms of Refer and Earn</Text>
          <AntDesign name="infocirlceo" size={14} color="#FFF" />
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
    height:  270,
    position: "relative",
    zIndex: -1,
    top: Platform.OS === "android" ? -15 : -34,
  },

  mainText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  copyBtn: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 10,
    width: 140,
    justifyContent: "space-evenly",
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
    top: 30,
  },
  bigText: {
    fontSize: 22,
    color: "#FFF",
    fontWeight: "bold",
  },

  termsBtn: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  termsText: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
});
