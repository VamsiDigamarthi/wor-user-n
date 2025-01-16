import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { EditIcons, LocationIcon } from "../../../Icons/Icons";

const ParAddressDisplayCard = ({ placeName, vicinity }) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.iconsCard}>
        <LocationIcon size={25} color="#e02e88" />
      </Pressable>
      <View style={styles.middleCard}>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {placeName}
        </Text>
        <Text style={styles.subText} numberOfLines={1} ellipsizeMode="tail">
          {vicinity}
        </Text>
      </View>
      <Pressable style={styles.iconsCard}>
        <EditIcons size={20} color="gray" />
      </Pressable>
    </View>
  );
};

export default ParAddressDisplayCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    gap: 2,
  },
  iconsCard: {
    width: 30,
    alignItems: "center",
    marginTop: 2,
  },
  middleCard: {
    width: "82%",
  },
  text: {
    fontSize: 15,
    color: "black",
    fontWeight: "600",
  },
  subText: {
    fontSize: 11,
    color: "gray",
    marginTop: 2,
  },
});
