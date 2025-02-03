import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onProfileSection } from "../../redux/profileSlice";
import Toast from "react-native-toast-message";

export const useFakeCallHook = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch(); // Moved useDispatch here, as hooks must be at the top level
  const { token } = useSelector((state) => state.token);
  const { profile } = useSelector((state) => state.profileSlice);

  useEffect(() => {
    if (isFocused) {
      dispatch(onProfileSection({ token })); // Dispatching the action here
    }
  }, [isFocused, dispatch, token]); // Added necessary dependencies

  const navigateToFakeCall = (mobile, name) => {
    Toast.show({
      text1: "Getting Call in 10 Secs",
      position: "bottom",
    });

    setTimeout(() => {
      navigation.navigate("FakeCall", {
        mobile: mobile || "123-456-7890",
        name: name || "John Doe",
      });
    }, 10000);
  };

  const handlerNavigateEmergencyConcatScreen = () => {
    navigation.navigate("EmergencyContactNumber", {
      isHomeSafetyScreen: true,
    });
  };

  return {
    profile,
    navigateToFakeCall,
    handlerNavigateEmergencyConcatScreen,
  };
};
