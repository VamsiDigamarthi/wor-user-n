import {
  Feather,
  Ionicons,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons";

export const HamborgIcon = ({ size, color }) => (
  <Ionicons name="menu" size={28} color="gray" />
);

export const AddIcon = ({ size, color }) => (
  <Entypo name="circle-with-plus" size={28} color="gray" />
);

export const UserIcons = ({ size, color }) => (
  <Feather name="user" size={size} color={color} />
);

export const CalendarIcons = ({ size, color }) => (
  <FontAwesome5 name="calendar-alt" size={size} color={color} />
);

export const SearchIcons = ({ size, color }) => (
  <Ionicons name="search-sharp" size={size} color={color} />
);

export const BookIcon = ({ size, color, style }) => (
  <FontAwesome name="book" style={style} size={size} color={color} />
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

export const CallIcon = ({ size, color }) => (
  <Ionicons name="call" size={size} color={color} />
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

export const BackIcon = ({ size, color }) => (
  <MaterialIcons name="arrow-back-ios-new" size={size} color={color} />
);

export const ForwardArrowIcon = ({ size, color }) => (
  <MaterialIcons name="arrow-forward-ios" size={size} color={color} />
);

export const SupportIcons = ({ size, color }) => (
  <MaterialIcons name="support-agent" size={size} color={color} />
);

export const ClockIcons = ({ size, color }) => (
  <MaterialCommunityIcons
    name="clock-time-eight-outline"
    size={size}
    color={color}
  />
);

export const InfoIcons = ({ size, color }) => (
  <AntDesign name="infocirlceo" size={size} color={color} />
);

export const PhoneIcon = ({ size, color }) => (
  <FontAwesome name="phone" size={size} color={color} />
);
