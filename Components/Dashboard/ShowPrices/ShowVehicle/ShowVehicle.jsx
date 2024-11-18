import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ShowVehicle = ({
  image,
  personCount,
  price,
  isSelected,
  onPress,
  vehicleType,
}) => {
  return (
    <Pressable
      style={[styles.pressContainer, isSelected && styles.pressedContainer]} // Apply border if selected
      onPress={onPress} // Call onPress when clicked
    >
      <View style={styles.container}>
        <Image style={styles.image} source={image} />
        <View style={styles.textCard}>
          <View style={styles.textWithPersonCard}>
            <Text style={styles.vehicleType}>{vehicleType}</Text>
            <View
              style={{ flexDirection: "row", gap: 2, alignItems: "center" }}
            >
              <Ionicons name="person-outline" size={13} color="#E02E88" />
              <Text style={{ fontSize: 12, color: "gray" }}>{personCount}</Text>
            </View>
          </View>
          <Text style={styles.captionText}>Beat the traffic & Pay less</Text>
        </View>
        <Text style={styles.price}>₹{price?.toFixed(0)}</Text>
      </View>
    </Pressable>
  );
};

export default ShowVehicle;

const styles = StyleSheet.create({
  pressContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ffe2e6",
    borderRadius: 10,
  },
  pressedContainer: {
    borderWidth: 1,
    borderColor: "#e02e88",
    // Border color for selected vehicle
    borderRadius: 8,
  },
  container: {
    width: "100%",
    backgroundColor: "#fff",
    elevation: 0,
    borderRadius: 8,
    paddingHorizontal: 8,
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 4,
    justifyContent: "space-between",
  },
  image: {
    width: 45,
    height: 50,
    resizeMode: "contain",
  },
  textCard: {
    width: "68%",
  },
  textWithPersonCard: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  vehicleType: { fontWeight: "bold", fontSize: 14, color: "#e02e88" },
  captionText: {
    color: "#888",
    fontSize: 12,
  },
  price: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
