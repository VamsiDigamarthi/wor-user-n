import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import DropLocationItem from "./Components/DropLocationItem/DropLocationItem";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
const DropLocation = ({
  nearByRandomItems,
  placeName,
  nearbyPlaces,
  location,
}) => {
  const navigation = useNavigation();
  const handleNavigate = () => {
    navigation.navigate("SelectDropLocation", {
      placeName, // this prop is store current location text,
      pickUpCoordinated: location, // this prop store current location user coordinates to pass price screen to calculate the price
      nearbyPlaces, // this prop store nearby places from user current location to 1 km radius famous location [place this data into "select drop location screen to display initial locations"]
    });
  };

  const onNavigateToDirectPriceScreen = (place) => {
    navigation.navigate("ShowPrice", {
      placeName, // this prop is store current location text
      pickUpCoordinated: location, // this prop store currect location coodinates
      dropDetails: place, // this prop store drop location data (coodinates, location name, vicinity) comming from home screen  --> this is take user direcly from home screen show 3 random location
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.inputCard} onPress={handleNavigate}>
        <Ionicons name="location" size={25} color="#E02E88" />
        <View style={styles.inputTypeCard}>
          <Text>Enter Drop Location</Text>
        </View>
      </TouchableOpacity>
      {nearByRandomItems?.map((eachPlace, key) => (
        <DropLocationItem
          mainPlace={eachPlace?.name}
          subPlace={eachPlace.vicinity}
          key={key}
          onPress={onNavigateToDirectPriceScreen.bind(this, eachPlace)}
        />
      ))}
    </View>
  );
};

export default DropLocation;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 10,
  },
  inputCard: {
    width: "100%",
    height: 50,
    borderColor: "#f5f0f0",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    elevation: 0,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
  },
  inputTypeCard: {
    width: "90%",
    height: "100%",
    justifyContent: "center",
  },
});
