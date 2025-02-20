import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useChangePickLocationHook } from "./ChangePickLocation.hook";
import { EvilIcons } from "@expo/vector-icons";
import { fonts } from "../../../app/wor/fonts/Fonts";

const ChangePickLocation = () => {
  const { pickUpCoordinated } = useChangePickLocationHook();
  console.log(pickUpCoordinated);
  return (
    <View style={styles.container}>
      <View style={styles.mapCard}></View>
      <View style={styles.downCard}>
        <Text style={{ fontFamily: fonts.robotoSemiBold, fontSize: 18 }}>
          Double Check Pickup Point
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: "gray",
            fontFamily: fonts.robotoRegular,
          }}
        >
          You can change pickup point between 100 meters
        </Text>
        <View style={styles.locCard}>
          <View
            style={{
              width: 40,
              //   height: 40,
              justifyContent: "center",
              alignItems: "center",
              padding: 5,
            }}
          >
            <EvilIcons name="location" size={40} color="#17a773" />
          </View>
          <View style={{ width: "90%" }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ fontFamily: fonts.robotoSemiBold, fontSize: 16 }}
            >
              Current Pickup Point
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontSize: 14,
                color: "gray",
                fontFamily: fonts.robotoRegular,
              }}
            >
              khg kjh
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChangePickLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  mapCard: {
    width: "100%",
    height: "80%",
    backgroundColor: "blue",
  },
  downCard: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    gap: 6,
  },
  locCard: {
    backgroundColor: "#f7f7f7",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
