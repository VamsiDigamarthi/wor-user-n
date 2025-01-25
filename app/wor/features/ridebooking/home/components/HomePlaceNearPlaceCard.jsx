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

const HomePlaceNearPlaceCard = ({ nearByRandomItems }) => {
  const { homePlace, workPlace } = useSelector((state) => state.homePlaces);
  const { location } = useSelector((state) => state.location);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const navigateShowPriceScreen = (place) => {
    dispatch(setIsBeforeBook(true));
    dispatch(setDropDetails(place));
    navigation.navigate("ShowPrice");
  };

  const renderLocationItem = ({ place, defaultPlace, iconName, iconType }) => (
    <LocationItem
      placeName={place ? place.name : defaultPlace?.name}
      placeVicinity={place ? place.vicinity : defaultPlace?.vicinity}
      iconName={iconName}
      iconType={iconType}
      onPress={() => navigateShowPriceScreen(place ?? defaultPlace)}
    />
  );

  return (
    <>
      {location ? (
        <View style={styles.nearByLocationCard}>
          {renderLocationItem({
            place: nearByRandomItems[0],
            defaultPlace: null,
          })}

          {renderLocationItem({
            place: homePlace,
            defaultPlace: nearByRandomItems[1],
            ...(homePlace && { iconName: "home", iconType: "Entypo" }),
          })}

          {renderLocationItem({
            place: workPlace,
            defaultPlace: nearByRandomItems[2],
            ...(workPlace && { iconName: "work", iconType: "MaterialIcons" }),
          })}
        </View>
      ) : (
        <SkeletonLoader />
      )}
    </>
  );
};

export default HomePlaceNearPlaceCard;

const styles = StyleSheet.create({
  nearByLocationCard: {
    borderBottomWidth: 1,
    borderBottomColor: "#ebebeb",
  },
});
