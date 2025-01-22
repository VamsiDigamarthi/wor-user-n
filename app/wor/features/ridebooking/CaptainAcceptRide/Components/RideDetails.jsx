import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  ArrowDonwIcons,
  ArrowUpIcons,
  ClockIcons,
  EditIcons,
  FavoritesIcons,
  LocationIcon,
  PickLocationIcon,
} from "../../../../Icons/Icons";
import IconButton from "../../../../utiles/IconButton";
import FaceCard from "./FaceCard";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const RideDetails = ({ completeRideDetails, disFromPickToDrop }) => {
  const [showHidden, setShowHidden] = useState(false);
  const [pickupFavorite, setPickupFavorite] = useState(false);
  const [dropFavorite, setDropFavorite] = useState(false);
  const { favoritePlaces } = useSelector((state) => state.favoritePlaces);

  const navigation = useNavigation();

  const handelNavigateWorSupport = () => {
    navigation.navigate("Chat", {
      isWorSupport: true,
    });
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
    <View style={styles.container}>
      <View style={styles.arrowCard}>
        <Pressable
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
          onPress={() => setShowHidden(!showHidden)}
        >
          <Text style={{ fontSize: 13, fontWeight: "600" }}>Ride Details</Text>
          {showHidden ? (
            <ArrowUpIcons size={30} color="#e02e88" />
          ) : (
            <ArrowDonwIcons size={30} color="gray" />
          )}
        </Pressable>
      </View>

      {showHidden && (
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
                  <EditIcons size={21} color="gray" />
                </View>
              </View>
            </View>
          </View>
          <FaceCard price={completeRideDetails?.price} />
          <View style={styles.btnCard}>
            <IconButton
              icons="cross"
              title="Cancel Ride"
              iconsName="Entypo"
              // onPress={() => setIsSendOrReceiveParcel(!isSelectFavoritePlaces)}
            />
            <IconButton
              icons="support-agent"
              title="Support"
              iconsName="MaterialIcons"
              // isSelected={isSelectFavoritePlaces}
              onPress={handelNavigateWorSupport}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default RideDetails;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    width: "100%",
  },
  arrowCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
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
  btnCard: {
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
});
