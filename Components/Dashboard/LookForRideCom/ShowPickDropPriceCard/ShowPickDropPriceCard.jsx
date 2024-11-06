import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ShowPickDropItem from "../../ShowPrices/ShowPickDropCard/Component/ShowPickDropItem/ShowPickDropItem";
import { Ionicons } from "@expo/vector-icons";
const ShowPickDropPriceCard = ({
  vehicleType,
  price,
  placeName,
  dropAddress,
}) => {
  return (
    <View style={styles.showPickDropPriceCard}>
      <ShowPickDropItem icons="location" location={placeName} />
      <ShowPickDropItem icons="locate-sharp" location={dropAddress} />
      <View style={styles.donwArraowCard}>
        <Ionicons name="arrow-down" size={25} color="#E02E88" />
      </View>
      <View style={styles.priceShowCard}>
        <Text style={styles.priceText}>
          Fare Charge:
          <Text style={styles.price}> ₹{price}</Text>
        </Text>
        <Text style={styles.priceText}>
          Ride Type:<Text style={styles.price}> {vehicleType}</Text>
        </Text>
      </View>
    </View>
  );
};

export default ShowPickDropPriceCard;

const styles = StyleSheet.create({
  showPickDropPriceCard: {
    width: "100%",
    // padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    position: "relative",
  },
  donwArraowCard: {
    position: "absolute",
    left: 15,
    top: 44,
  },
  priceShowCard: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 2,
    borderTopColor: "#e02e88",
  },
  priceText: {
    fontSize: 11,
    color: "grey",
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
});
