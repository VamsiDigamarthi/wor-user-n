import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { EditIcons, FavoritesIcons, LocationIcon } from "../../../Icons/Icons";
import { useSelector } from "react-redux";

const ParSendRecDetailsDisplayCard = ({ parcelDetails }) => {
  //   console.log(parcelDetails);
  const { isSendOrReceiveParcel } = useSelector(
    (state) => state.allRideDetails
  );
  return (
    <View style={styles.container}>
      <View style={styles.firstCard}>
        <LocationIcon size={20} color="#e02e88" />
        <Text style={{ fontSize: 16, fontWeight: "600", flex: 1 }}>
          Add {isSendOrReceiveParcel === "send" ? "Recevier" : "Sender"} Details
        </Text>
        {/* <View style={styles.favoriteIconcard}>
          <FavoritesIcons size={24} color="grey" />
          <EditIcons size={21} color="black" />
        </View> */}
      </View>
      <View style={styles.secondCard}>
        <Text style={styles.name}>{parcelDetails?.senderName}</Text>
        <Text style={styles.number}>{parcelDetails?.mobile}</Text>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {parcelDetails?.name}
        </Text>
        <Text
          style={styles.addressVicinity}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {parcelDetails?.vicinity}
        </Text>
      </View>
    </View>
  );
};

export default ParSendRecDetailsDisplayCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e02e88",
    padding: 10,
    backgroundColor: "#fff7fb",
  },
  firstCard: {
    flexDirection: "row",
    gap: 10,
    alignContent: "center",
  },
  favoriteIconcard: {
    width: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  secondCard: {
    flex: 1,
    marginLeft: 26,
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
});
