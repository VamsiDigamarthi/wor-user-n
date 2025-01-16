import {
  Feather,
  Ionicons,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";

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

export const LocationIcon = ({ size, color }) => (
  <FontAwesome name="location-arrow" size={size} color={color} />
);

export const PickLocationIcon = ({ size, color }) => (
  <Ionicons name="location-sharp" size={size} color={color} />
);

export const EditIcons = ({ size, color }) => (
  <Feather name="edit" size={size} color={color} />
);

export const ArrowDonwIcons = ({ size, color }) => (
  <MaterialIcons name="arrow-drop-down" size={size} color={color} />
);

export const ArrowUpIcons = ({ size, color }) => (
  <MaterialIcons name="arrow-drop-up" size={size} color={color} />
);

export const FavoritesIcons = ({ size, color }) => (
  <MaterialIcons name="favorite-border" size={size} color={color} />
);
