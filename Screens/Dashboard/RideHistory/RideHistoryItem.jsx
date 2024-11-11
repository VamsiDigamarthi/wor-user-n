import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const RideHistoryItem = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.conatiner}>
        <View style={styles.firstCard}>
          <Text style={styles.rideDetails}>Ride Details</Text>
          <Text style={styles.status}>Cancelled</Text>
        </View>
        <View style={styles.iconWithLocationCard}>
          <Ionicons name="locate-outline" size={18} color="#E02E88" />
          <Text numberOfLines={1} ellipsizeMode="tail">
            Nuhvin Global Services
          </Text>
        </View>
        <View style={styles.iconWithLocationCardSeond}>
          <Ionicons name="lock-closed" size={18} color="#E02E88" />
          <Text numberOfLines={1} ellipsizeMode="tail">
            Hi-Tech City Metro Station
          </Text>
        </View>
        <View style={styles.iconsCard}>
          <Pressable>
            <Ionicons name="arrow-down" size={20} color="#e02e88" />
          </Pressable>
        </View>
      </View>
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
          <Text style={styles.totalPriceNumber}>₹30</Text>
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
  conatiner: {
    backgroundColor: "#fff",
    borderColor: "#ffe2e6",
    borderWidth: 1,
    borderRadius: 10,
    position: "relative",
  },

  iconsCard: {
    position: "absolute",
    padding: 5,
    backgroundColor: "#f5f5f5",
    top: 10,
    right: 10,
    borderRadius: 5,
  },
  firstCard: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 10,
  },
  rideDetails: {
    fontSize: 16,
    fontWeight: "bold",
  },
  status: {
    fontSize: 12,
    color: "red",
  },
  iconWithLocationCard: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e02e88",
    padding: 10,
  },
  iconWithLocationCardSeond: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 10,
    paddingVertical: 15,
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
