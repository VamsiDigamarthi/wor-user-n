import { StyleSheet, Text, View, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { fonts } from "../../../../../fonts/Fonts";

import star from "../../../../../../../assets/profileicons/star.png";
import { useSelector } from "react-redux";

const ProfileRatingRideCountCard = () => {
  const { profile } = useSelector((state) => state.profileSlice);

  return (
    <View style={styles.constainer}>
      <View style={styles.singleCard}>
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <Text style={styles.text}>{profile?.averageRating?.toFixed(1)}</Text>
          <Image source={star} style={{ height: 20, width: 20 }} />
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
          <Text style={styles.text}>₹ {profile?.userWalletBalance}</Text>
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
    borderBottomColor: "#EA4C89",
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
    // borderRightColor: "#EA4C89",
    // borderRightWidth: 1,
    gap: 5,
  },

  text: {
    fontSize: 12,
    // fontWeight: "600",
    fontFamily: fonts.robotoSemiBold,
  },
  ratingNewText: {
    fontSize: 12,
    // fontWeight: "600",
    fontFamily: fonts.robotoRegular,
  },
});
