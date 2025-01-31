import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ForwardArrowIcon } from "../../../../Icons/Icons";
import {
  OfferImg,
  WalletImg,
  Cash,
  CreditCard,
  Upi,
} from "../../../../Images/Payment";

const OfferCouponCard = ({
  onOfferPress,
  onPaymentPress,
  paymentMethod,
  walletBalance,
}) => {
  return (
    <View style={styles.couponTextCard}>
      <TouchableOpacity style={styles.offersCard} onPress={onOfferPress}>
        <View style={{ flexDirection: "row", gap: 9, alignItems: "center" }}>
          {/* <Image
            source={require("../../../../../../assets/offers.png")}
            style={{ width: 15, height: 15 }}
          /> */}

          <OfferImg height={15} width={15} />
          <Text style={styles.couponText}>Offers</Text>
        </View>
        <ForwardArrowIcon size={15} color="#f98600" />
      </TouchableOpacity>

      <Text style={styles.textLine}></Text>
      <View style={styles.offersCard}>
        <View style={{ flexDirection: "row", gap: 9, alignItems: "center" }}>
          {/* <Image
            source={require("../../../../../../assets/images/profile/payment wallet.png")}
            style={{ width: 15, height: 15 }}
          /> */}

          {paymentMethod === "wallet" ? (
            <WalletImg height={30} width={30} />
          ) : paymentMethod === "cash" ? (
            <Cash width={30} height={30} />
          ) : paymentMethod === "upi" ? (
            <Upi height={30} width={30} />
          ) : (
            <CreditCard height={30} width={30} />
          )}
          <TouchableOpacity
            style={{ flexDirection: "column" }}
            onPress={onPaymentPress}
          >
            <Text
              style={[styles.couponText, { color: "#e02e88", fontSize: 14 }]}
            >
              {paymentMethod?.charAt(0).toUpperCase() + paymentMethod?.slice(1)}
            </Text>
            <Text style={{ fontSize: 10, color: "gray" }}>
              Available Rs. {walletBalance?.toString()}/-
            </Text>
          </TouchableOpacity>
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
