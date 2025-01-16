import { useState } from "react";

export const useParcelHomeScreenHook = () => {
  const [selectedCard, setSelectedCard] = useState("send");
  const [selecteParcelType, setSelectParcelType] = useState(null);

  return {
    selectedCard,
    setSelectedCard,
    setSelectParcelType,
  };
};
