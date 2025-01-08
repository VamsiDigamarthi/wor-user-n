import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useDropLocationItemHook } from "./DropLocationItem.hook";

const DropLocationItem = ({
  mainPlace,
  subPlace,
  onPress,
  eachPlace,
  favoriteIconDisplay = true,
  isPreviousOrder = false, // this prop tell if this previous order item chech name
}) => {
  const { onAddPlaceToFavoriteHandler, favoritePlacesApi } =
    useDropLocationItemHook();
  const isFavorite = favoritePlacesApi.some(
    (place) =>
      place.name ===
      (isPreviousOrder ? eachPlace?.dropAddress : eachPlace?.name)
  );
  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{
          color: "#f7e1ec", // Set ripple color
          borderless: false, // Ensures ripple stays within the bounds of the button
        }}
        style={styles.pressableCard}
        onPress={onPress}
      >
        <View style={styles.first}>
          {/* <FontAwesome name="location-arrow" size={25} color="#fff" /> */}
          <Image
            style={styles.firstImage}
            source={require("../../../../../assets/images/locationIcons/pin locator 2.png")}
          />
        </View>
        <View style={styles.second}>
          <Text style={styles.locText} numberOfLines={1}>
            {mainPlace}
          </Text>
          <Text style={styles.subLocText} numberOfLines={1}>
            {subPlace}
          </Text>
        </View>
        {favoriteIconDisplay && (
          <View style={styles.third}>
            <Pressable>
              <Ionicons
                name="heart"
                size={23}
                color="gray"
                style={{ color: isFavorite ? "#e02e88" : "#808080" }}
                onPress={() =>
                  onAddPlaceToFavoriteHandler(
                    eachPlace,
                    isPreviousOrder ? "previous" : "remain"
                  )
                }
              />
            </Pressable>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default DropLocationItem;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    // borderBottomWidth: 1,
    // backgroundColor: "red",
    borderBottomColor: "lightgrey",
    // paddingHorizontal: 10,
  },

  pressableCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    alignItems: "center",
    position: "relative",
    // borderBottomWidth: 2,
    borderColor: "#fff",
    paddingVertical: 5,
  },

  first: {
    width: 35,
    height: 35,
    borderRadius: 30,
    // backgroundColor: "#E02E88",
    justifyContent: "center",
    alignItems: "center",
  },
  firstImage: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
    // backgroundColor: "red",
  },
  second: {
    width: "90%",
    // gap: 2,
  },
  locText: {
    fontSize: 13,
    fontWeight: "600",
  },
  subLocText: {
    fontSize: 11,
    color: "#666666",
    overflow: "hidden", // Ensure any overflow is hidden
    whiteSpace: "nowrap",
  },
  third: {
    position: "absolute",
    top: 1,
    right: -33,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
