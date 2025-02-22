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
      let dropAdd =
        completeRideDetails?.newDesitionOrderStatus === "accept"
          ? completeRideDetails?.newDropAddress
          : completeRideDetails?.dropAddress;
      if (fav.name === dropAdd) {
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
          <View style={styles.pickupContainer}>
            <Text
              style={styles.orderText}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {completeRideDetails?.pickupAddress}
            </Text>
            <Text style={styles.vicinityText} numberOfLines={1}>
              {completeRideDetails?.pickupVicinity}
            </Text>
          </View>
            <View style={styles.distanceTimeContainer}>
              <Text style={styles.distanceText}>
                {disFromPickToDrop?.distance}
              </Text>
              <View style={styles.timeContainer}>
                <ClockIcons size={12} color="gray" />
                <Text style={styles.timeText}>
                  {disFromPickToDrop?.durationInMinutes} Min
                </Text>
              </View>
            </View>

          <View style={styles.dropContainer}>
            <Text
              style={styles.addressText}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {completeRideDetails?.newDesitionOrderStatus === "accept"
                ? completeRideDetails?.newDropAddress
                : completeRideDetails?.dropAddress}{" "}
              <Text style={styles.vicinityText}>
                {completeRideDetails?.newDesitionOrderStatus === "accept"
                  ? completeRideDetails?.newDropVicinity
                  : completeRideDetails?.dropVicinity}
              </Text>
            </Text>
            <Pressable onPress={OpenConfirmChangeDestinationModal}>
              <EditIcons size={16} color="gray" />
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
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 2,
    // marginHorizontal: 5, // Added horizontal margin for better spacing
    marginVertical: 8, // Added vertical margin for better spacing
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
  pickupContainer: {
    // marginBottom: 8, // Added margin to separate pickup and drop sections
  },
  orderText: {
    fontFamily: fonts.robotoMedium,
    fontSize: 12,
    color: "#333",
    // marginBottom: 4, // Added margin for better spacing
  },
  vicinityText: {
    fontSize: 12,
    color: "gray",
    // marginBottom: 4, // Added margin for better spacing
  },
  distanceTimeContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    // marginTop: 4, // Adjusted margin to align with the top text
  },
  distanceText: {
    fontFamily: fonts.robotoRegular,
    fontSize: 10,
    color: "#666",
  },
  timeContainer: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
  timeText: {
    fontFamily: fonts.robotoRegular,
    fontSize: 10,
    color: "#666",
  },
  dropContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addressText: {
    fontFamily: fonts.robotoMedium,
    fontSize: 12,
    color: "#333",
    flex: 1, // Added flex to ensure text takes available space
  },
});