import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useParcelMapWithBottomSheetHook } from "./ParcelMapWithBottomSheet.hook";
import { coordinationMap } from "../../../Constants/displaylocationmap";
import ParcelMap from "./ParcelMap";
import ParcelMapInputCard from "./ParcelMapInputCard";

const ParcelMapWithBottomSheet = () => {
  const { pickUpLocationCoorWithName, typeOfLocation } =
    useParcelMapWithBottomSheetHook();
  console.log(pickUpLocationCoorWithName);
  return (
    <View style={styles.container}>
      <ParcelMap pickUpLocationCoorWithName={pickUpLocationCoorWithName} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.bottomSheet}>
          <View style={styles.firstCard}>
            <Text style={styles.enterText}>
              Enter {typeOfLocation === "Pick Up" ? "Sender" : "Receiver"}{" "}
              Details
            </Text>
            <Text style={styles.locatedAddress}>Located Address In Map</Text>
          </View>
          <ParcelMapInputCard
            pickUpLocationCoorWithName={pickUpLocationCoorWithName}
            typeOfLocation={typeOfLocation}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ParcelMapWithBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContainer: {
    paddingTop: 230,
    flexGrow: 1,
  },
  bottomSheet: {
    width: "100%",
    paddingHorizontal: 26,
    paddingVertical: 20,
    backgroundColor: "#fff5f9",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    zIndex: 1,
    gap: 20,
    height: "100%",
  },
  firstCard: {
    gap: 0,
  },
  enterText: {
    fontSize: 16,
    fontWeight: "600",
  },
  locatedAddress: {
    fontSize: 13,
    color: "#808080",
  },
});
