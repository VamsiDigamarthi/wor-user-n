import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import RideHistoryFirst from "./RideHistoryFirst";

const RideHistoryItem = ({ ride }) => {
  return (
    <View style={styles.mainContainer}>
      <RideHistoryFirst ride={ride} />
      <View style={styles.priceTimeCard}>
        <View style={styles.priceTimeInnerCard}>
          <View style={styles.scootyImageCard}>
            <Image
              source={require("../../../assets/images/profile/Vector.png")}
              style={styles.scootyImage}
            />
          </View>
          <View style={styles.priceTimeInnerInnerCard}>
            <View style={styles.kmCard}>
              <Text style={styles.distancetext}>2.8 KM</Text>
              <Text style={styles.totalDistnce}>Total Ride Distance</Text>
            </View>
            <View style={styles.line}></View>
            <View style={styles.kmCard}>
              <Text style={styles.distancetext}>28 Mins</Text>
              <Text style={styles.totalDistnce}>Total Ride Time</Text>
            </View>
          </View>
        </View>
        <View style={styles.totalPriceCard}>
          <Text style={styles.totalText}>Total Fare Price</Text>
          <Text style={styles.totalPriceNumber}>₹{ride.price}</Text>
        </View>
      </View>
    </View>
  );
};

export default RideHistoryItem;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ffe2e6",
    borderRadius: 10,
    backgroundColor: "#fff",
  },

  priceTimeCard: {
    padding: 10,
    gap: 15,
  },
  priceTimeInnerCard: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 10,
  },
  scootyImageCard: {
    width: 40,
    height: 40,
    backgroundColor: "#eee5e9",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  scootyImage: {
    width: "70%",
    height: "70%",
    resizeMode: "contain",
  },
  priceTimeInnerInnerCard: {
    width: "80%",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
    flexDirection: "row",
  },
  line: {
    width: 1,
    height: 30,
    backgroundColor: "pink",
  },
  kmCard: {
    alignItems: "center",
    gap: 3,
  },
  distancetext: {
    fontSize: 15,
    fontWeight: "bold",
  },
  totalDistnce: {
    fontSize: 8,
  },
  totalPriceCard: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-end",
  },
  totalText: {
    color: "#808080",
    fontSize: 12,
  },
  totalPriceNumber: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
