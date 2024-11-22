import { useNavigation } from "@react-navigation/native";

export const useDropLocationHook = ({
  placeName,
  nearbyPlaces,
  location,
  favoritePlaces,
  previousOrders,
}) => {
  const navigation = useNavigation();

  // console.log("fave", favoritePlaces);

  function getRandomItems(arr, numItems, type) {
    if (numItems >= arr.length) {
      let newArr;
      if (type === "prev") {
        newArr = arr.map((each) => ({
          name: each.dropAddress,
          vicinity: each.dropVicinity,
          location: {
            lat: each.drop?.coordinates?.[1],
            lng: each.drop?.coordinates?.[0],
          },
        }));
      } else {
        newArr = arr.map((each) => ({
          name: each.name,
          vicinity: each.vicinity,
          location: {
            lat: each.location?.coordinates?.[1],
            lng: each.location?.coordinates?.[0],
          },
        }));
      }

      return newArr;
    } else if (numItems === 1) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      let newArr;
      if (type === "prev") {
        newArr = [arr[randomIndex]].map((each) => ({
          name: each.dropAddress,
          vicinity: each.dropVicinity,
          location: {
            lat: each.drop?.coordinates?.[1],
            lng: each.drop?.coordinates?.[0],
          },
        }));
      } else {
        newArr = [arr[randomIndex]].map((each) => ({
          name: each.name,
          vicinity: each.vicinity,
          location: {
            lat: each.location?.coordinates?.[1],
            lng: each.location?.coordinates?.[0],
          },
        }));
      }
      return newArr;
    } else if (numItems > 1) {
      const randomIndex = Math.floor(
        Math.random() * (arr.length - numItems + 1)
      );
      let sliceArr = arr.slice(randomIndex, randomIndex + numItems);
      let newArr;
      if (type === "prev") {
        newArr = sliceArr.map((each) => ({
          name: each.dropAddress,
          vicinity: each.dropVicinity,
          location: {
            lat: each.drop?.coordinates?.[1],
            lng: each.drop?.coordinates?.[0],
          },
        }));
      } else {
        newArr = sliceArr.map((each) => ({
          name: each.name,
          vicinity: each.vicinity,
          location: {
            lat: each.location?.coordinates?.[1],
            lng: each.location?.coordinates?.[0],
          },
        }));
      }
      return newArr;
    }
  }

  const handleNavigate = () => {
    navigation.navigate("SelectDropLocation", {
      placeName, // this prop is store current location text,
      pickUpCoordinated: location, // this prop store current location user coordinates to pass price screen to calculate the price
      nearbyPlaces, // this prop store nearby places from user current location to 1 km radius famous location [place this data into "select drop location screen to display initial locations"]
      favoritePlaces:
        favoritePlaces?.length > 0
          ? getRandomItems(favoritePlaces, 2, "fav")
          : [],
      previousOrders:
        previousOrders?.length > 0
          ? getRandomItems(previousOrders, 2, "prev")
          : [],
    });
  };

  const onNavigateToDirectPriceScreen = (place, type) => {
    if (type === "previous") {
      let newDropPlace = {
        name: place?.dropAddress,
        vicinity: place?.dropVicinity,
        location: {
          lat: place.drop?.coordinates?.[1],
          lng: place.drop?.coordinates?.[0],
        },
      };
      navigation.navigate("ShowPrice", {
        placeName, // this prop is store current location text
        pickUpCoordinated: location, // this prop store currect location coodinates
        dropDetails: newDropPlace, // this prop store drop location data (coodinates, location name, vicinity) comming from home screen  --> this is take user direcly from home screen show 3 random location
      });
    } else if (type === "favorite") {
      let newPlace = {
        name: place?.name,
        vicinity: place?.vicinity,
        location: {
          lat: place?.location?.coordinates?.[1],
          lng: place?.location?.coordinates?.[0],
        },
      };
      navigation.navigate("ShowPrice", {
        placeName, // this prop is store current location text
        pickUpCoordinated: location, // this prop store currect location coodinates
        dropDetails: newPlace, // this prop store drop location data (coodinates, location name, vicinity) comming from home screen  --> this is take user direcly from home screen show 3 random location
      });
    } else {
      navigation.navigate("ShowPrice", {
        placeName, // this prop is store current location text
        pickUpCoordinated: location, // this prop store currect location coodinates
        dropDetails: place, // this prop store drop location data (coodinates, location name, vicinity) comming from home screen  --> this is take user direcly from home screen show 3 random location
      });
    }

    // console.log(place);
  };

  return {
    handleNavigate,
    onNavigateToDirectPriceScreen,
  };
};
