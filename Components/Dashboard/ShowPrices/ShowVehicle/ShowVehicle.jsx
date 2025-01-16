import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

const ShowVehicle = ({
  image,
  personCount,
  price,
  isSelected,
  onPress,
  vehicleType,
  isDisplayFastTag = false,
  isDisplayUsericon = false,
  isDisplayBeatTheTraffic = false,
}) => {
  return (
    <Pressable
      style={[styles.pressContainer, isSelected && styles.pressedContainer]} // Apply border if selected
      onPress={onPress} // Call onPress when clicked
    >
      <View style={[styles.container]}>
        <Image style={styles.image} source={image} />
        <View style={styles.textCard}>
          <View style={styles.textWithPersonCard}>
            <Text style={styles.vehicleType}>{vehicleType}</Text>
            {isDisplayFastTag && <FastCard />}
            {isDisplayUsericon && (
              <View
                style={{ flexDirection: "row", gap: 2, alignItems: "center" }}
              >
                <Entypo name="user" size={16} color="gray" />
                <Text style={{ fontSize: 15, color: "gray" }}>
                  {personCount}
                </Text>
              </View>
            )}
          </View>
          <Text
            style={[
              styles.captionText,
              { fontSize: 14, color: "#888", fontWeight: "600" },
            ]}
          >
            2 mins away drop 5:32
          </Text>
          {isDisplayBeatTheTraffic && (
            <Text style={styles.captionText}>Beat the traffic & Pay less</Text>
          )}
        </View>
        <Text style={styles.price}>₹{price?.toFixed(0)}</Text>
      </View>
    </Pressable>
  );
};

export default ShowVehicle;

const FastCard = () => (
  <View
    style={{
      width: 80,
      height: 22,
      backgroundColor: "#dcfce7",
      justifyContent: "space-around",
      alignItems: "center",
      borderRadius: 3,
      flexDirection: "row",
    }}
  >
    <MaterialCommunityIcons
      style={{ marginTop: 2 }}
      size={17}
      color="#000"
      name="lightning-bolt-outline"
    />
    <Text style={{ fontSize: 15, fontWeight: "500" }}>Faster</Text>
  </View>
);

const styles = StyleSheet.create({
  pressContainer: {
    width: "100%",
    // borderWidth: 1,
    height: 78,
    // borderColor: "#ffe2e6",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  pressedContainer: {
    height: 78,
    width: "100%",
    borderWidth: 1,
    borderColor: "#e02e88",
    backgroundColor: "#ffedf4",
  },
  container: {
    width: "100%",
    // backgroundColor: "#fff",
    // elevation: 0,
    borderRadius: 8,
    paddingHorizontal: 8,
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 0,
    justifyContent: "space-between",
    height: "100%",
  },
  image: {
    width: 65,
    height: 50,
    resizeMode: "contain",
  },
  textCard: {
    width: "68%",
    gap: 1,
  },
  textWithPersonCard: {
    width: "100%",
    flexDirection: "row",
    // justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
  },
  vehicleType: { fontWeight: "bold", fontSize: 18, color: "#000" },
  captionText: {
    color: "#888",
    fontSize: 13,
  },
  price: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
