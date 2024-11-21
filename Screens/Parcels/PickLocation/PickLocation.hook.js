import * as Location from "expo-location";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  fetchNearbyPlaces,
  getCoordinatesFromPlaceId,
  nearPlacesByText,
} from "../../../Constants/displaylocationmap";

export const usePickLocationHook = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { typeOfLocation } = route.params;
  const [location, setLocation] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [placeName, setPlaceName] = useState(null);

  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    (async () => {
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
      }
    })();
  }, []);

  // user enter text to fetch places but this type of location have not coordinates
  const fetchPlaceSuggestions = async (input) => {
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
    navigation.navigate("ParcelMapWithBottomSheet", {
      pickUpLocationCoorWithName,
      typeOfLocation
    });
  };

  const onUserSelectPickLocationNearPlaces = (place) => {
    navigation.navigate("ParcelMapWithBottomSheet", {
      pickUpLocationCoorWithName: place,
      typeOfLocation
    });
  };

  const onYourLocationClick = () => {
    let newPlace = {
      ...placeName,
      location: location,
    };
    navigation.navigate("ParcelMapWithBottomSheet", {
      pickUpLocationCoorWithName: newPlace,
      typeOfLocation
    });
  };

  const onNavigateToMapPreviewScreen = () => {
    // console.log(placeName, location);
    navigation.navigate("FixMapPreview", {
      placeName: placeName?.name,
      pickUpCoordinated: location,
      isParcelScreen: true,
      typeOfLocation 
    });
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
  };
};
