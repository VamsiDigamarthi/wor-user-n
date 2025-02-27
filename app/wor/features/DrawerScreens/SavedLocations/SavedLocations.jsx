import { View, Text, StyleSheet } from "react-native";
import TopCard from "./Components/TopCard";

import AppBarLayout from "../../ridebooking/sharedLogics/AppBarLayout";
import { fonts } from "../../../fonts/Fonts";
import AddNewPlace from "./Components/AddNewPlace";
import RideParcelList from "./Components/RideParcelList";
import AddHomeAndWorkPlaces from "./Components/AddHomeAndWorkPlaces";
import { useSelector } from "react-redux";

export default function SavedLocations() {
  const { otherHomePlace } = useSelector((state) => state.homePlaces);
  return (
    <AppBarLayout title="Saved Location" isPositionAppbar={true}>
      <View style={styles.container}>
        <Text style={styles.heading}>Saved Places</Text>

        <AddHomeAndWorkPlaces />
        {!otherHomePlace && <AddNewPlace />}

        <Text style={styles.heading}>All Saved Places</Text>
        <RideParcelList />
      </View>
    </AppBarLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 16,
    flex: 1,
    backgroundColor: "#f3f2f7",
    paddingTop: 120,
  },
  heading: {
    fontSize: 16,
    fontFamily: fonts.robotoSemiBold,
  },
});
