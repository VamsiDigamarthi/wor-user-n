import { useCallback, useMemo, useState, useRef } from "react";
import { Dimensions, Platform } from "react-native";

export const useBottomSheetConfig = (
  androidSnapPoints,
  iosSnapPoints,
  kownBotSheetChangeUpOrDown = () => {}
) => {
  const screenHeight = Dimensions.get("window").height;

  const [mapHeight, setMapHeight] = useState(
    Platform.OS === "ios" ? iosSnapPoints[0] : androidSnapPoints[0]
  );

  const snapPoints = useMemo(
    () => (Platform.OS === "ios" ? iosSnapPoints : androidSnapPoints),
    [androidSnapPoints, iosSnapPoints]
  );

  const previousSnapIndex = useRef(1);

  const handleSheetChange = useCallback(
    (index) => {
      let height = screenHeight * 0.95;
      if (index === 1) {
        height = screenHeight * 0.6;
      }
      setMapHeight(height);

      if (index > previousSnapIndex.current) {
        kownBotSheetChangeUpOrDown("moved up");
      } else if (index < previousSnapIndex.current) {
        kownBotSheetChangeUpOrDown("moved down");
      }

      previousSnapIndex.current = index;
    },
    [screenHeight]
  );

  return { mapHeight, snapPoints, handleSheetChange };
};
