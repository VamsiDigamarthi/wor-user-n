import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ProfileRatingRideCountCard = () => {
  return (
    <View style={styles.constainer}>
      <View style={styles.singleCard}>
        <Text style={styles.text}>4.9</Text>
        <FontAwesome name="star" size={20} color="#000" />
      </View>
      <View style={styles.singleCardNew}>
        <Text style={styles.text}>168 Rides</Text>
        <FontAwesome name="soccer-ball-o" size={20} color="#000" />
      </View>
      <View style={styles.singleCardThird}>
        <Text style={styles.text}>20 Days</Text>
        <FontAwesome name="calendar" size={20} color="#000" />
      </View>
    </View>
  );
};

export default ProfileRatingRideCountCard;

const styles = StyleSheet.create({
  constainer: {
    borderBottomColor: "#e02e88",
    borderBottomWidth: 1,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 5,
  },
  singleCard: {
    width: "30%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRightColor: "#e02e88",
    borderRightWidth: 1,
  },
  singleCardNew: {
    width: "40%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRightColor: "#e02e88",
    borderRightWidth: 1,
  },
  singleCardThird: {
    width: "30%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
  },
});
