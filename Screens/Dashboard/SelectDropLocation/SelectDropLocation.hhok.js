import { useState } from "react";
import {
  getCoordinatesFromPlaceId,
  nearPlacesByText,
} from "../../../Constants/displaylocationmap";
import { useNavigation, useRoute } from "@react-navigation/native";

export const useSelectDropLocationHook = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { placeName, nearbyPlaces, pickUpCoordinated } = route.params;

  const [inputValue, setInputValue] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const fetchPlaceSuggestions = async (input) => {
    let nearPlaces = await nearPlacesByText(input);
    setSuggestions(nearPlaces);
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

  // user click the drop location near places list

  const onUserSelectDropLocationByNeardPlace = (place) => {
    navigation.navigate("ShowPrice", {
      placeName, // this prop is store current location text
      pickUpCoordinated, // this prop store currect location coodinates
      dropDetails: place, // this prop store drop location data (coodinates, location name, vicinity) comming from home screen  --> this is take user direcly from home screen show 3 random location
    });
  };

  /*
    this function arguments data not give coodinates direcly to google api its give placeId
    using this placeId to fetch drop location coordinates
  */
  const onUserSelectDropLocationByEnterInput = async (place) => {
    let location = await getCoordinatesFromPlaceId(place?.placeId);

    let newDropLocation = {
      ...place,
      location,
    };

    navigation.navigate("ShowPrice", {
      placeName, // this prop is store current location text
      pickUpCoordinated, // this prop store currect location coodinates
      dropDetails: newDropLocation, // this prop store drop location data (coodinates, name, secondaryText)
    });
  };

  // navigate to map preview screen
  const onNavigateToMapPreviewScreen = () => {
    navigation.navigate("MapPreview", {
      placeName,
      pickUpCoordinated,
    });
  };

  // this function exicute after open map user click save icon on to fetch data (coordinates)

  return {
    inputValue,
    suggestions,
    handleInputChange,
    placeName,
    nearbyPlaces,
    pickUpCoordinated,
    onUserSelectDropLocationByNeardPlace,
    onUserSelectDropLocationByEnterInput,
    onNavigateToMapPreviewScreen,
  };
};
