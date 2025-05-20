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

  // Function to handle star press with half-star support
  const handleStarPress = (index, event) => {
    const touchX = event.nativeEvent.locationX;
    const starWidth = iconSize;
    const isHalf = touchX < starWidth / 2;
    const newRating = isHalf ? index + 0.5 : index + 1;

    setRating(newRating);
    if (onRatingChange) onRatingChange(newRating);
  };

  return (
    <View style={{ width: width, flexDirection: "row", gap: gap }}>
      {Array(5)
        .fill()
        .map((_, i) => {
          const isFullStar = i + 1 <= rating;
          const isHalfStar = i + 0.5 === rating;

          return (
            <TouchableOpacity
              key={i}
              activeOpacity={0.7}
              onPress={
                isFunCallable ? (event) => handleStarPress(i, event) : null
              }
            >
              {isFullStar ? (
                <FontAwesome name="star" color={color} size={iconSize} />
              ) : isHalfStar ? (
                <FontAwesome
                  name="star-half-full"
                  color={color}
                  size={iconSize}
                />
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
