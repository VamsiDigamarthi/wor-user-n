import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { nearPlacesByText } from "../../../../../../Constants/displaylocationmap";

const ShowPickDropItem = ({
  topIcon,
  icons,
  location, // this is comming from first or second card display pick location
  border,
  time,
  isInputShow, // realted input
  inputValue, // realted input
  handleInputChange, // realted input
  iconsName,
  IconsType,
  showRightIcon = true,
  timeShow,
  setIsMicModalOpenClose, // this this function open for mic modal
  onTimeModalOpenCloseHandler, // this is function open for time modal
}) => {
  let Topicons;
  switch (topIcon) {
    case "MaterialIcons":
      Topicons = MaterialIcons;
      break;
    case "Ionicons":
      Topicons = Ionicons;
      break;
    case "FontAwesome":
      Topicons = FontAwesome;
      break;
    default:
      Topicons = Ionicons;
  }

  let Icons;
  switch (IconsType) {
    case "MaterialIcons":
      Icons = MaterialIcons;
      break;
    case "Ionicons":
      Icons = Ionicons;
      break;
    case "FontAwesome":
      Icons = FontAwesome;
      break;
    default:
      Icons = Ionicons;
  }

  const onMiceOpen = () => {
    setIsMicModalOpenClose(true);
  };

  return (
    <View style={[styles.constainer, border]}>
      <Topicons name={icons} size={25} color="#E02E88" />
      {isInputShow ? (
        <TextInput
          placeholder="Enter Destination"
          value={inputValue}
          onChangeText={handleInputChange}
        />
      ) : (
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.locationText}
        >
          {location}
        </Text>
      )}
      {timeShow && (
        <View style={styles.timeCard}>
          <Pressable
            onPress={onTimeModalOpenCloseHandler}
            style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
          >
            <Ionicons name="time-outline" size={18} color="#E02E88" />
            <Text style={styles.timeText}>Time</Text>
          </Pressable>
        </View>
      )}
      {showRightIcon && (
        <View style={styles.favMicCard}>
          <Pressable onPress={iconsName === "microphone" ? onMiceOpen : null}>
            <Icons name={iconsName} color="#e02e88" size={25} />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ShowPickDropItem;

const styles = StyleSheet.create({
  constainer: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: "center",
    gap: 10,
    flexDirection: "row",
    position: "relative",
  },
  locationText: {
    // flex: 1,
    width: "85%",
  },
  timeCard: {
    width: 70,
    backgroundColor: "#fff5f9",
    borderWidth: 1,
    borderColor: "#f5f3f2",
    position: "absolute",
    bottom: -14,
    right: 5,
    zIndex: 23,
    padding: 2,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  timeText: {
    fontSize: 12,
  },
  favMicCard: {
    width: 35,
    height: 40,
    // backgroundColor: "#fff",
    position: "absolute",
    top: 7,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
