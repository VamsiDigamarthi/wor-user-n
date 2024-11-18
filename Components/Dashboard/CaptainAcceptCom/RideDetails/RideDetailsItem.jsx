import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { FontAwesome6, FontAwesome5 } from "@expo/vector-icons";

const RideDetailsItem = ({ orderDetails, travellingTimeAndDistnace }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ride Details</Text>
      <View style={styles.mainCard}>
        <View style={styles.rowCard}>
          <View style={{ width: 30, marginTop: 5 }}>
            <FontAwesome6 name="location-dot" size={25} color="#31ff10" />
          </View>
          <View style={{ width: "70%" }}>
            <Text style={styles.pickLoc}>Pick Location</Text>
            <Text style={styles.mainLoc}>{orderDetails?.pickupAddress}</Text>
          </View>
        </View>
        <View style={styles.rowCard}>
          <View style={{ width: 30, marginTop: 5 }}>
            <FontAwesome6 name="location-arrow" size={25} color="#e02e88" />
          </View>
          <View style={{ width: "70%" }}>
            <Text style={styles.pickLoc}>Pick Location</Text>
            <Text style={styles.mainLoc}>{orderDetails?.dropAddress}</Text>
          </View>
        </View>
      </View>
      <Single
        firstText="Ride type:"
        firstHead={orderDetails.vehicleType ?? "Scooty"}
        secondText="Ride Arrived in:"
        secondHead="8 M"
      />
      <Single
        firstText="Ride distance:"
        firstHead={travellingTimeAndDistnace?.distance ?? "2.8 KMs"}
        secondText="Ride Time:"
        secondHead={
          `${travellingTimeAndDistnace?.durationInMinutes} M` ?? "23 M"
        }
      />
    </View>
  );
};

export default RideDetailsItem;

const Single = ({ firstText, firstHead, secondText, secondHead }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        <Text style={{ fontSize: 11 }}>{firstText}</Text>
        <Text style={{ fontSize: 13, fontWeight: "600" }}>{firstHead}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        <Text style={{ fontSize: 11 }}>{secondText}</Text>
        <Text style={{ fontSize: 13, fontWeight: "600" }}>{secondHead}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ffe2e6",
    gap: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  mainCard: {
    position: "relative",
    gap: 10,
    overflow: "hidden",
    borderBottomColor: "#ffe2e6",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  rowCard: {
    flexDirection: "row",
    gap: 10,
  },
  pickLoc: {
    fontSize: 14,
    color: "#808080",
  },
  mainLoc: {
    fontSize: 11,
  },
});
