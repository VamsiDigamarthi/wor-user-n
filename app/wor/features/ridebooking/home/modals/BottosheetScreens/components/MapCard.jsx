import { Image, Pressable, StyleSheet, Text, View } from "react-native";
// import call from "../../../../../assets/images/sosimages/call2.png";
import location from "../../../../../../../../assets/images/sosimages/locationarrow.png";
import policestation from "../../../../../../../../assets/images/sosimages/policestationsmall.png";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function PoliceStationMapItem({
  policeStation,
  presentUserCoordinates,
}) {
  const navigation = useNavigation();

  const handlerNavigateToPolicestationMapScreen = (singlePoliceStation) => {
    // Navigate to PolicestationMapScreen with policeStation prop
    navigation.navigate("PoliceStationMapCard", {
      singlePoliceStation,
      presentUserCoordinates,
    });
  };

  return (
    <View style={styles.policeCard}>
      <View style={{ height: 40, width: 40 }}>
        <Image source={policestation} style={{ height: 30, width: 30 }} />
      </View>

      <View style={{ width: "65%" }}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {policeStation?.name}
        </Text>

        <Text style={{}} numberOfLines={2} ellipsizeMode="tail">
          {policeStation?.vicinity}
        </Text>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={{ flexDirection: "row", gap: 4, marginTop: 5 }}>
            <Entypo name="location-pin" size={24} color="black" />
            <Text>{policeStation?.distance}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 4, marginTop: 5 }}>
            <Ionicons name="timer-outline" size={24} color="black" />
            <Text>{policeStation?.duration}</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          justifyContent: "space-between",
          gap: 10,
          width: "10%",
          alignItems: "flex-start",
          height: "100%",
        }}
      >
        {/* <Image source={call} style={{ height: 30, width: 30 }} /> */}
        <Pressable
          onPress={() => handlerNavigateToPolicestationMapScreen(policeStation)}
        >
          <Image source={location} style={{ height: 30, width: 30 }} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  policeCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
    elevation: 2,
    // borderWidth: 1,
    // borderColor: "#e02e88",
    backgroundColor: "#fdfdfd",
    padding: 8,
    borderRadius: 8,
    // height: 100,
    marginBottom: 15,
  },
});
