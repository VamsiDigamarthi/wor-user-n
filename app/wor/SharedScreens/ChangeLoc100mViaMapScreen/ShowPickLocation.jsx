import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PickLocationIcon } from "../../Icons/Icons";
import { setHowManyMens } from "../../features/ridebooking/sharedLogics/rideDetailsSlice";

export default function ShowPickLocation({ place }) {
  const {
    isParcScreen,
    isSendOrReceiveParcel,
    selectedVehicleType,
    howManyMens,
  } = useSelector((state) => state.allRideDetails);

  const { profile } = useSelector((state) => state.profileSlice);
  const dispatch = useDispatch();

  const onIncrementMens = () => {
    if (selectedVehicleType === "auto" && howManyMens >= 2) {
      return;
    }
    if (selectedVehicleType === "car" && howManyMens >= 3) {
      return;
    }
    dispatch(setHowManyMens(howManyMens + 1));
  };

  const onDecrementMens = () => {
    if (howManyMens === 0) {
      return;
    }
    dispatch(setHowManyMens(howManyMens - 1));
  };

  return (
    <View style={pickLocStyles.container}>
      <Text style={pickLocStyles.title}>
        Double Check{" "}
        {isParcScreen
          ? isSendOrReceiveParcel === "send"
            ? "Pickup"
            : "Drop"
          : "Pick Up "}
        point
      </Text>
      <Text style={pickLocStyles.subTitle}>
        You can change{" "}
        {isParcScreen
          ? isSendOrReceiveParcel === "send"
            ? "Pickup "
            : "Drop "
          : "Pick Up "}
        between 100 meters
      </Text>
      <View style={pickLocStyles.card}>
        <PickLocationIcon size={25} color="#17a773" />
        <View style={pickLocStyles.innerCard}>
          <Text
            style={pickLocStyles.placeName}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {place?.placeName}
          </Text>
          <Text
            style={pickLocStyles.placeVicinity}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {place?.placeVicinity}
          </Text>
          {isParcScreen && (
            <>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
              >
                <Text style={pickLocStyles.placeName}>{profile?.name}</Text>
                <Text style={pickLocStyles.placeVicinity}>
                  {profile?.mobile}
                </Text>
              </View>
            </>
          )}
        </View>
      </View>
      {selectedVehicleType !== "scooty" && (
        <View style={pickLocStyles.mensProblem}>
          <Text style={{ fontSize: 20, fontWeight: "600" }}>Mention mens</Text>
          <View style={pickLocStyles.meninnercard}>
            <Text style={{ fontSize: 13, color: "gray" }}>
              Enter the number of mens
            </Text>
            <View style={pickLocStyles.iconsCard}>
              <Pressable
                style={{
                  width: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={onDecrementMens}
              >
                <Text style={{ fontSize: 22, fontWeight: "600" }}>-</Text>
              </Pressable>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>
                {howManyMens}
              </Text>
              <Pressable
                style={{
                  width: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={onIncrementMens}
              >
                <Text style={{ fontSize: 20, fontWeight: "600" }}>+</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const pickLocStyles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 10,
    marginBottom: 10,
    // marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  subTitle: {
    fontSize: 11,
    color: "gray",
  },
  card: {
    flexDirection: "row",
    gap: 5,
    width: "100%",
    padding: 10,
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
  },
  innerCard: {
    width: "90%",
    // backgroundColor: "red",
    // gap: 4,
  },
  placeName: {
    fontSize: 15,
    fontWeight: "500",
  },
  placeVicinity: {
    fontSize: 13,
    color: "gray",
  },
  mensProblem: {
    // flexDirection:"row",
    width: "100%",
    gap: 5,
  },
  meninnercard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconsCard: {
    width: 100,
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "gray",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
