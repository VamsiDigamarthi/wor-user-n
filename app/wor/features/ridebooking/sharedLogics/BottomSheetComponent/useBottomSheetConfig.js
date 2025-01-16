import { useCallback, useMemo, useState } from "react";
import { Dimensions, Platform } from "react-native";

export const useBottomSheetConfig = (androidSnapPoints, iosSnapPoints) => {
  const screenHeight = Dimensions.get("window").height;

  const [mapHeight, setMapHeight] = useState(
    Platform.OS === "ios" ? iosSnapPoints[0] : androidSnapPoints[0]
  ); // Initial map height based on platform

  const snapPoints = useMemo(
    () => (Platform.OS === "ios" ? iosSnapPoints : androidSnapPoints),
    [androidSnapPoints, iosSnapPoints]
  );

  const handleSheetChange = useCallback(
    (index) => {
      let height = screenHeight * 0.95; // Default map height
      if (index === 1) {
        height = screenHeight * 0.6; // Adjust map height based on snap point
      }
      setMapHeight(height);
    },
    [screenHeight]
  );

  return { mapHeight, snapPoints, handleSheetChange };
};
