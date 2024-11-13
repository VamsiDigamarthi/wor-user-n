import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import {
  getCoordinatesFromPlaceId,
  nearPlacesByText,
} from "../../../Constants/displaylocationmap";

export const usePickLocationHook = () => {
  //   const route = useRoute();
  const navigation = useNavigation();
  //   const { typeOfLocation } = route.params;

  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchPlaceSuggestions = async (input) => {
    console.log(input);
    let nearPlaces = await nearPlacesByText(input);
    setSuggestions(nearPlaces);
  };

  const handleInputChange = (text) => {
    setInputValue(text);
    if (text.length > 2) {
      fetchPlaceSuggestions(text);
    } else {
      setSuggestions([]);
    }
  };

  const onUserSelectDropLocationByEnterInput = async (place) => {
    let location = await getCoordinatesFromPlaceId(place?.placeId);
    let pickUpLocationCoorWithName = {
      ...place,
      location,
    };
    navigation.navigate("SendReceiveParcel", {
      pickUpLocationCoorWithName,
    });
  };

  return {
    inputValue,
    handleInputChange,
    suggestions,
    onUserSelectDropLocationByEnterInput,
  };
};
