import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { imageUrl } from "../../../../Constants/url";
import dummyImage from "../../../../assets/images/profile/Services.png";
import Entypo from "@expo/vector-icons/Entypo";

const CaptainDetails = ({ captainDetails }) => {
  const captainImageUrl = `${imageUrl}/${captainDetails?.profilePic}`;

  return (
    <View>
      <View style={styles.imageVehilcCard}>
        <View style={styles.captaineImageCard}>
          {captainDetails?.profilePic ? (
            <Image
              style={styles.captainImage}
              source={{
                uri: captainImageUrl,
              }}
            />
          ) : (
            <Image style={styles.captainImage} source={dummyImage} />
          )}
          <View style={styles.vehiclTypeImageCard}>
            <Image
              source={require("../../../../assets/images/scooty.png")}
              style={styles.smallLogo}
            />
          </View>
        </View>
        <View style={styles.vehicleDetails}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Text style={styles.captainName}>
              {captainDetails?.name || "Samantha"}
            </Text>
            <Text>4.3</Text>
            <Entypo name="star" size={24} color="black" />
          </View>
          <Text style={styles.vehicleNumber}>
            {captainDetails?.vehicleNumber ?? "No Number"}
          </Text>
          <Text style={styles.captainName}>
            {captainDetails?.captainVehicleType ?? "Not Availeble"}
          </Text>
          <Text style={[styles.captainName, { fontSize: 10 }]}>
            Speaks in Telugu, Hindi, English
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
    right: -10,
    bottom: -5,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 25,
  },

  smallLogo: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },

  captaineImageCard: {
    position: "relative",
  },
  captainImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: "contain",
    borderColor: "#e02e88",
    borderWidth: 2,
    padding: 10,
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
