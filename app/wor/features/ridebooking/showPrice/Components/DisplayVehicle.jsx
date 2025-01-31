import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setPrice,
  setSelectVehicleType,
} from "../../sharedLogics/rideDetailsSlice";

const DisplayVehicle = ({ vehicle }) => {
  const dispatch = useDispatch();
  const { selectedVehicleType, priceDetails } = useSelector(
    (state) => state.allRideDetails
  );

  const handelSelectVehicle = (vehicle) => {
    dispatch(setPrice(priceDetails[vehicle]));
    dispatch(setSelectVehicleType(vehicle));
  };

  return (
    <Pressable
      style={[
        styles.pressContainer,
        vehicle?.vehicleType?.toLowerCase() ===
          selectedVehicleType?.toLowerCase() && styles.pressedContainer,
      ]}
      onPress={() => handelSelectVehicle(vehicle?.vehicleType?.toLowerCase())} // Call onPress when clicked
    >
      <View style={[styles.container]}>
        <Image style={styles.image} source={vehicle?.image} />
        <View style={styles.textCard}>
          <View style={styles.textWithPersonCard}>
            <Text style={styles.vehicleType}>{vehicle?.vehicleType}</Text>
            {vehicle?.isDisplayFastTag && <FastCard />}
            {vehicle?.vehicleType?.toLowerCase() === selectedVehicleType && (
              <View
                style={{ flexDirection: "row", gap: 2, alignItems: "center" }}
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
              { fontSize: 14, color: "#888", fontWeight: "600" },
            ]}
          >
            2 mins away drop 5:32
          </Text>
          {vehicle?.isDisplayBeatTheTraffic && (
            <Text style={styles.captionText}>Beat the traffic & Pay less</Text>
          )}
        </View>
        <Text style={styles.price}>
          ₹{priceDetails?.[vehicle?.vehicleType?.toLowerCase()]}
        </Text>
      </View>
    </Pressable>
  );
};

export default DisplayVehicle;

const FastCard = () => (
  <View
    style={{
      width: 80,
      height: 22,
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
    // borderWidth: 1,
    height: 78,
    // borderColor: "#ffe2e6",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  pressedContainer: {
    height: 78,
    width: "100%",
    borderWidth: 1,
    borderColor: "#e02e88",
    backgroundColor: "#ffedf4",
  },
  container: {
    width: "100%",
    // backgroundColor: "#fff",
    // elevation: 0,
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
    width: "68%",
    gap: 1,
  },
  textWithPersonCard: {
    width: "100%",
    flexDirection: "row",
    // justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
  },
  vehicleType: { fontWeight: "bold", fontSize: 18, color: "#000" },
  captionText: {
    color: "#888",
    fontSize: 13,
  },
  price: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
