import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setPrice,
  setSelectVehicleType,
} from "../../sharedLogics/rideDetailsSlice";
import { fonts } from "../../../../fonts/Fonts";
import ShowPriceDetailsModal from "../Modal/ShowPriceDetailsModal";

const DisplayVehicle = ({ vehicle }) => {
  const dispatch = useDispatch();
  const { selectedVehicleType, priceDetails } = useSelector(
    (state) => state.allRideDetails
  );

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
    dispatch(setPrice(vehicle?.price));
    dispatch(setSelectVehicleType(vehicle?.vehicleType?.toLowerCase()));
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
                    <Fontisto name="female" size={15} color="black" />
                    <Text style={{ fontSize: 15, color: "gray" }}>
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
            <Text style={styles.price}>₹{vehicle?.price}</Text>
            <Text style={[styles.priceStrike]}>
              {/* ₹{priceDetails?.[vehicle?.vehicleType?.toLowerCase()]} */}
            </Text>
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
      width: 80,
      height: 20,
      backgroundColor: "#dcfce7",
      justifyContent: "space-around",
      alignItems: "center",
      borderRadius: 3,
      flexDirection: "row",
    }}
  >
    <MaterialCommunityIcons
      style={{ marginTop: 2 }}
      size={17}
      color="#000"
      name="lightning-bolt-outline"
    />
    <Text style={{ fontSize: 15, fontWeight: "500" }}>Faster</Text>
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

  vehicleType: { fontWeight: "bold", fontSize: 16, color: "#000" },

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
