import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Pressable,
  Linking,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { usePoliceStatonsHook } from "./PoliceStatons.hook";
import UnorderList from "./components/UnorderList";
import PoliceStationMapItem from "./components/MapCard";
import { Ionicons } from "@expo/vector-icons";

export default function PoliceStatons({ onPress }) {
  const instructions = [
    "If there is any emergency, you can press the alert button.",
    // "It will automatically inform your live location to the police station.",
  ];

  const { policeStation, location } = usePoliceStatonsHook();

  const handleSoSCaller = (number) => {
    const url = `tel:${number}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Dialer is not supported on this device");
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

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

      <Pressable
        onPress={() => handleSoSCaller("100")}
        style={styles.innerCard}
      >
        <View>
          <Text style={styles.heading}>{"In Case of Any Emergency"}</Text>
          <Text style={styles.subText}>{"Dial 100"}</Text>
        </View>

        <Ionicons size={22} color="#EA4C89" name="call" />
      </Pressable>

      <Text style={styles.headerText}>Police Stations Near You</Text>
      <UnorderList instructions={instructions} />

      {policeStation?.length > 0 ? (
        <FlatList
          scrollEnabled
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
    // flex: 1,
    backgroundColor: "white",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // gap: 8,
    // marginBottom: 10,
    height: 500,
    width: "100%",
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
    paddingBottom: 20,
  },
  loaderContainer: {
    width: "100%",
    // height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f2f2f2", // lighter gray
    padding: 14,
    borderRadius: 12,
    elevation: 2, // for subtle shadow on Android
    shadowColor: "#000", // for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginVertical: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    letterSpacing: 0.5,
  },
  subText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
});
