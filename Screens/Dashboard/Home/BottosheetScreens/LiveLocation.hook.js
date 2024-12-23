import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onProfileSection } from "../../../../redux/Features/Auth/ProfileSlice";
import { Linking } from "react-native";

export const useLiveLocationHook = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const { profile } = useSelector((state) => state.profileSlice);
  const isFocused = useIsFocused();

  const [activeRadioBtn, setActiveRadioBtn] = useState("thisRide");
  const handlerChangeActiveRadioBtn = (text) => {
    setActiveRadioBtn(text);
  };

  // adde emergency contact
  const handlerNavigateEmergencyConcatScreen = () => {
    // navigation.navigate("ProfileEmergencyContact", {
    //   isHomeSafetyScreen: true,
    // });
  };

  useEffect(() => {
    dispatch(onProfileSection({ token }));
  }, [isFocused]);

  // whats app sending
  const websiteLink = "https://example.com";

  const sendToWhatsApp = async () => {
    console.log("Sending");
    const message = `Check out this link: ${websiteLink}`;

    // Loop through all numbers
    for (let i = 0; i < profile?.emergencyContact?.length; i++) {
      const number = profile?.emergencyContact[i].mobile;
      console.log(number);
    }
  };

  return {
    profile,
    handlerNavigateEmergencyConcatScreen,
    activeRadioBtn,
    handlerChangeActiveRadioBtn,
    sendToWhatsApp,
  };
};
