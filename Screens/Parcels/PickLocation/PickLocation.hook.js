import * as Location from "expo-location";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  fetchNearbyPlaces,
  getCoordinatesFromPlaceId,
  nearPlacesByText,
} from "../../../Constants/displaylocationmap";
import Voice from "@react-native-voice/voice";
export const usePickLocationHook = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { typeOfLocation, isMicClick = false } = route.params;
  const [location, setLocation] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [placeName, setPlaceName] = useState(null);
  const [loadings, setLoadings] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [isMicModalOpenClose, setIsMicModalOpenClose] = useState(
    isMicClick ?? false
  );

  const [micVoiceText, setMicVoiceText] = useState("");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    (async () => {
      setLoadings(true);
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          lat: currentLocation.coords.latitude,
          lng: currentLocation.coords.longitude,
        }); // Update state with the location

        let nearbyPlaces = await fetchNearbyPlaces(
          currentLocation.coords.latitude,
          currentLocation.coords.longitude
        );
        // console.log(nearbyPlaces); near place have coordinates
        setNearbyPlaces(nearbyPlaces);
        setLoadings(false);
        let [place] = await Location.reverseGeocodeAsync({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });

        if (place) {
          let newPlace = {
            name: place.name,
            vicinity: place.formattedAddress,
          };
          setPlaceName(newPlace);
        } else {
          setPlaceName("Location not found");
        }
      } catch (error) {
        console.log(error.message || "Something went wrong");
        setLoadings(false);
      }
    })();
  }, []);

  // user enter text to fetch places but this type of location have not coordinates
  const fetchPlaceSuggestions = async (input) => {
    setLoadings(true);
    let nearPlaces = await nearPlacesByText(input);
    setLoadings(false);
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

  // this function call when you click the suggestion places
  const onUserSelectDropLocationByEnterInput = async (place) => {
    let location = await getCoordinatesFromPlaceId(place?.placeId);
    let pickUpLocationCoorWithName = {
      ...place,
      location,
    };
    navigation.navigate("ParcelMapWithBottomSheet", {
      pickUpLocationCoorWithName,
      typeOfLocation,
    });
  };

  // this function call when user select nearby location places
  const onUserSelectPickLocationNearPlaces = (place) => {
    navigation.navigate("ParcelMapWithBottomSheet", {
      pickUpLocationCoorWithName: place,
      typeOfLocation,
    });
  };

  const onNavigateToFavoriteScreen = () => {
    navigation.navigate("Favorite", {
      isParcelScreen: true,
      typeOfLocation,
    });
  };

  const onYourLocationClick = () => {
    let newPlace = {
      ...placeName,
      location: location,
    };
    navigation.navigate("ParcelMapWithBottomSheet", {
      pickUpLocationCoorWithName: newPlace,
      typeOfLocation,
    });
  };

  // user click to 'SELCET ON MAP" button this function called
  const onNavigateToMapPreviewScreen = () => {
    // console.log(placeName, location);
    navigation.navigate("FixMapPreview", {
      placeName: placeName?.name,
      pickUpCoordinated: location,
      isParcelScreen: true,
      typeOfLocation,
    });
  };

  // Mic related Functions
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

  return {
    inputValue,
    handleInputChange,
    suggestions,
    nearbyPlaces,
    onUserSelectDropLocationByEnterInput,
    onUserSelectPickLocationNearPlaces,
    onYourLocationClick,
    onNavigateToMapPreviewScreen,
    onNavigateToFavoriteScreen,
    loadings,
    // Mic
    isMicModalOpenClose,
    setIsMicModalOpenClose,
    isListening,
    handleMicPress,
    micVoiceText,
  };
};
