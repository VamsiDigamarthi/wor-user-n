import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { onFavoritePlace } from "../redux/favoritePlaces.slice";

export const useWhereToGoHook = ({ micVoiceText, setMicVoiceText, title }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const { favoritePlaces } = useSelector((state) => state.favoritePlaces);
  const { nearPlaces } = useSelector((state) => state.nearPlaces);
  const [inputValue, setInputValue] = useState(title || "");
  const [suggestions, setSuggestions] = useState(null);
  const [isSelectFavoritePlaces, setIsSendOrReceiveParcel] = useState("seggested");

  const fetchPlaceSuggestions = async (input) => {
    const nearPlaces = await nearPlacesByText(input);
    setSuggestions(nearPlaces);
  };

  const debouncedFetchPlaceSuggestions = debounce(fetchPlaceSuggestions, 300);

  useEffect(() => {
    setInputValue(title);
  }, [title]);

  useEffect(() => {
    if (micVoiceText?.length > 0) {
      debouncedFetchPlaceSuggestions(micVoiceText);
    }
  }, [micVoiceText]);

  const handleInputChange = (text) => {
    setInputValue(text);
    if (text.length > 2) {
      debouncedFetchPlaceSuggestions(text);
    } else {
      setSuggestions(null);
    }
  };

  useEffect(() => {
    if (token) {
      dispatch(onFavoritePlace({ token }));
    }
  }, [token]);

  return {
    inputValue,
    suggestions,
    handleInputChange,
    setIsSendOrReceiveParcel,
    isSelectFavoritePlaces,
    favoritePlaces,
  };
};