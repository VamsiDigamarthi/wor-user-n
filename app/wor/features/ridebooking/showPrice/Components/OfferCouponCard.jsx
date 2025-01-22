import { Image, StyleSheet, Text, View } from "react-native";
import { ForwardArrowIcon } from "../../../../Icons/Icons";

const OfferCouponCard = () => {
  return (
    <View style={styles.couponTextCard}>
      <View style={styles.offersCard}>
        <View style={{ flexDirection: "row", gap: 9, alignItems: "center" }}>
          <Image
            source={require("../../../../../../assets/offers.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text style={styles.couponText}>Offers</Text>
        </View>
        <ForwardArrowIcon size={20} color="#f98600" />
      </View>

      <Text style={styles.textLine}></Text>
      <View style={styles.offersCard}>
        <View style={{ flexDirection: "row", gap: 9, alignItems: "center" }}>
          <Image
            source={require("../../../../../../assets/images/profile/payment wallet.png")}
            style={{ width: 20, height: 20 }}
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
        <ForwardArrowIcon size={20} color="#e02e88" />
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
    height: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  couponText: {
    fontWeight: "600",
    color: "#f98600",
    fontSize: 18,
  },
});
