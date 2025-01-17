import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { Ionicons, FontAwesome } from "@expo/vector-icons";

const RideHistoryNewItem = ({ orderDetails }) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainCard}>
        <View style={styles.iconsCard}>
          <Ionicons name="location-sharp" size={25} color="green" />
          <View style={styles.line} />
          <FontAwesome name="location-arrow" size={25} color="#e02e88" />
        </View>

        <View style={styles.contentCard}>
          <View>
            <Text style={styles.orderText}>
              {orderDetails?.pickupAddress?.slice(0, 25)}...
            </Text>
          </View>
          <Text style={styles.orderText}>{orderDetails?.dropAddress}</Text>
        </View>
      </View>
    </View>
  );
};

export default RideHistoryNewItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    borderStyle: "dashed",
    paddingBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,

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
    fontWeight: "500",
  },
});
