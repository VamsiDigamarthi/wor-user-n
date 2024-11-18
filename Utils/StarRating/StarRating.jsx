import { FontAwesome } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <View style={{ width: "100%", flexDirection: "row", gap: 2 }}>
      {Array(fullStars)
        .fill()
        .map((_, i) => (
          <FontAwesome key={i} name="star" color="#e02e88" size={20} />
        ))}

      {halfStar && (
        <FontAwesome name="star-half-full" size={20} color="#e02e88" />
      )}

      {Array(emptyStars)
        .fill()
        .map((_, i) => (
          <FontAwesome key={i} name="star-o" size={20} color="#e02e88" />
        ))}
    </View>
  );
};

export default StarRating;
