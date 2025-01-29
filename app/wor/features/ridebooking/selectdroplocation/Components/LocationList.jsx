import { FlatList, StyleSheet } from "react-native";
import LocationItem from "../../../../utiles/LocationItem";
import { getCoordinatesFromPlaceId } from "../../../../../../Constants/displaylocationmap";
import { onAddedHomePlace } from "../Services/WhereToGoServ";
import {
  setDropDetails,
  setInitialDropDetails,
} from "../../sharedLogics/rideDetailsSlice";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

const LocationList = ({
  data,
  isHomeWorkPlace,
  setAddedHowWorkPlaceType,
  isFavoritePlaces = false,
  iconname,
  icontype,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isParcScreen } = useSelector((state) => state.allRideDetails);

  const handleToNavigateShowPriceScreen = async ({
    place,
    isHomeWorkPlace,
  }) => {
    let newDropLocation = null;
    if (isFavoritePlaces) {
      newDropLocation = {
        ...place,
        location: {
          lat: place?.location?.coordinates[1],
          lng: place?.location?.coordinates?.[0],
        },
      };
    }

    if (place?.placeId) {
      let location = await getCoordinatesFromPlaceId(place?.placeId);
      newDropLocation = {
        ...place,
        location,
      };
    }

    if (isHomeWorkPlace) {
      await onAddedHomePlace({
        token,
        name: place.name,
        vicinity: place.vicinity,
        location: newDropLocation ? newDropLocation.location : place.location,
        type: isHomeWorkPlace,
      });
      setAddedHowWorkPlaceType(null);
      return;
    }
    dispatch(setDropDetails(newDropLocation ?? place));

    if (isParcScreen) {
      dispatch(setInitialDropDetails(newDropLocation ?? place));
      navigation.navigate("ChangeLoc100mViaMap");
      return;
    }
    navigation.navigate("ShowPrice");
  };

  // console.log("data", data);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => (isFavoritePlaces ? item._id : item.id)}
      // keyExtractor={(item, index) => index}
      renderItem={({ item }) => (
        <LocationItem
          placeName={item?.name}
          placeVicinity={item.vicinity}
          eachPlace={item}
          isFavoriteIconDisplay={true}
          iconName={iconname}
          iconType={icontype}
          isFavoritePlaces={isFavoritePlaces}
          onPress={() =>
            handleToNavigateShowPriceScreen({
              place: item,
              isHomeWorkPlace: isHomeWorkPlace,
            })
          }
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default LocationList;

const styles = StyleSheet.create({});
