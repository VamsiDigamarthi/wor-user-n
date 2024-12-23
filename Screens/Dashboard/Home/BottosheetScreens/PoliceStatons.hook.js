import { useEffect, useState } from "react";
import { fetchLocation } from "../../../../redux/Features/Location/LocationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { fetchNearbyPoliceStations } from "../../../../Constants/displaylocationmap";

export const usePoliceStatonsHook = () => {
  const dispatch = useDispatch();
  const [policeStation, setpoliceStation] = useState([]);

  const { location } = useSelector((state) => state.location);
  const isFocused = useIsFocused();

  const fetchAndSendLocation = async () => {
    await dispatch(fetchLocation()); // Fetch the location
  };

  useEffect(() => {
    if (isFocused) fetchAndSendLocation();
  }, [isFocused]);

  const fetchPoliceStation = async () => {
    if (location?.lat && location?.lng) {
      const policeStation = await fetchNearbyPoliceStations(
        location?.lat,
        location?.lng
      );
      setpoliceStation(policeStation);
      //   console.log("policeStation", policeStation);
      // Optionally, you can dispatch the police stations to Redux here.
    }
  };

  useEffect(() => {
    fetchPoliceStation();
  }, [location]);

  return { policeStation, location };
};
