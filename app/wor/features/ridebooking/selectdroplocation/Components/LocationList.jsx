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
import { homePlace } from "../../home/redux/homePlace";
import { clearHomeOrWorkPlace } from "../redux/homePlaceType.slice";

const LocationList = ({
  data,
  isFavoritePlaces = false,
  iconname,
  icontype,
  isDisplayAddHomePlace, // this prop initially true || and this props used for change destination location after ride accept
  handleReturnPlaceName, // this is function return place name to change destination modal
}) => {
  const { homeOrWorkPlacetype } = useSelector((state) => state.homeOrWorkPlace);
  const { token } = useSelector((state) => state.token);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isParcScreen } = useSelector((state) => state.allRideDetails);

  const handleToNavigateShowPriceScreen = async ({ place }) => {
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

    if (homeOrWorkPlacetype) {
      const data = await onAddedHomePlace({
        token,
        name: place.name,
        vicinity: place.vicinity,
        location: newDropLocation ? newDropLocation.location : place.location,
        type: homeOrWorkPlacetype,
      });

      if (data) {
        dispatch(clearHomeOrWorkPlace());
        dispatch(homePlace({ token }));
      }
      return;
    }

    if (isDisplayAddHomePlace) {
      dispatch(setDropDetails(newDropLocation ?? place));
      if (isParcScreen) {
        dispatch(setInitialDropDetails(newDropLocation ?? place));
        navigation.navigate("ChangeLoc100mViaMap");
        return;
      }
      navigation.navigate("ShowPrice");
      return;
    }

    // this function return place to change destination modal to change destination place after ride accept
    handleReturnPlaceName(newDropLocation ?? place);
  };

  // console.log("data", data);

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) =>
        isFavoritePlaces ? `${item._id}-${index}` : `${item.id}-${index}`
      }
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
