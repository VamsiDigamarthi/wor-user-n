import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onProfileSection } from "../../redux/profileSlice";
import { Linking } from "react-native";

import Share from "react-native-share";

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
    navigation.navigate("EmergencyContactNumber", {
      isHomeSafetyScreen: true,
    });
  };

  useEffect(() => {
    dispatch(onProfileSection({ token }));
  }, [isFocused]);

  // whats app sending

  const sendToOtherApps = async () => {
    const locationLink = "https://example.com";
    const message = `Hi, I am sharing my location: ${locationLink}`;

    const options = {
      title: "Share Location",
      message: message,
      url: locationLink,
      social: Share.Social.WHATSAPP,
    };

    try {
      await Share.open(options); // Try to open WhatsApp with the options
    } catch (error) {
      console.error("Error sharing via WhatsApp:", error);
      // If WhatsApp is not available, fallback to SMS or other apps
      try {
        const smsOptions = {
          title: "Share Location via SMS",
          message: message,
          social: Share.Social.SMS, // Try to share via SMS
          recipient: phoneNumber, // Pre-fill the phone number for SMS
        };
        await Share.open(smsOptions);
      } catch (smsError) {
        console.error("Error sharing via SMS:", smsError);
        // Optionally, fallback to sharing via other platforms like Email, Facebook, etc.
        // try {
        //   const emailOptions = {
        //     title: "Share Location via Email",
        //     message: message,
        //     social: Share.Social.EMAIL, // Try sharing via Email
        //   };
        //   await Share.open(emailOptions);
        // } catch (emailError) {
        //   console.error("Error sharing via Email:", emailError);
        //   // alert("Error: Unable to share location.");
        // }
      }
    }
  };

  function shareLocation(mobile, link) {
    const locationLink = "https://maps.google.com/?q=28.704060,77.102493"; // Replace with dynamic location coordinates
    const message = `Hi, I am sharing my location: ${locationLink}`;

    let formattedMobile = mobile.split(" ").join("");

    if (!formattedMobile?.startsWith("+91")) {
      formattedMobile = "+91" + formattedMobile;
    }

    console.log(formattedMobile);

    const phoneNumber = `+${formattedMobile}`;
    const encodedMessage = encodeURIComponent(message);

    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
    const smsUrl = `sms:${phoneNumber}?body=${encodedMessage}`;

    Linking.openURL(whatsappUrl).catch(() => {
      Alert.alert("Something Went Wrong");
    });
  }

  return {
    profile,
    handlerNavigateEmergencyConcatScreen,
    activeRadioBtn,
    handlerChangeActiveRadioBtn,
    sendToOtherApps,
    shareLocation,
  };
};
