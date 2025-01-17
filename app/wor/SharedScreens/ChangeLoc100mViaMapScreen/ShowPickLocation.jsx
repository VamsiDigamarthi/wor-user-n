import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { PickLocationIcon } from "../../Icons/Icons";

export default function ShowPickLocation({
  place,
  selectedCard,
  isRideBookingScreen,
  selectedVehicle,
  howManyMans,
  setHowManyMans,
}) {
  const { profile } = useSelector((state) => state.profileSlice);

  const onIncrementMens = () => {
    if (selectedVehicle === "auto") {
      if (howManyMans === 2) return;
    }
    if (selectedVehicle === "car") {
      if (howManyMans === 3) return;
    }
    setHowManyMans((pre) => pre + 1);
  };
  const onDecrementMens = () => {
    if (howManyMans === 0) {
      return;
    }
    setHowManyMans((pre) => pre - 1);
  };

  return (
    <View style={pickLocStyles.container}>
      <Text style={pickLocStyles.title}>
        Double Check {selectedCard === "send" ? "Pickup" : "Drop"} point
      </Text>
      <Text style={pickLocStyles.subTitle}>
        You can change {selectedCard === "send" ? "Pickup " : "Drop "}
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
          {!isRideBookingScreen && (
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
      {selectedVehicle !== "scooty" && (
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
                {howManyMans}
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
