import { View, Text, StyleSheet, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { mainImg } from "../../../../Images/ReferAndEarnImages";
import StarRating from "../../../../utiles/StarRating/StarRating";
import { FontAwesome } from "@expo/vector-icons";
import { fonts } from "../../../../fonts/Fonts";
export default function MainCard({ avgRating }) {
  return (
    <LinearGradient
      colors={["#EA4C89", "#f7f7f7"]} // Gradient colors
      start={{ x: 0, y: 0 }} // Gradient start point (top-left)
      end={{ x: 0, y: 1 }} // Gradient end point (bottom-right)
      style={styles.card} // Apply styles
    >
      <View>
        <Text style={styles.heading}>How Your Rating is calculated</Text>
        <Text style={[styles.subText]}>
          We ensure fairness and transparency in every rating.
        </Text>
      </View>

      <View style={styles.secondCard}>
        <View style={{ width: "60%" }}>
          <Text style={[styles.heading, { fontSize: 16 }]}>Your Rating</Text>
          <Text style={[styles.subText]}>
            We use a weighted average of all reviews submitted by users.
          </Text>

          <View style={styles.starCard}>
            <FontAwesome name="star" color={"#FFB200"} size={20} />
            <Text>{avgRating}</Text>
          </View>
        </View>

        <View
          style={{
            width: "40%",
            // backgroundColor: "red",
            alignItems: "center",
          }}
        >
          <Image source={mainImg} style={styles.img} />
          {/* <StarRating rating={5} color="#F9D470" width="70%" /> */}
        </View>
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
    top: -15,
    zIndex: -1,
    // height: 320,
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
    fontSize: 10,
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
