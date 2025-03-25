import React, { useEffect, useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import LocationItem from "../../../../utiles/LocationItem";
import { getCoordinatesFromPlaceId } from "../../../../../../Constants/displaylocationmap";
import { onAddedHomePlace, onEditHomePlace } from "../Services/WhereToGoServ";
import {
  setDropDetails,
  setInitialDropDetails,
} from "../../sharedLogics/rideDetailsSlice";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { homePlace } from "../../home/redux/homePlace";
import { clearHomeOrWorkPlace } from "../redux/homePlaceType.slice";
import { checkUserLocation } from "../../../../../../HOC/redux/LocationBarrier";
import { setLocationBarrierModal } from "../../../../../../HOC/redux/locationBarrierSlice";

const LocationList = ({
  data,
  isFavoritePlaces = false,
  iconname,
  icontype,
  isDisplayAddHomePlace, // this prop initially true || and this props used for change destination location after ride accept
  handleReturnPlaceName, // this is function return place name to change destination modal
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { homeOrWorkPlacetype, isEditHomePlaces, editPlaceId } = useSelector(
    (state) => state.homeOrWorkPlace
  );
  const { token } = useSelector((state) => state.token);
  const { isParcScreen } = useSelector((state) => state.allRideDetails);

  // Helper function to handle navigation and drop location updates
  const handleToNavigateShowPriceScreen = async ({ place }) => {
    try {
      let newDropLocation;

      if (isFavoritePlaces) {
        newDropLocation = {
          ...place,
          location: {
            lat: place?.location?.coordinates[1],
            lng: place?.location?.coordinates[0],
          },
        };
      }

      if (place?.placeId) {
        const location = await getCoordinatesFromPlaceId(place?.placeId);
        newDropLocation = { ...place, location };
      }

      const location = newDropLocation?.location || place.location;
      console.log("homeOrWorkPlacetype", homeOrWorkPlacetype);

      if (homeOrWorkPlacetype) {
        const response = isEditHomePlaces
          ? await onEditHomePlace({
              token,
              name: place.name,
              vicinity: place.vicinity,
              location,
              type: homeOrWorkPlacetype,
              editPlaceId,
            })
          : await onAddedHomePlace({
              token,
              name: place.name,
              vicinity: place.vicinity,
              location,
              type: homeOrWorkPlacetype,
            });

        if (response) {
          dispatch(clearHomeOrWorkPlace());
          dispatch(homePlace({ token }));
          navigation.goBack();
        }
        return;
      }

      // Handle drop details for navigation
      if (isDisplayAddHomePlace) {
        // check location barrier

        let locationBarrier = await checkUserLocation({
          location: location,
        });

        if (!locationBarrier) {
          dispatch(setLocationBarrierModal(true));
          return;
        }
        // check location barrier end

        dispatch(setDropDetails(newDropLocation ?? place));
        if (isParcScreen) {
          dispatch(setInitialDropDetails(newDropLocation ?? place));
          navigation.navigate("ChangeLoc100mViaMap");
          return;
        }
        navigation.navigate("ShowPrice");
        return;
      }
      // Return place name for destination change
      handleReturnPlaceName(newDropLocation ?? place);
    } catch (error) {
      console.error("Error handling location selection:", error);
    }
  };

  // Memoized key extractor to avoid recalculations
  const keyExtractor = useMemo(
    () => (item, index) =>
      isFavoritePlaces
        ? `${item._id || item.id}-${index}`
        : `${item.id || item.placeId}-${index}`,
    [isFavoritePlaces]
  );

  // Memoized renderItem to avoid inline functions
  const renderItem = useMemo(
    () =>
      ({ item }) =>
        (
          <LocationItem
            placeName={item?.name}
            placeVicinity={item.vicinity}
            eachPlace={item}
            isFavoriteIconDisplay={true}
            iconName={iconname}
            iconType={icontype}
            isFavoritePlaces={isFavoritePlaces}
            onPress={() => handleToNavigateShowPriceScreen({ place: item })}
          />
        ),
    [iconname, icontype, isFavoritePlaces]
  );

  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={<View style={{ height: 8 }} />}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default LocationList;

const styles = StyleSheet.create({});
