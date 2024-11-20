import { useNavigation } from "@react-navigation/native";

export const useDropLocationHook = ({
  placeName,
  nearbyPlaces,
  location,
  activeOrder,
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

  return {
    handleNavigate,
    onNavigateToDirectPriceScreen,
  };
};
