import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setBaseCharges,
  setDuration,
  setPaymentMethod,
  setPlatFormValue,
  setPrice,
  setRandomExtraCharge,
  setSelectVehicleType,
  setSurgeValue,
  setTimeFareValue,
} from "../../sharedLogics/rideDetailsSlice";
import { fonts } from "../../../../fonts/Fonts";
import ShowPriceDetailsModal from "../Modal/ShowPriceDetailsModal";

const DisplayVehicle = ({ vehicle }) => {
  const dispatch = useDispatch();
  const {
    selectedVehicleType,
    paymentMethod,
    randomExtraChrgesWithVehicle,

    baseFareSet,
    timeFareValueSet,
    setPlatFormValueSet,
    surgeValueSet,
    distanceFareSet,
  } = useSelector((state) => state.allRideDetails);
  const { profile } = useSelector((state) => state.profileSlice);

  const [openPriceDetailsModal, setOpenPriceDetailsModal] = useState(false);

  const handlePriceDetailsModal = () => {
    setOpenPriceDetailsModal(!openPriceDetailsModal);
  };

  const [lastPress, setLastPress] = useState(0);
  const DOUBLE_PRESS_DELAY = 300; // 300ms for double press detection

  const getDestinationTime = (durationInMinutes) => {
    const now = new Date();
    const destinationTime = new Date(now.getTime() + durationInMinutes * 60000);

    let hours = destinationTime.getHours();
    const minutes = destinationTime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${formattedMinutes} ${ampm}`;
  };

  const handelSelectVehicle = () => {
    let price =
      paymentMethod === "wallet" && vehicle?.price <= profile?.userWalletBalance
        ? +vehicle?.price - 2
        : vehicle?.price;
    let duration = vehicle?.duration;

    dispatch(setSelectVehicleType(vehicle?.vehicleType?.toLowerCase()));

    if (vehicle.vehicleType === "bookany") {
      let splitPrice = vehicle.price?.split("-");
      price =
        paymentMethod === "wallet" &&
        vehicle?.price <= profile?.userWalletBalance
          ? +splitPrice[1] - 2
          : splitPrice[1];
    }

    let baseFare = baseFareSet[vehicle?.vehicleType];

    let timeFare = timeFareValueSet[vehicle?.vehicleType];
    let platformFare = setPlatFormValueSet[vehicle?.vehicleType];

    let surFare = surgeValueSet[vehicle?.vehicleType];

    let distaceFare = distanceFareSet[vehicle?.vehicleType];

    if (vehicle.vehicleType === "bookany") {
      baseFare = baseFareSet["wor-premium"];
      timeFare = timeFareValueSet["wor-premium"];
      platformFare = setPlatFormValueSet["wor-premium"];
      surFare = surgeValueSet["wor-premium"];
      distaceFare = distanceFareSet["wor-premium"];
    }

    dispatch(setPrice(price));
    dispatch(setDuration(duration));
    dispatch(
      setRandomExtraCharge(randomExtraChrgesWithVehicle[vehicle?.vehicleType])
    );

    dispatch(setBaseCharges(baseFare));
    dispatch(setTimeFareValue(timeFare));
    dispatch(setPlatFormValue(platformFare));
    dispatch(setSurgeValue(surFare));

    let paymentMethod =
      +price >= +profile?.userWalletBalance ? "cash" : "wallet";
    dispatch(setPaymentMethod(paymentMethod));

    console.log("baseFareSet", baseFareSet);
    console.log("timeFareValueSet", timeFareValueSet);
    console.log("setPlatFormValueSet", setPlatFormValueSet);
    console.log("surgeValueSet", surgeValueSet);
    console.log("distanceFare", distanceFareSet);
  };

  const handleDoublePress = () => {
    handlePriceDetailsModal();
  };

  const handlePress = () => {
    const time = new Date().getTime();
    const delta = time - lastPress;

    delta < DOUBLE_PRESS_DELAY ? handleDoublePress() : handelSelectVehicle();

    setLastPress(time);
  };

  return (
    <>
      <Pressable
        style={[
          styles.pressContainer,
          // { backgroundColor: "red" },
          vehicle?.vehicleType?.toLowerCase() ===
            selectedVehicleType?.toLowerCase() && styles.pressedContainer,
        ]}
        onPress={handlePress} // Using handlePress to detect double press
      >
        <View style={[styles.container]}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              // backgroundColor: "yellow",
              width: "82%",
            }}
          >
            <Image style={styles.image} source={vehicle?.image} />
            <View style={styles.textCard}>
              <View style={styles.textWithPersonCard}>
                <Text style={styles.vehicleType}>{vehicle?.displayName}</Text>
                {vehicle?.isDisplayFastTag && <FastCard />}
                {vehicle?.vehicleType?.toLowerCase() ===
                  selectedVehicleType && (
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
                    <Fontisto name="female" size={13} color="black" />
                    <Text style={{ fontSize: 13, color: "black" }}>
                      {vehicle?.personCount}
                    </Text>
                  </View>
                )}
              </View>
              <Text
                style={[
                  styles.captionText,
                  { fontSize: 13, color: "#888", fontWeight: "600" },
                ]}
              >
                {vehicle?.duration} Minutes away drop{" "}
                {getDestinationTime(vehicle?.duration)}
              </Text>
              {vehicle?.isDisplayBeatTheTraffic && (
                <Text style={styles.captionText}>
                  Beat the traffic & Pay less
                </Text>
              )}
            </View>
          </View>
          <View>
            <Text style={styles.price}>
              ₹
              {paymentMethod === "wallet"
                ? vehicle?.displayName === "Book Any"
                  ? `${+vehicle?.price?.split("-")?.[0] - 2}- ${
                      +vehicle?.price?.split("-")?.[1] - 2
                    }`
                  : +vehicle?.price - 2
                : vehicle?.price}
            </Text>
            {vehicle?.displayName === "Book Any" ? (
              <>
                {+vehicle?.price?.split("-")?.[1] <=
                  profile?.userWalletBalance &&
                  paymentMethod === "wallet" && (
                    <Text style={[styles.priceStrike]}>
                      {vehicle?.discountPrice}
                    </Text>
                  )}
              </>
            ) : (
              <>
                {paymentMethod === "wallet" &&
                  vehicle?.price <= profile?.userWalletBalance && (
                    <Text style={[styles.priceStrike]}>
                      {vehicle?.discountPrice}
                    </Text>
                  )}
              </>
            )}
          </View>
        </View>
      </Pressable>
      {/* price details modal */}
      <ShowPriceDetailsModal
        closeCancelModal={handlePriceDetailsModal}
        openCancelModal={openPriceDetailsModal}
        vehicleType={vehicle?.vehicleType?.toLowerCase()}
        price={vehicle?.price}
      />
    </>
  );
};

export default DisplayVehicle;

const FastCard = () => (
  <View
    style={{
      width: 55,
      height: 15,
      backgroundColor: "#dcfce7",
      justifyContent: "space-around",
      alignItems: "center",
      borderRadius: 3,
      flexDirection: "row",
    }}
  >
    <MaterialCommunityIcons
      style={{ marginTop: 2 }}
      size={13}
      color="#000"
      name="lightning-bolt-outline"
    />
    <Text style={{ fontSize: 11, fontWeight: "600" }}>Faster</Text>
  </View>
);

const styles = StyleSheet.create({
  pressContainer: {
    width: "100%",
    height: 78,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  pressedContainer: {
    height: 78,
    width: "100%",
    borderWidth: 1,
    borderColor: "#EA4C89",
    backgroundColor: "#ffedf4",
  },

  container: {
    width: "100%",
    borderRadius: 8,
    paddingHorizontal: 8,
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 0,
    justifyContent: "space-between",
    height: "100%",
  },
  image: {
    width: 65,
    height: 50,
    resizeMode: "contain",
  },
  textCard: {
    width: "64%",
    gap: 1,
  },
  textWithPersonCard: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  vehicleType: { fontWeight: "600", fontSize: 15, color: "#000" },

  captionText: {
    color: "#888",
    fontSize: 12,
  },
  price: {
    fontFamily: fonts.robotoSemiBold,
    fontSize: 14,
  },
  priceStrike: {
    fontFamily: fonts.robotoRegular,
    fontSize: 12,
    textDecorationLine: "line-through",
  },
});
