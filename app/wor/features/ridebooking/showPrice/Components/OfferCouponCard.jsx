import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ForwardArrowIcon } from "../../../../Icons/Icons";
import {
  OfferImg,
  WalletImg,
  Cash,
  CreditCard,
  Upi,
} from "../../../../Images/Payment";
import { useSelector } from "react-redux";
import { fonts } from "../../../../fonts/Fonts";

const OfferCouponCard = ({ onOfferPress, onPaymentPress }) => {
  const { paymentMethod } = useSelector((state) => state.allRideDetails);
  const { profile } = useSelector((state) => state.profileSlice);
  return (
    <View style={styles.couponTextCard}>
      <TouchableOpacity style={styles.offersCard} onPress={onOfferPress}>
        <View style={styles.offerInnerCard}>
          <OfferImg height={15} width={15} />
          <Text style={styles.couponText}>Offers</Text>
        </View>
        <ForwardArrowIcon size={15} color="#f98600" />
      </TouchableOpacity>

      <Text style={styles.textLine}></Text>
      <Pressable onPress={onPaymentPress} style={styles.offersCard}>
        <View style={styles.offerInnerCard}>
          {paymentMethod === "wallet" ? (
            <WalletImg height={30} width={30} />
          ) : paymentMethod === "cash" ? (
            <Cash width={30} height={30} />
          ) : paymentMethod === "upi" ? (
            <Upi height={30} width={30} />
          ) : (
            <CreditCard height={30} width={30} />
          )}
          <View style={{ flexDirection: "column" }}>
            <Text style={[styles.couponText, styles.offerText]}>
              {paymentMethod?.charAt(0).toUpperCase() + paymentMethod?.slice(1)}
            </Text>

            {paymentMethod === "wallet" && (
              <Text style={styles.walletBalance}>
                Available Rs. {profile?.userWalletBalance}/-
              </Text>
            )}
          </View>
        </View>
        <ForwardArrowIcon size={14} color="#EA4C89" />
      </Pressable>
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
    fontFamily: fonts.robotoSemiBold,
    color: "#f98600",
    fontSize: 14,
  },

  offerText: {
    color: "#EA4C89",
  },
  offerInnerCard: { flexDirection: "row", gap: 9, alignItems: "center" },
  walletBalance: {
    fontSize: 10,
    color: "gray",
    fontFamily: fonts.robotoRegular,
  },
  textLine: {
    width: 1,
    height: 20,
    backgroundColor: "lightgray",
  },
});
