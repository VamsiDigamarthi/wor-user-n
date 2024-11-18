import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AllServices = ({ placeName, location, nearbyPlaces }) => {
  const navigation = useNavigation();

  const onNavigateParcelScreen = () => {
    navigation.navigate("ParcelHome");
  };

  const onNavaigetPickLocationScreen = (vehicle) => {
    console.log(vehicle);
    navigation.navigate("SelectDropLocation", {
      placeName, // this prop is store current location text,
      pickUpCoordinated: location, // this prop store current location user coordinates to pass price screen to calculate the price
      nearbyPlaces, // this prop store nearby places from user current location to 1 km radius famous location [place this data into "select drop location screen to display initial locations"]
      selectedVehicleType: vehicle,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.serviceTextCard}>
        <Text style={styles.headerText}>Services Now</Text>
        <View style={styles.viewAllCard}>
          <Text style={styles.viewAllText}>View All</Text>
          <Ionicons name="arrow-forward" size={20} color="#E02E88" />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {/* Service Items */}
        <View style={styles.singleItem}>
          <Pressable
            onPress={onNavaigetPickLocationScreen.bind(this, "scooty")}
          >
            <Image
              source={require("../../../../assets/images/scooty.png")}
              style={styles.image} // Apply styles for images
            />
            <Text>Scooty</Text>
          </Pressable>
        </View>
        <View style={styles.singleItem}>
          <Pressable onPress={onNavaigetPickLocationScreen.bind(this, "car")}>
            <Image
              source={require("../../../../assets/images/car.png")}
              style={styles.image}
            />
            <Text>Car</Text>
          </Pressable>
        </View>
        <View style={styles.singleItem}>
          <Pressable onPress={onNavaigetPickLocationScreen.bind(this, "auto")}>
            <Image
              source={require("../../../../assets/images/auto.png")}
              style={styles.image}
            />
            <Text>Auto</Text>
          </Pressable>
        </View>
        <View style={styles.singleItem}>
          <Pressable onPress={onNavigateParcelScreen}>
            <Image
              source={require("../../../../assets/images/image.png")}
              style={styles.image}
            />
            <Text>Parcel</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default AllServices;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ffe2e6",
  },
  serviceTextCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10, // Add some spacing
  },
  viewAllCard: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    paddingVertical: 10, // Vertical padding for the ScrollView
  },
  singleItem: {
    marginRight: 10, // Space between cards
    minWidth: 100, // Minimum width for cards
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#f5f5f5",
  },
  image: {
    width: 60, // Define width for images
    height: 60, // Define height for images
    marginBottom: 5, // Space between image and text
    resizeMode: "contain",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewAllText: {
    color: "#E02E88",
  },
});
