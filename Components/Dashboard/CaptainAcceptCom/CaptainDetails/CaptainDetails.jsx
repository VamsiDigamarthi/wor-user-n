import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { imageUrl } from "../../../../Constants/url";

const CaptainDetails = ({ captainDetails }) => {
  const captainImageUrl = `${imageUrl}/${captainDetails?.profilePic}`;

  return (
    <View>
      <View style={styles.imageVehilcCard}>
        <View style={styles.captaineImageCard}>
          <Image
            style={styles.captainImage}
            source={{
              uri: captainImageUrl,
            }}
          />
          <View style={styles.vehiclTypeImageCard}></View>
        </View>
        <View style={styles.vehicleDetails}>
          <Text style={styles.captainName}>{captainDetails?.name}</Text>
          <Text style={styles.vehicleNumber}>
            {captainDetails?.vehicleNumber ?? "No Number"}
          </Text>
          <Text style={styles.captainName}>
            {captainDetails?.captainVehicleType ?? "Not Availeble"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CaptainDetails;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 20,
  },
  imageVehilcCard: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  vehiclTypeImageCard: {
    position: "absolute",
    right: 0,
    bottom: 10,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  captaineImageCard: {
    position: "relative",
  },
  captainImage: {
    width: 120,
    height: 120,
    borderRadius: 500,
    borderColor: "#e02e88",
    borderWidth: 5,
  },

  vehicleDetails: {
    width: "50%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    gap: 5,
  },
  captainName: {
    fontSize: 14,
    fontWeight: "600",
    color: "gray",
  },
  vehicleNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
