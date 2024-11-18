import { Pressable, StyleSheet, Text, View } from "react-native";
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
      <Pressable style={styles.inputCard} onPress={handleNavigate}>
        <Ionicons name="location" size={25} color="#E02E88" />
        <View style={styles.inputTypeCard}>
          <Text>Enter Drop Location</Text>
        </View>
      </Pressable>
      <View style={styles.innerCard}>
        {nearByRandomItems?.map((eachPlace, key) => (
          <DropLocationItem
            mainPlace={eachPlace?.name}
            subPlace={eachPlace?.vicinity}
            eachPlace={eachPlace}
            key={key}
            onPress={onNavigateToDirectPriceScreen.bind(this, eachPlace)}
          />
        ))}
      </View>
    </View>
  );
};

export default DropLocation;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    height: 250,

    // gap: 10,
  },
  innerCard: {
    backgroundColor: "#fff",
    padding: 10,
    overflow: "hidden",
    height: 230,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: 2,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
    borderColor: "#ffe2e6",
    gap: 10,
  },
  inputCard: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ffe2e6",
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
    borderRadius: 30,
    position: "absolute",
    zIndex: 3,
  },
  inputTypeCard: {
    width: "90%",
    height: "100%",
    justifyContent: "center",
  },
});
