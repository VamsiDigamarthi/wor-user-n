import { View, Text, StyleSheet, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useRideHistoryHook } from "../RideHistory/Hooks/RideHistory.hook";
import RideHistoryItem from "../RideHistory/Components/RideHistoryItem";
import FaqListCard from "../RideHistory/Components/FaqListCard";
import AppBarLayout from "../../ridebooking/sharedLogics/AppBarLayout";
import { fonts } from "../../../fonts/Fonts";
import { memo } from "react";

function HelpAndSupport() {
  const navigation = useNavigation();
  const { rideHistory } = useRideHistoryHook();

  return (
    <AppBarLayout title="Help & WoR Support" isPositionAppbar>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.heading}>My Rides</Text>
          <Pressable
            onPress={() => navigation.navigate("RideHistory")}
            style={styles.pressable}
          >
            <Text style={styles.heading}>See All</Text>
            <AntDesign name="caretright" size={20} color="#EA4C89" />
          </Pressable>
        </View>

        <View style={styles.rideContainer}>
          {rideHistory.slice(0, 2).map((ride, index) => (
            <RideHistoryItem key={index} ride={ride} />
          ))}
        </View>

        <View style={styles.supportContainer}>
          <Text style={styles.heading}>Help & WoR Support</Text>
          <FaqListCard />
        </View>
      </View>
    </AppBarLayout>
  );
}

export default memo(HelpAndSupport);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    paddingTop: 100,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pressable: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  heading: {
    fontFamily: fonts.robotoSemiBold,
    color: "#2D2D2D",
    fontSize: 16,
  },
  rideContainer: {
    marginTop: 10,
  },
  supportContainer: {
    marginTop: 10,
  },
});
