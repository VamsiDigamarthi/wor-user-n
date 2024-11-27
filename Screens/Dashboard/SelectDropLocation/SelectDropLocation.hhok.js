import { useEffect, useState } from "react";
import {
  getCoordinatesFromPlaceId,
  nearPlacesByText,
} from "../../../Constants/displaylocationmap";
import { useNavigation, useRoute } from "@react-navigation/native";
// Ensure you have react-native-vector-icons installed
import Voice from "@react-native-voice/voice";
import { Alert } from "react-native";
export const useSelectDropLocationHook = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {
    placeName,
    nearbyPlaces,
    pickUpCoordinated,
    selectedVehicleType,
    favoritePlaces,
    previousOrders,
    isMic,
  } = route.params;

  const [isMicModalOpenClose, setIsMicModalOpenClose] = useState(
    isMic ?? false
  );
  const [micVoiceText, setMicVoiceText] = useState("");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = () => {
    setIsListening(true);
  };

  const onSpeechResults = (e) => {
    if (e.value && e.value.length > 0) {
      setMicVoiceText(e.value[0]);
      setIsMicModalOpenClose(false);
      fetchPlaceSuggestions(e.value[0]);
    }
    setIsListening(false);
  };

  const onSpeechError = (e) => {
    console.error(e);
    Alert.alert("Error", "Speech recognition error");
    setIsListening(false);
  };

  const startListening = async () => {
    try {
      setIsListening(true);
      await Voice.start("en-US");
    } catch (e) {
      console.error(e);
    }
  };

  const stopListening = async () => {
    try {
      setIsListening(false);
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const handleMicPress = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const [inputValue, setInputValue] = useState("");

  const [suggestions, setSuggestions] = useState([]);
  const [nearByFavPrevPlace, setNearByFavPrevPlace] = useState([]);

  const fetchPlaceSuggestions = async (input) => {
    let nearPlaces = await nearPlacesByText(input);
    setSuggestions(nearPlaces);
  };

  // useEffect(() => {
  //   micVoiceText?.length >=3 && fetchPlaceSuggestions()
  // },[micVoiceText])

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
      selectedVehicleType,
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
      selectedVehicleType,
    });
  };

  // navigate to map preview screen
  const onNavigateToMapPreviewScreen = () => {
    // console.log(placeName);
    navigation.navigate("FixMapPreview", {
      placeName,
      pickUpCoordinated,
    });
  };

  const onNavigateToFavoriteScreen = () => {
    navigation.navigate("Favorite", {
      placeName, // this prop is store current location text
      pickUpCoordinated, // this prop store currect location coodinates
    });
  };

  useEffect(() => {
    const uniqueLocations = [
      ...nearbyPlaces,
      ...favoritePlaces,
      ...previousOrders,
    ].filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.name === value.name)
    );
    setNearByFavPrevPlace(uniqueLocations);
  }, [nearbyPlaces, favoritePlaces, previousOrders]);

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
    onNavigateToFavoriteScreen,
    favoritePlaces,
    previousOrders,
    nearByFavPrevPlace,
    isMicModalOpenClose,
    setIsMicModalOpenClose,
    handleMicPress,
    isListening,
    micVoiceText,
    setIsMicModalOpenClose,
  };
};
