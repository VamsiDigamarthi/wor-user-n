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
      <View style={styles.singleCard}>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={styles.text}>20 Days</Text>
          {/* <FontAwesome name="soccer-ball-o" size={20} color="#000" /> */}
        </View>
        <Text style={styles.ratingNewText}>Since Member</Text>
      </View>
      <View style={styles.singleCard}>
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
    // borderBottomWidth: 1,
    // paddingVertical: 5,
    // flexDirection: "row",
    // justifyContent: "space-around",
    // alignItems: "center",
    gap: 15,
    // paddingBottom: 20,
  },
  singleCard: {
    // width: "30%",
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    // borderRightColor: "#e02e88",
    // borderRightWidth: 1,
    gap: 5,
  },

  text: {
    fontSize: 12,
    fontWeight: "600",
  },
  ratingNewText: {
    fontSize: 12,
    // fontWeight: "600",
  },
});
