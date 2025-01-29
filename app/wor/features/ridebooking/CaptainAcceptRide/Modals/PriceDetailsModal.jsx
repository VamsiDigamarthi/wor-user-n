import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalUI from "../../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../../Components/InfoUi/Styles/InfoModalStyles";
import { useSelector } from "react-redux";
import CustomBtn from "../../../../utiles/CustomBtn";

const PriceDetailsModal = ({
  openPriceModal,
  handleChangePriceModal,
  totalPrice,
}) => {
  const { completeRideDetails } = useSelector((state) => state.allRideDetails);
  return (
    <ModalUI
      openCloseState={openPriceModal}
      closeModalFun={handleChangePriceModal}
      style={infoModalStyles.aadharModalStyles}
      insideCardStyle={infoModalStyles.insideCardStyle}
      closebtn={false}
    >
      <View style={styles.container}>
        <View style={styles.first}>
          <View style={styles.firstSubCard}>
            <Text style={styles.mainHeading}>
              {completeRideDetails.vehicleType?.charAt(0)?.toUpperCase() +
                completeRideDetails.vehicleType?.slice(1)}
            </Text>
            <Text>
              A regular comfortable hatchback that becomes your everyday ride
            </Text>
          </View>
        </View>
        <View style={styles.second}>
          <WalletFriendly />
          <WalletFriendly text="Wallet Friendly" />
          <WalletFriendly text="Cashless Rides" />
        </View>
        <View style={styles.priceCard}>
          <View style={styles.priceFirst}>
            <View style={{ gap: 2 }}>
              <Text style={{ fontSize: 17, fontWeight: "600" }}>
                Total Details
              </Text>
              <Text style={{ fontSize: 14, color: "gray" }}>Including Tax</Text>
            </View>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#e02e88" }}>
              ₹{totalPrice}
            </Text>
          </View>
          <View style={styles.priceSecond}>
            <Text style={{ fontSize: 17, fontWeight: "600" }}>Your Tip</Text>
            <Text>
              ₹
              {completeRideDetails?.addTip === 0
                ? 0
                : completeRideDetails?.addTip}
            </Text>
          </View>
          <Text style={{ fontSize: 14, color: "gray" }}>
            Total fare may change if toll, route or destination changes or if
            your ride takes longer due to traffic or other factors.
          </Text>
          <Text style={{ fontSize: 14, color: "gray" }}>
            You may be charged a Cancellation fee of ₹50, if a trip is canceled
            after 3 (three) minutes or later from the time of acceptance of
            booking by the Driver or if the driver cancels after reaching your
            location and waiting for 5 minutes.
          </Text>
        </View>
        <CustomBtn
          title="Okay, Got it"
          btnBg="#f7f7f7"
          btnColor="#000"
          onPress={handleChangePriceModal}
        />
      </View>
    </ModalUI>
  );
};

export default PriceDetailsModal;

const WalletFriendly = ({ text = "Comfy Hatch" }) => (
  <View style={styles.wallerFriendly}>
    <Image
      style={{ width: 30, height: 30, resizeMode: "contain" }}
      source={require("../../../../../../assets/dummyWallet.png")}
    />
    <Text style={{ fontSize: 14, fontWeight: "600", color: "gray" }}>
      {text}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    gap: 10,
    width: "100%",
  },
  first: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    borderStyle: "dashed",
    width: "100%",
    // backgroundColor: "red",
    paddingBottom: 10,
  },
  mainHeading: {
    fontSize: 24,
    fontWeight: "600",
  },
  firstSubCard: {
    width: "80%",
    gap: 4,
  },
  wallerFriendly: {
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
  },
  second: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceCard: {
    padding: 15,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
    gap: 10,
  },
  priceFirst: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  priceSecond: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});
