import { useEffect, useState } from "react";
import { nearPlacesByText } from "../../../../../../Constants/displaylocationmap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { onFavoritePlace } from "../redux/favoritePlaces.slice";

export const useWhereToGoHook = ({ micVoiceText, setMicVoiceText }) => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.token);
  const { favoritePlaces } = useSelector((state) => state.favoritePlaces);
  const { nearPlaces } = useSelector((state) => state.nearPlaces);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState(null);

  const [isSelectFavoritePlaces, setIsSendOrReceiveParcel] = useState(false);

  const [addedHomeWorkPlaceType, setAddedHowWorkPlaceType] = useState(null);
  const handleAddedHomePlace = async ({ type }) => {
    setAddedHowWorkPlaceType(type);
  };

  const fetchPlaceSuggestions = async (input) => {
    let nearPlaces = await nearPlacesByText(input);
    setSuggestions(nearPlaces);
  };

  useEffect(() => {
    if (micVoiceText?.length > 0) {
      fetchPlaceSuggestions(micVoiceText);
    }
  }, [micVoiceText]);

  // Handle text input changes
  const handleInputChange = (text) => {
    if (text?.length === 0) {
      setSuggestions(nearPlaces);
    }
    if (micVoiceText?.length > 0) {
      setMicVoiceText(text);
    }
    setInputValue(text);
    if (text.length > 2) {
      fetchPlaceSuggestions(text);
    } else {
      setSuggestions(null);
    }
  };

  useEffect(() => {
    token && dispatch(onFavoritePlace({ token }));
  }, [token]);

  return {
    inputValue,
    suggestions,
    handleInputChange,
    setAddedHowWorkPlaceType,
    // howe and work places states
    handleAddedHomePlace,
    addedHomeWorkPlaceType,
    // favorite place state
    setIsSendOrReceiveParcel,
    isSelectFavoritePlaces,
    favoritePlaces,
  };
};
