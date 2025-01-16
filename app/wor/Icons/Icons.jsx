import { Feather, Ionicons, FontAwesome } from "@expo/vector-icons";

export const UserIcons = ({ size, color }) => (
  <Feather name="user" size={size} color={color} />
);

export const SearchIcons = ({ size, color }) => (
  <Ionicons name="search-sharp" size={size} color={color} />
);

export const MicIcon = ({ size, color }) => (
  <FontAwesome name="microphone" size={size} color={color} />
);

export const PinIcon = ({ size, color }) => (
  <FontAwesome name="map-pin" size={size} color={color} />
);
