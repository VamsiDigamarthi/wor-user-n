import { useSelector } from "react-redux";
import { getPlaceName } from "../../../../../../Constants/displaylocationmap";
import { useState } from "react";

export const useSelectLocationByMapScreenHook = () => {
  const { location } = useSelector((state) => state.location);

  const [dragLocation, setDragLocation] = useState(null);

  const mapRegion = {
    latitude: location?.lat,
    longitude: location?.lng,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const onFetchLocationName = async (latitude, longitude) => {
    let placeName = await getPlaceName(latitude, longitude);
    // console.log(placeName);
    setDragLocation({
      location: { lat: latitude, lng: longitude },
      name: placeName,
    });
  };
  const onRegionChangeComplete = (region) => {
    onFetchLocationName(region.latitude, region.longitude);
  };

  return { mapRegion, onRegionChangeComplete, dragLocation };
};
