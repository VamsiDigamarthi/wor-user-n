import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  ClockIcons,
  EditIcons,
  LocationIcon,
  PickLocationIcon,
} from "../../../../Icons/Icons";
import { useSelector } from "react-redux";
import ChangeDestinationModal from "../Modals/ChangeDestinationModal";
import ConfirmChangeDestinationModal from "../Modals/ConfirmChangeDestinationModal";
import { fonts } from "../../../../fonts/Fonts";

const RideCompleteDetails = ({ disFromPickToDrop }) => {
  const { completeRideDetails } = useSelector((state) => state.allRideDetails);
  const [pickupFavorite, setPickupFavorite] = useState(false);
  const [dropFavorite, setDropFavorite] = useState(false);
  const { favoritePlaces } = useSelector((state) => state.favoritePlaces);
  const [beforeOpeningDestinationModal, setBeforeOpeningDestinationModal] =
    useState(false);

  const [changeDestinationModal, setChangeDestinationModal] = useState(false);
  const handleChangeDestinationModal = () => {
    setBeforeOpeningDestinationModal(false);
    setChangeDestinationModal(!changeDestinationModal);
  };

  const OpenConfirmChangeDestinationModal = () => {
    setBeforeOpeningDestinationModal(!beforeOpeningDestinationModal);
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
          <PickLocationIcon size={20} color="green" />
          <View style={styles.line} />
          <LocationIcon size={20} color="#EA4C89" />
        </View>

        <View style={styles.contentCard}>
          <View>
            <Text
              style={styles.addressText}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {completeRideDetails?.pickupAddress} -
              {completeRideDetails?.pickupVicinity}
            </Text>

            <View style={styles.distanceTimeContainer}>
              <Text style={styles.distanceText}>
                {disFromPickToDrop?.distance}
              </Text>
              <View style={styles.timeContainer}>
                <ClockIcons size={16} color="gray" />
                <Text style={styles.timeText}>
                  {disFromPickToDrop?.durationInMinutes} M
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.dropContainer}>
            <Text
              style={styles.addressText}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {completeRideDetails?.dropAddress} -
              {completeRideDetails?.dropVicinity}
            </Text>
            <Pressable onPress={OpenConfirmChangeDestinationModal}>
              <EditIcons size={18} color="gray" />
            </Pressable>
          </View>
        </View>
      </View>

      {/* Modals */}
      <ChangeDestinationModal
        closeDestinationModal={handleChangeDestinationModal}
        openDestinationModal={changeDestinationModal}
        destinationName={completeRideDetails?.dropAddress}
        destinationCoordinates={completeRideDetails?.drop?.coordinates}
      />

      {beforeOpeningDestinationModal && (
        <ConfirmChangeDestinationModal
          onOkPress={handleChangeDestinationModal}
          onCancelPress={OpenConfirmChangeDestinationModal}
        />
      )}
    </>
  );
};

export default RideCompleteDetails;

const styles = StyleSheet.create({
  mainCard: {
    flexDirection: "row",
    gap: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 2, // subtle shadow for depth
  },
  iconsCard: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  line: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#000",
    width: 1,
    height: 64, // fixed height for the line
  },
  contentCard: {
    flex: 1,
    justifyContent: "space-between",
  },
  addressText: {
    fontFamily: fonts.robotoMedium,
    fontSize: 12,
    color: "#333",
  },
  distanceTimeContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 4, // small vertical spacing
  },
  distanceText: {
    fontFamily: fonts.robotoRegular,
    fontSize: 12,
    color: "#666",
  },
  timeContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  timeText: {
    fontFamily: fonts.robotoRegular,
    fontSize: 12,
    color: "#666",
  },
  dropContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
