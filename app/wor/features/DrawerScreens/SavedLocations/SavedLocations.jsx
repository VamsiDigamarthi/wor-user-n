import { View, Text, StyleSheet } from "react-native";
import TopCard from "./Components/TopCard";

import AppBarLayout from "../../ridebooking/sharedLogics/AppBarLayout";
import { fonts } from "../../../fonts/Fonts";
import AddNewPlace from "./Components/AddNewPlace";
import RideParcelList from "./Components/RideParcelList";
import AddHomeAndWorkPlaces from "./Components/AddHomeAndWorkPlaces";

export default function SavedLocations() {
  return (
    <AppBarLayout title="Saved Location">
      <View style={styles.container}>
        <Text style={styles.heading}>Saved Places</Text>

        <AddHomeAndWorkPlaces />
        <AddNewPlace />

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
  },
  heading: {
    fontSize: 16,
    fontFamily: fonts.robotoSemiBold,
  },
});
