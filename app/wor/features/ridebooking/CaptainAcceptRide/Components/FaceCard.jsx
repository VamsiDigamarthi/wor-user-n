import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { InfoIcons, UserIcons } from "../../../../Icons/Icons";
import { useSelector } from "react-redux";
import PriceDetailsModal from "../Modals/PriceDetailsModal";

import PaymentModal from "../../showPrice/Modal/PaymentModal";

const FaceCard = () => {
  const { completeRideDetails } = useSelector((state) => state.allRideDetails);
  const { tip, isTipAdded } = useSelector((state) => state.tipSlice);
  const [openPriceModal, setOpenPriceModal] = useState(false);

  const [paymentMethodsModal, setPaymentMethodsModal] = useState(false);

  const changePaymentMethodModal = () => {
    setPaymentMethodsModal(!paymentMethodsModal);
  };

  const handleChangePriceModal = () => {
    setOpenPriceModal(!openPriceModal);
  };

  let totalPrice =
    +completeRideDetails?.price +
    (isTipAdded ? +tip : +completeRideDetails?.addTip) +
    +completeRideDetails?.extraCharge +
    +completeRideDetails?.changeDesPrice;

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#222222",
            borderRadius: 20,
          }}
        >
          <UserIcons size={20} color="#fff" />
        </View>
        <View style={styles.fireCard}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Total Fare *</Text>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Text style={{ fontWeight: "600", fontSize: 15 }}>
              ₹{totalPrice}
            </Text>
            <Pressable onPress={handleChangePriceModal}>
              <InfoIcons size={14} color="gray" />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text>
              Payment Mode :{" "}
              <Text style={{ fontSize: 14, fontWeight: "600" }}>
                {completeRideDetails?.paymentMethod?.toUpperCase()}
              </Text>
            </Text>
            <Pressable onPress={changePaymentMethodModal}>
              <Text style={{ color: "#EA4C89", fontWeight: "500" }}>
                Change
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <PriceDetailsModal
        handleChangePriceModal={handleChangePriceModal}
        openPriceModal={openPriceModal}
        totalPrice={totalPrice}
        tip={isTipAdded ? tip : completeRideDetails?.addTip}
      />
      <PaymentModal
        onClose={() => changePaymentMethodModal(!paymentMethodsModal)}
        paymentMethodsModal={paymentMethodsModal}
        isRideBookingScreen={true}
      />
    </>
  );
};

export default FaceCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 10,
  },
  fireCard: {
    width: "85%",
    gap: 3,
  },
});
