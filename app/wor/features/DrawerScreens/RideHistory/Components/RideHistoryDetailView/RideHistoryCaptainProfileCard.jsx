import { StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { COLORS } from "../../../../../../../Constants/colors";
import StarRating from "../../../../../utiles/StarRating/StarRating";

const RideHistoryCaptainProfileCard = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.profileCard}>
          <View style={styles.profileBikeCard}></View>
        </View>
        <View style={{ gap: 2 }}>
          <Text style={styles.maiheading}>Dharani</Text>
          <Text style={styles.subHeading}>TS09GF7687</Text>
        </View>
        <View style={{ gap: 2 }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Entypo name="star" size={20} color="#e02e88" />
            <Text style={styles.subHeading}>5.0</Text>
          </View>
          <Text style={styles.subHeading}>Active 5G</Text>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 13 }}>Your Rated</Text>
        <StarRating rating={2} />
      </View>
    </View>
  );
};

export default RideHistoryCaptainProfileCard;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    gap: 10,
  },
  container: {
    width: "100%",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    flexWrap: "wrap",
  },
  profileCard: {
    width: 50,
    height: 50,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#e02e88",
    position: "relative",
  },
  profileBikeCard: {
    width: 20,
    height: 20,
    borderRadius: 15,
    backgroundColor: "#e02e88",
    position: "absolute",
    bottom: -2,
    right: -5,
    zIndex: 2,
  },
  maiheading: {
    fontSize: 13,
    color: COLORS.heading,
    fontWeight: "600",
  },
  subHeading: {
    fontSize: 10,
    color: COLORS.subHeading,
  },
});
