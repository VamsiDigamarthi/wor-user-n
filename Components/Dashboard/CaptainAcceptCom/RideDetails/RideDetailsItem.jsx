import { StyleSheet, Text, View } from "react-native";
import React from "react";

import {
  FontAwesome6,
  FontAwesome5,
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const RideDetailsItem = ({ orderDetails, travellingTimeAndDistnace }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ride Details</Text>
      <View style={styles.mainCard}>
        <View style={styles.iconsCard}>
          <Ionicons name="location-sharp" size={25} color="green" />
          <View style={styles.line} />
          <FontAwesome name="location-arrow" size={25} color="#e02e88" />
        </View>

        <View style={styles.contentCard}>
          <View>
            <Text style={styles.orderText}>
              {orderDetails?.pickupAddress?.slice(0, 35)}...
            </Text>
            <View style={{ flexDirection: "row", gap: 20 }}>
              <Text>{travellingTimeAndDistnace?.distance ?? "2.8 KMs"}</Text>
              <View style={{ flexDirection: "row", gap: 5 }}>
                <MaterialCommunityIcons
                  name="clock-time-eight-outline"
                  size={24}
                  color="black"
                />
                <Text>{travellingTimeAndDistnace?.durationInMinutes} M</Text>
              </View>
            </View>
          </View>
          <Text style={styles.orderText}>{orderDetails?.dropAddress}</Text>
        </View>
      </View>
      {/* <Single
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
      /> */}
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
    // backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#000",
    borderStyle: "dashed",
    paddingBottom: 15,
    paddingHorizontal: 15,
    // borderRadius: 10,
    // borderWidth: 1,
    // borderColor: "#ffe2e6",
    gap: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  mainCard: {
    position: "relative",
    flexDirection: "row",
    gap: 10,
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

  iconsCard: {
    height: 100,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },

  line: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#000",
    width: 1,
    height: "50%",
  },

  contentCard: {
    height: 100,
    width: "90%",
    justifyContent: "space-between",
    // alignItems: "center",
  },

  orderText: {
    fontWeight: "bold",
  },
});
