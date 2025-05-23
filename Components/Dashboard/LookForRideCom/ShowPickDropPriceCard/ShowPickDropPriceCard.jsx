import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ShowPickDropItem from "../../ShowPrices/ShowPickDropCard/Component/ShowPickDropItem/ShowPickDropItem";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
const ShowPickDropPriceCard = ({
  vehicleType,
  price,
  placeName,
  dropAddress,
}) => {
  return (
    <View style={styles.showPickDropPriceCard}>
      {/* <ShowPickDropItem icons="location" location={placeName} /> */}
      {/* <ShowPickDropItem icons="locate-sharp" location={dropAddress} /> */}

      <View style={styles.dropCard}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Ionicons name="location-sharp" size={24} color="green" />
          <View>
            <Text style={{ fontWeight: "bold" }}>{dropAddress}</Text>
            <Text>{placeName?.slice(0, 35)}..</Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 10,
            justifyContent: "center",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={24}
            color="#F98600"
          />
          <Text style={{ fontWeight: "bold" }}>Your Total pay {price}</Text>
        </View>
      </View>

      {/* <View style={styles.donwArraowCard}>
        <Ionicons name="arrow-down" size={25} color="#EA4C89" />
      </View> */}
      {/* <View style={styles.priceShowCard}>
        <Text style={styles.priceText}>
          Fare Charge:
          <Text style={styles.price}> ₹{price}</Text>
        </Text>
        <Text style={styles.priceText}>
          Ride Type:<Text style={styles.price}> {vehicleType}</Text>
        </Text>
      </View> */}
    </View>
  );
};

export default ShowPickDropPriceCard;

const styles = StyleSheet.create({
  showPickDropPriceCard: {
    width: "100%",
    // padding: 15,
    backgroundColor: "#F7F7F7",
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
    borderTopColor: "#EA4C89",
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

  dropCard: {
    backgroundColor: "#F7F7F7",
    gap: 10,
    padding: 10,
    borderRadius: 20,
  },
});
