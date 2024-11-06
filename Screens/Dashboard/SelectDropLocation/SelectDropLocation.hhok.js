import { useState } from "react";
import { nearPlacesByText } from "../../../Constants/displaylocationmap";
import { useRoute } from "@react-navigation/native";

export const useSelectDropLocationHook = () => {
  const route = useRoute();
  const { placeName, nearbyPlaces } = route.params;

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

  return {
    inputValue,
    suggestions,
    handleInputChange,
    placeName,
    nearbyPlaces,
  };
};
