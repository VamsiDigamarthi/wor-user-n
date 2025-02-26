import LocationItem from "../../../../utiles/LocationItem";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  setDropDetails,
  setIsBeforeBook,
} from "../../sharedLogics/rideDetailsSlice";
import SkeletonLoader from "../../../../utiles/Loaders/SingleLoader";
import { View, StyleSheet } from "react-native";
import { fonts } from "../../../../fonts/Fonts";

const HomePlaceNearPlaceCard = ({ nearByRandomItems }) => {
  const { homePlace, workPlace } = useSelector((state) => state.homePlaces);
  const { location } = useSelector((state) => state.location);
  const { rideHistory } = useSelector((state) => state.rideHistory);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // console.log(rideHistory[0]);

  const navigateShowPriceScreen = (place) => {
    console.log(place, "place");
    dispatch(setIsBeforeBook(true));
    dispatch(setDropDetails(place));

    navigation.navigate("ShowPrice");
  };

  const renderLocationItem = ({
    place,
    defaultPlace,
    iconName,
    iconType,
    isHomePlaceOrWork,
  }) => (
    <LocationItem
      placeName={place ? place.name : defaultPlace?.name}
      placeVicinity={place ? place.vicinity : defaultPlace?.vicinity}
      iconName={iconName}
      iconType={iconType}
      onPress={() => navigateShowPriceScreen(place ?? defaultPlace)}
      isHomePlaceOrWork={isHomePlaceOrWork}
    />
  );

  // First render: prioritize rideHistory[0], then nearByRandomItems[0]
  const renderFirstLocationItem = () => {
    const place = rideHistory[0]
      ? {
          name: rideHistory[0]?.dropAddress,
          vicinity: rideHistory[0]?.dropVicinity,
          _id: rideHistory[0]?._id,
          location: {
            lat: rideHistory[0]?.drop?.coordinates?.[1],
            lng: rideHistory[0]?.drop?.coordinates?.[0],
          },
        }
      : null;

    return renderLocationItem({
      place,
      defaultPlace: nearByRandomItems[0],
      isHomePlaceOrWork: "near",
    });
  };

  // Second render: prioritize homePlace, then rideHistory[1], then nearByRandomItems[1]
  const renderSecondLocationItem = () => {
    const place = homePlace
      ? {
          name: homePlace?.name,
          vicinity: homePlace?.vicinity,
          _id: homePlace?._id,
          location: homePlace?.location,
        }
      : rideHistory[1]
      ? {
          name: rideHistory[1]?.pickupAddress,
          vicinity: rideHistory[1]?.pickupVicinity,
          _id: rideHistory[1]?._id,
          location: {
            lat: rideHistory[1]?.pickup?.coordinates?.[1],
            lng: rideHistory[1]?.pickup?.coordinates?.[0],
          },
        }
      : null;

    return renderLocationItem({
      place,
      defaultPlace: nearByRandomItems[1],
      iconName: "home",
      iconType: "Entypo",
      isHomePlaceOrWork: "home",
    });
  };

  // Third render: prioritize workPlace, then rideHistory[2], then nearByRandomItems[2]
  const renderThirdLocationItem = () => {
    const place = workPlace
      ? {
          name: workPlace?.name,
          vicinity: workPlace?.vicinity,
          _id: homePlace?._id,

          location: homePlace?.location,
        }
      : rideHistory[2]
      ? {
          name: rideHistory[2]?.pickupAddress,
          vicinity: rideHistory[2]?.pickupVicinity,
          _id: rideHistory[2]?._id,
          location: {
            lat: rideHistory[2]?.pickup?.coordinates?.[1],
            lng: rideHistory[2]?.pickup?.coordinates?.[0],
          },
        }
      : null;

    return renderLocationItem({
      place,
      defaultPlace: nearByRandomItems[2],
      iconName: "work",
      iconType: "MaterialIcons",
      isHomePlaceOrWork: "work",
    });
  };

  return (
    <>
      {location ? (
        <View style={styles.nearByLocationCard}>
          {renderFirstLocationItem()}
          {renderSecondLocationItem()}
          {renderThirdLocationItem()}
        </View>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <SkeletonLoader />
        </View>
      )}
    </>
  );
};

export default HomePlaceNearPlaceCard;

const styles = StyleSheet.create({
  nearByLocationCard: {
    borderBottomWidth: 1,
    borderBottomColor: "#ebebeb",
    gap: 8,
    paddingBottom: 10,
  },
});
