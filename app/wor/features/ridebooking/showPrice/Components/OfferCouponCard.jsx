import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ForwardArrowIcon } from "../../../../Icons/Icons";

const OfferCouponCard = ({ onOfferPress }) => {
  return (
    <View style={styles.couponTextCard}>
      <TouchableOpacity style={styles.offersCard} onPress={onOfferPress}>
        <View style={{ flexDirection: "row", gap: 9, alignItems: "center" }}>
          <Image
            source={require("../../../../../../assets/offers.png")}
            style={{ width: 15, height: 15 }}
          />
          <Text style={styles.couponText}>Offers</Text>
        </View>
        <ForwardArrowIcon size={15} color="#f98600" />
      </TouchableOpacity>

      <Text style={styles.textLine}></Text>
      <View style={styles.offersCard}>
        <View style={{ flexDirection: "row", gap: 9, alignItems: "center" }}>
          <Image
            source={require("../../../../../../assets/images/profile/payment wallet.png")}
            style={{ width: 15, height: 15 }}
          />
          <View style={{ flexDirection: "column" }}>
            <Text
              style={[styles.couponText, { color: "#e02e88", fontSize: 14 }]}
            >
              Wor Wallet
            </Text>
            <Text style={{ fontSize: 10, color: "gray" }}>
              Available Rs. 120/-
            </Text>
          </View>
        </View>
        <ForwardArrowIcon size={14} color="#e02e88" />
      </View>
    </View>
  );
};

export default OfferCouponCard;

const styles = StyleSheet.create({
  couponTextCard: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 7,
  },
  offersCard: {
    width: "45%",
    // backgroundColor: "red",
    height: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  couponText: {
    fontWeight: "600",
    color: "#f98600",
    fontSize: 14,
  },
});
