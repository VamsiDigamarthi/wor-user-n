import { useSelector } from "react-redux";
import {
  quickAlertButtonClick,
  wrongRouteSafeAndSecure,
} from "./RouteChangeAlertModal.services";

export const useRouteChangeAlertModalHook = ({ setRouteMapTToggle }) => {
  const { completeRideDetails } = useSelector((state) => state.allRideDetails);
  const { token } = useSelector((state) => state.token);
  const { profile } = useSelector((state) => state.profileSlice);

  const safeButonClick = async () => {
    const data = await wrongRouteSafeAndSecure({
      orderId: completeRideDetails?._id,
      token: token,
    });
    if (data) {
      setRouteMapTToggle(false);
    }
  };

  const quickAlertClick = async () => {
    const data = await quickAlertButtonClick({
      orderId: completeRideDetails?._id,
      token: token,
    });
    if (data) {
      setRouteMapTToggle(false);
    }
  };

  return {
    safeButonClick,
    quickAlertClick,
  };
};
