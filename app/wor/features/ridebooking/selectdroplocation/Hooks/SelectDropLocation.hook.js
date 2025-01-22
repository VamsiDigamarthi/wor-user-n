import { useRoute } from "@react-navigation/native";
import { useState } from "react";

export const useSelectDropLocationHook = () => {
  const { isMic } = useRoute().params || {};
  const [isMicModalOpenClose, setIsMicModalOpenClose] = useState(
    isMic ?? false
  );
  const [micVoiceText, setMicVoiceText] = useState("");

  return {
    isMicModalOpenClose,
    setIsMicModalOpenClose,
    micVoiceText,
    setMicVoiceText,
  };
};
