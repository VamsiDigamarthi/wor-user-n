import { Image, Text, TouchableOpacity, View } from "react-native";

import icon from "../../../../../assets/images/sosimages/personIcon.png";
import { COLORS } from "../../../../../Constants/colors";

export default function PersonIconWithName({ name, mobile, onClick }) {
  // Function to handle sharing location via SMS or WhatsApp

  return (
    <TouchableOpacity onPress={onClick}>
      <View style={{ gap: 4, alignItems: "center" }}>
        <Image
          source={icon}
          style={{ height: 50, width: 50, borderRadius: 20 }}
        />
        <Text style={{ fontSize: 11 }}>{name?.slice(0, 10)}</Text>
        <Text style={{ fontSize: 11, color: COLORS.lightGray }}>{mobile}</Text>
      </View>
    </TouchableOpacity>
  );
}
