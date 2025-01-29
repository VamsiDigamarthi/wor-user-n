import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  ClockIcons,
  EditIcons,
  FavoritesIcons,
  LocationIcon,
  PickLocationIcon,
} from "../../../../Icons/Icons";
import { useSelector } from "react-redux";
import ChangeDestinationModal from "../Modals/ChangeDestinationModal";

const RideCompleteDetails = ({ disFromPickToDrop }) => {
  const { completeRideDetails } = useSelector((state) => state.allRideDetails);
  const [pickupFavorite, setPickupFavorite] = useState(false);
  const [dropFavorite, setDropFavorite] = useState(false);
  const { favoritePlaces } = useSelector((state) => state.favoritePlaces);

  const [changeDestinationModal, setChangeDestinationModal] = useState(false);
  const handleChangeDestinationModal = () => {
    setChangeDestinationModal(!changeDestinationModal);
  };

  useEffect(() => {
    favoritePlaces?.forEach((fav) => {
      if (fav.name === completeRideDetails?.pickupAddress) {
        setPickupFavorite(true);
      }
      if (fav.name === completeRideDetails?.dropAddress) {
        setDropFavorite(true);
      }
    });
  }, [completeRideDetails, favoritePlaces]);

  return (
    <>
      <View style={styles.mainCard}>
        <View style={styles.iconsCard}>
          <PickLocationIcon size={25} color="green" />
          <View style={styles.line} />
          <LocationIcon size={25} color="#e02e88" />
        </View>

        <View style={styles.contentCard}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              gap: 5,
            }}
          >
            <Text
              style={[styles.orderText, { width: "90%" }]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {completeRideDetails?.pickupAddress} --{" "}
              {completeRideDetails?.pickupVicinity}
            </Text>

            <FavoritesIcons
              size={21}
              color={pickupFavorite ? "#e02e88" : "gray"}
            />
          </View>
          <View style={{ flexDirection: "row", gap: 20 }}>
            <Text>{disFromPickToDrop?.distance}</Text>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
              }}
            >
              <ClockIcons size={20} color="gray" />
              <Text>{disFromPickToDrop?.durationInMinutes} M</Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              gap: 5,
            }}
          >
            <Text
              style={[styles.orderText, { width: "80%" }]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {completeRideDetails?.dropAddress} --{" "}
              {completeRideDetails?.dropVicinity}
            </Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <FavoritesIcons
                size={22}
                color={dropFavorite ? "#e02e88" : "gray"}
              />
              <Pressable onPress={handleChangeDestinationModal}>
                <EditIcons size={21} color="gray" />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      {/* change destination modal */}
      <ChangeDestinationModal
        closeDestinationModal={handleChangeDestinationModal}
        openDestinationModal={changeDestinationModal}
      />
    </>
  );
};

export default RideCompleteDetails;

const styles = StyleSheet.create({
  mainCard: {
    position: "relative",
    flexDirection: "row",
    gap: 10,
    paddingBottom: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderStyle: "dashed",
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
    height: "43%",
  },
  contentCard: {
    height: 100,
    width: "90%",
    justifyContent: "space-between",
  },
  orderText: {
    fontWeight: "bold",
  },
});
