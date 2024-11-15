import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ProfileRatingRideCountCard = () => {
  return (
    <View style={styles.constainer}>
      <View style={styles.singleCard}>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={styles.text}>4.9</Text>
          <FontAwesome name="star" size={20} color="#000" />
        </View>
        <Text style={styles.ratingNewText}>Rating</Text>
      </View>
      <View style={styles.singleCardNew}>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={styles.text}>168 Rides</Text>
          <FontAwesome name="soccer-ball-o" size={20} color="#000" />
        </View>
        <Text style={styles.ratingNewText}>Rideing</Text>
      </View>
      <View style={styles.singleCardThird}>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={styles.text}>₹ 20</Text>
          {/* <FontAwesome name="calendar" size={20} color="#000" /> */}
        </View>
        <Text style={styles.ratingNewText}>Wallet</Text>
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
    paddingBottom: 20,
  },
  singleCard: {
    width: "30%",
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRightColor: "#e02e88",
    borderRightWidth: 1,
    gap: 5,
  },
  singleCardNew: {
    width: "40%",
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRightColor: "#e02e88",
    borderRightWidth: 1,
  },
  singleCardThird: {
    width: "30%",
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
  },
  ratingNewText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
