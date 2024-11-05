import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { nearPlacesByText } from "../../../../../../Constants/displaylocationmap";

const ShowPickDropItem = ({ icons, location, border, time, isInputShow }) => {
  const [inputValue, setInputValue] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const fetchPlaceSuggestions = async (input) => {
    console.log(input);
    let nearPlaces = await nearPlacesByText(input);
    console.log(nearPlaces);
    // setSuggestions(nearPlaces);
  };

  // Handle text input changes
  const handleInputChange = (text) => {
    setInputValue(text);
    if (text.length > 2) {
      fetchPlaceSuggestions(text);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <View style={[styles.constainer, border]}>
      <Ionicons name={icons} size={25} color="#E02E88" />
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
      {time && (
        <View style={styles.timeCard}>
          <Ionicons name="time-outline" size={18} color="#E02E88" />
          <Text style={styles.timeText}>Time</Text>
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
  },
  locationText: {
    flex: 1,
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
});
