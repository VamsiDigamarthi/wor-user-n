import { View, Text, StyleSheet, Pressable } from "react-native";
import CustomeAppbar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useRideHistoryHook } from "../RideHistory/Hooks/RideHistory.hook";
import RideHistoryItem from "../RideHistory/Components/RideHistoryItem";
import FaqListCard from "../RideHistory/Components/FaqListCard";
import AppBarLayout from "../../ridebooking/sharedLogics/AppBarLayout";
import { fonts } from "../../../fonts/Fonts";
export default function HelpAndSupport() {
  const navigation = useNavigation();
  const { rideHistory } = useRideHistoryHook();
  return (
    <AppBarLayout title="Help & WoR Support" isPositionAppbar={true}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.heading}>My Rides</Text>
          <Pressable
            onPress={() => navigation.navigate("RideHistory")}
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          >
            <Text style={styles.heading}>See All</Text>
            <AntDesign name="caretright" size={20} color="#EA4C89" />
          </Pressable>
        </View>

        <View style={{ marginTop: 10 }}>
          {rideHistory[0] && <RideHistoryItem ride={rideHistory[0]} />}
          {rideHistory[1] && <RideHistoryItem ride={rideHistory[1]} />}
        </View>

        <View style={{ marginTop: 10 }}>
          <FaqListCard />
        </View>
      </View>
    </AppBarLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#fff",
    marginTop: 10,
    paddingTop: 90,
  },

  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  heading: {
    // fontWeight: "bold",
    fontFamily:fonts.robotoSemiBold,
    color: "#2D2D2D",
    fontSize: 16,
  },
});
