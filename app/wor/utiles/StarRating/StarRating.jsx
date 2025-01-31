import { FontAwesome } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";
import { useState } from "react";

const StarRating = ({
  initialRating = 0,
  color = "#e02e88",
  width = "100%",
  iconSize = 20,
  gap = 2,
  onRatingChange, // callback to pass the new rating
  isFunCallable = true,
}) => {
  const [rating, setRating] = useState(initialRating);

  // Function to handle star press with fractional rating support
  const handleStarPress = (index, event) => {
    const touchX = event.nativeEvent.locationX; // Get the X position of the touch
    const starWidth = iconSize; // Each star's width
    const fraction = touchX / starWidth; // Calculate the fraction of the star that was clicked
    const newRating = index + fraction; // Create new rating with fraction included

    setRating(newRating);
    if (onRatingChange) onRatingChange(newRating);
  };

  return (
    <View style={{ width: width, flexDirection: "row", gap: gap }}>
      {Array(5)
        .fill()
        .map((_, i) => {
          const isFullStar = i < Math.floor(rating); // Full star condition
          const isPartialStar = i === Math.floor(rating); // Partial star condition
          const fractionalValue = rating - Math.floor(rating); // Calculate fractional part

          return (
            <TouchableOpacity
              key={i}
              activeOpacity={0.7}
              onPress={
                isFunCallable ? (event) => handleStarPress(i, event) : null
              } // Pass index and event to calculate rating
            >
              {isFullStar ? (
                <FontAwesome name="star" color={color} size={iconSize} />
              ) : isPartialStar ? (
                fractionalValue > 0 ? (
                  <FontAwesome
                    name="star-half-full"
                    color={color}
                    size={iconSize}
                  />
                ) : (
                  <FontAwesome name="star-o" color={color} size={iconSize} />
                )
              ) : (
                <FontAwesome name="star-o" color={color} size={iconSize} />
              )}
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

export default StarRating;
