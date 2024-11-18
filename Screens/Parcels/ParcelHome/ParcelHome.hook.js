import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";

export const useParcelHomeHook = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { pickUpLocationCoorWithName, dropLocationCoorWithName } =
    route.params || {}; // Safely access params

  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  const onHandleNavigateLocationScreen = () => {};
  // console.log(pickUpLocationCoorWithName);
  return {
    selectedCard,
    handleCardClick,
    pickUpLocationCoorWithName,
    onHandleNavigateLocationScreen,
    dropLocationCoorWithName,
  };
};
