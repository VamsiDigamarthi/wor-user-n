import { FontAwesome } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

const StarRating = ({ rating, color = "#e02e88", width = "100%" }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <View style={{ width: width, flexDirection: "row", gap: 2 }}>
      {Array(fullStars)
        .fill()
        .map((_, i) => (
          <FontAwesome key={i} name="star" color={color} size={20} />
        ))}

      {halfStar && (
        <FontAwesome name="star-half-full" size={20} color={color} />
      )}

      {Array(emptyStars)
        .fill()
        .map((_, i) => (
          <FontAwesome key={i} name="star-o" size={20} color={color} />
        ))}
    </View>
  );
};

export default StarRating;
