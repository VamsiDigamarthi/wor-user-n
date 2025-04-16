import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { EditIcons, FavoritesIcons, LocationIcon } from "../../../Icons/Icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setIsParcScreen } from "../../ridebooking/sharedLogics/rideDetailsSlice";
import { fonts } from "../../../fonts/Fonts";

const ParSendRecDetailsDisplayCard = ({ parcelDetails }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  //   console.log(parcelDetails);
  const { isSendOrReceiveParcel } = useSelector(
    (state) => state.allRideDetails
  );

  const handleEditLocation = () => {
    dispatch(setIsParcScreen(true));
    navigation.navigate("SelectDropLocation", {
      isMic: false,
      title: parcelDetails?.name,
      passParams: true,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.firstCard}>
        <LocationIcon size={20} color="#EA4C89" />
        <Text style={styles.sendRecieveText}>
          Add {isSendOrReceiveParcel === "send" ? "Receiving" : "Sender"}{" "}
          Details
        </Text>
        <View style={styles.favoriteIconcard}>
          {/* <FavoritesIcons size={24} color="grey" /> */}

          <TouchableOpacity onPress={handleEditLocation}>
            <EditIcons size={21} color="black" />
          </TouchableOpacity>
        </View>
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
    borderColor: "#EA4C89",
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
    justifyContent: "flex-end",
    gap: 20,
    alignItems: "center",
  },
  secondCard: {
    flex: 1,
    marginLeft: 26,
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.robotoSemiBold,
    color: "#000",
  },
  number: { fontFamily: fonts.robotoSemiBold },
  sendRecieveText: { fontSize: 16, fontFamily: fonts.robotoSemiBold, flex: 1 },
  addressVicinity: { fontFamily: fonts.robotoRegular },
});
