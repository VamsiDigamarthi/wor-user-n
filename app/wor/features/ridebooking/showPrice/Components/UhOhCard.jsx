import { View, Text, Image } from "react-native";
import { ohoh } from "../../../../Images/Ride";

export default function UhOhCard() {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={ohoh}
        style={{ height: 200, width: 200, resizeMode: "contain" }}
      />

      <Text style={[{ color: "#000", fontSize: 18, fontWeight: "bold" }]}>
        Uh Oh !
      </Text>

      <Text style={[{ color: "#000", fontSize: 18, fontWeight: "bold" }]}>
        No Coupons Available currently
      </Text>
    </View>
  );
}
