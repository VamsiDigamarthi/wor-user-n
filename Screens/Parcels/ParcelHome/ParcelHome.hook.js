import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";

export const useParcelHomeHook = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { pickUpLocationCoorWithName, dropLocationCoorWithName } =
    route.params || {};

  // Initialize state for both pickup and drop location coordinates
  const [pickUpLocation, setPickUpLocation] = useState(null);
  const [dropLocation, setDropLocation] = useState(null);

  useEffect(() => {
    // If the new params contain pickUpLocationCoorWithName, update the state
    if (pickUpLocationCoorWithName) {
      setPickUpLocation(pickUpLocationCoorWithName);
    }
    // If the new params contain dropLocationCoorWithName, update the state
    if (dropLocationCoorWithName) {
      setDropLocation(dropLocationCoorWithName);
    }
  }, [pickUpLocationCoorWithName, dropLocationCoorWithName]);

  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const onHandleNavigateLocationScreen = () => {
    // Handle navigation logic here
  };

  // Return the state values
  return {
    selectedCard,
    handleCardClick,
    pickUpLocation, // Use state value instead of directly from route.params
    onHandleNavigateLocationScreen,
    dropLocation, // Use state value instead of directly from route.params
  };
};
