import { useDispatch, useSelector } from "react-redux";
import { getPlaceName } from "../../../../../../Constants/displaylocationmap";
import { useState } from "react";
import { checkUserLocation } from "../../../../../../HOC/redux/LocationBarrier";
import { setLocationBarrierModal } from "../../../../../../HOC/redux/locationBarrierSlice";

export const useSelectLocationByMapScreenHook = () => {
  const dispatch = useDispatch();

  const { location } = useSelector((state) => state.location);

  const [dragLocation, setDragLocation] = useState(null);

  const [isDisplayContinueBtn, setIsDisplayContinueBtn] = useState(false);

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
  const onRegionChangeComplete = async (region) => {
    let location = { lat: region?.latitude, lng: region?.longitude };

    let locationBarrier = await checkUserLocation({
      location: location,
    });
    setIsDisplayContinueBtn(locationBarrier);

    if (!locationBarrier) {
      dispatch(setLocationBarrierModal(true));
      // return;
    }

    onFetchLocationName(region.latitude, region.longitude);
  };

  return {
    mapRegion,
    onRegionChangeComplete,
    dragLocation,
    isDisplayContinueBtn,
  };
};
