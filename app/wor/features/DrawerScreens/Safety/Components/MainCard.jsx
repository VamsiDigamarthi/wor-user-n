import { View, Text, StyleSheet, Image, Platform } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { fonts } from "../../../../fonts/Fonts";
export default function MainCard({}) {
  return (
    <LinearGradient
      colors={["#EA4C89", "#fff"]} // Gradient colors
      start={{ x: 0, y: 0 }} // Gradient start point (top-left)
      end={{ x: 0, y: 1 }} // Gradient end point (bottom-right)
      style={styles.card} // Apply styles
    >
      <View>
        <Text style={styles.heading}>Safety All The Way</Text>
        <Text style={[styles.subText, { fontSize: 14 , lineHeight:20}]}>
          At women rider, your safety comes first. Here are some measures and
          provisions to ensure your safety, every time
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    // flexDirection: "row",
    // justifyContent: "space-between",
    position: "relative",
    top: Platform.OS === "android" ? -30 : -40,
    zIndex: -1,
    height: 220,
    paddingTop: 35,
  },

  heading: {
    // fontWeight: "bold",
    fontFamily: fonts.robotoSemiBold,
    fontSize: 20,
    color: "#fff",
  },

  subText: {
    color: "#000",
    fontFamily: fonts.robotoRegular,
  },

  secondCard: {
    // marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  img: {
    height: 150,
    width: 150,
    resizeMode: "contain",
  },
  starCard: {
    flexDirection: "row",
    padding: 2,
    width: 80,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "dashed",
    borderRadius: 10,
    marginTop: 10,
  },
});
