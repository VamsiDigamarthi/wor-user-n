import { useCallback, useMemo, useState, useRef } from "react";
import { Animated, Dimensions, Platform } from "react-native";

export const useBottomSheetConfig = (
  androidSnapPoints,
  iosSnapPoints,
  kownBotSheetChangeUpOrDown = () => {}
) => {
  const trackMePosition = useRef(new Animated.Value(0)).current;
  const [bottomSheetPosition, setBottomSheetPosition] = useState(0);

  const screenHeight = Dimensions.get("window").height;

  const [mapHeight, setMapHeight] = useState(
    Platform.OS === "ios" ? iosSnapPoints[0] : androidSnapPoints[0]
  );

  const snapPoints = useMemo(
    () => (Platform.OS === "ios" ? iosSnapPoints : androidSnapPoints),
    [androidSnapPoints, iosSnapPoints]
  );

  const previousSnapIndex = useRef(1);

  // Animation for "Track Me" button
  const trackMeTranslateY = trackMePosition.interpolate({
    inputRange: [0, 1],
    outputRange: [bottomSheetPosition, bottomSheetPosition + 100], // Adjust text position
  });

  // Handle BottomSheet change
  const handleSheetChange = useCallback(
    (index) => {
      // Update bottom sheet position and animate "Track Me" button
      setBottomSheetPosition(index); // Changed 'position' to 'index'
      Animated.timing(trackMePosition, {
        toValue: index, // Use the index for animation
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Adjust map height based on snap point index
      let height = screenHeight * 0.95;
      if (index === 1) {
        height = screenHeight * 0.6;
      }
      setMapHeight(height);

      // Determine if the sheet moved up or down
      if (index > previousSnapIndex.current) {
        kownBotSheetChangeUpOrDown("moved up");
      } else if (index < previousSnapIndex.current) {
        kownBotSheetChangeUpOrDown("moved down");
      }

      // Update previous snap index
      previousSnapIndex.current = index;
    },
    [screenHeight, trackMePosition, kownBotSheetChangeUpOrDown]
  );

  return { mapHeight, snapPoints, handleSheetChange, trackMeTranslateY };
};
