import { Image, Text, View } from "react-native";

import icon from "../../../../../assets/images/sosimages/personIcon.png";
import { COLORS } from "../../../../../Constants/colors";

export default function PersonIconWithName({ name, mobile }) {
  return (
    <View style={{ gap: 4, alignItems: "center" }}>
      <Image
        source={icon}
        style={{ height: 60, width: 60, borderRadius: 20 }}
      />
      <Text>{name}</Text>
      <Text style={{ fontSize: 11, color: COLORS.lightGray }}>{mobile}</Text>
    </View>
  );
}
