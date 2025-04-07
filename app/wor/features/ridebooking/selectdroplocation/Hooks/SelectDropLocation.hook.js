import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Dimensions, Platform, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useSelectDropLocationHook = () => {
  const { isMic } = useRoute().params || {};
  const [isMicModalOpenClose, setIsMicModalOpenClose] = useState(
    isMic ?? false
  );
  const [micVoiceText, setMicVoiceText] = useState("");
  const insets = useSafeAreaInsets();

  const [hasSoftwareNavigationBar, setHasSoftwareNavigationBar] =
    useState(false);

  // const hasSoftwareNavigationBar = insets.bottom > 0;

  // console.log("hasSoftwareNavigationBar", hasSoftwareNavigationBar);

  const hasNavBar = () => {
    if (Platform.OS !== "android") return false;

    const windowHeight = Dimensions.get("window").height;
    const screenHeight = Dimensions.get("screen").height;

    return screenHeight > windowHeight;
  };
  useEffect(() => {
    setHasSoftwareNavigationBar(hasNavBar());
  }, []);

  console.log("hasSoftwareNavigationBar", hasSoftwareNavigationBar);

  return {
    isMicModalOpenClose,
    setIsMicModalOpenClose,
    micVoiceText,
    setMicVoiceText,
    hasSoftwareNavigationBar,
  };
};
