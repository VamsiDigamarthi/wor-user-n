import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import DropLocation from "../../../Components/Dashboard/DropLocation/DropLocation";
import AllServices from "../../../Components/Dashboard/Home/AllServices/AllServices";
import SliderComponent from "../../../Utils/SliderComponent/SliderComponent";
import { useHomeHook } from "./Home.hook";
import BackgroundImage from "../../../Utils/BackgroundImage/BackgroundImage";
import HomeMap from "../../../Utils/HomeMap/HomeMap";

const Home = () => {
  const { location, nearbyPlaces, placeName } = useHomeHook();

  return (
    <View style={styles.container}>
      <HomeMap location={location} />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.bottomSheet}>
          <Text style={styles.text}></Text>
          <DropLocation nearbyPlaces={nearbyPlaces} placeName={placeName} />
          <AllServices />
          <SliderComponent />
          <BackgroundImage />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContainer: {
    paddingTop: 250,
  },
  bottomSheet: {
    width: "100%",
    paddingHorizontal: 26,
    paddingVertical: 12,
    backgroundColor: "#fff5f9",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    zIndex: 1,
    gap: 20,
  },
  text: {
    width: 120,
    height: 4,
    backgroundColor: "#E02E88",
    borderRadius: 100,
    alignSelf: "center",
    marginVertical: 10,
  },
});
