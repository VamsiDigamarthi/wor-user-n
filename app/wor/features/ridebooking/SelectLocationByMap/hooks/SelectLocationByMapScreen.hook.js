import { useSelector } from "react-redux";

export const useSelectLocationByMapScreenHook = () => {
  const { location } = useSelector((state) => state.location);

  const mapRegion = {
    latitude: location?.lat,
    longitude: location?.lng,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return { mapRegion };
};
