import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { usePoliceStatonsHook } from "./PoliceStatons.hook";
import UnorderList from "./components/UnorderList";
import PoliceStationMapItem from "./components/MapCard";

export default function PoliceStatons({ onPress }) {
  const instructions = [
    "If there is any emergency, you can press the alert button.",
    "It will automatically inform your live location to the police station.",
  ];

  const { policeStation, location } = usePoliceStatonsHook();

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center", paddingVertical: 5 }}>
        <TouchableOpacity
          onPress={() => onPress("main")}
          style={styles.backButton}
        >
          <FontAwesome name="chevron-left" size={15} color="#e02e88" />
          <Text>Back</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.headerText}>Police Stations Near You</Text>
      <UnorderList instructions={instructions} />

      {policeStation?.length > 0 ? (
        <BottomSheetFlatList
          data={policeStation}
          keyExtractor={(item) => item?.place_id}
          renderItem={({ item }) => (
            <PoliceStationMapItem
              policeStation={item}
              presentUserCoordinates={location}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.loaderContainer}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    marginTop: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    // elevation: 2,
    gap: 8,
    // marginBottom: 10,
    width: "100%",
    height: 500,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  listContent: {
    paddingBottom: 20, // Adds space at the bottom of the list
  },
  loaderContainer: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
