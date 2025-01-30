import { StyleSheet, TouchableOpacity } from "react-native";
import { ImageBackground, Text, View } from "react-native";
import { offerBg } from "../../../../Images/Ride";

export default function OfferCard({ text }) {
  return (
    <View style={styles.cardContainer}>
      <ImageBackground style={styles.card} source={offerBg}>
        {/* Dark overlay */}
        <View style={styles.overlay} />

        <View style={styles.content}>
          <View>
            <Text style={styles.cardHeading}>18% off</Text>
            <Text style={styles.cardSubHeading}>Black Monday</Text>
          </View>
          <TouchableOpacity style={styles.offerBtn}>
            <Text style={{ fontWeight: "bold", color: "#fff" }}>Apply Now</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    overflow: "hidden", // Ensure child elements don't go outside the container
  },
  card: {
    width: "100%",
    height: 100,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Darken effect
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  cardHeading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  cardSubHeading: {
    fontSize: 12,
    color: "#fff",
  },
  offerBtn: {
    backgroundColor: "#EA4C89",
    padding: 10,
    borderRadius: 10,
    zIndex: 255,
  },
});
