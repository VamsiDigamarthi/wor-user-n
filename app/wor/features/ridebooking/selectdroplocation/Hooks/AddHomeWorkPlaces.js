import { useRoute } from "@react-navigation/native";
import { useState } from "react";

export const useAddHomeWorkPlace = () => {
  const { isMic, type, title, passParams } = useRoute().params || {};
  const [isMicModalOpenClose, setIsMicModalOpenClose] = useState(
    isMic ?? false
  );
  const [micVoiceText, setMicVoiceText] = useState("");

  return {
    isMicModalOpenClose,
    setIsMicModalOpenClose,
    micVoiceText,
    setMicVoiceText,
    type,
    title,
    passParams,
  };
};
