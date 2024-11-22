import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import DropLocation from "../../../Components/Dashboard/DropLocation/DropLocation";
import AllServices from "../../../Components/Dashboard/Home/AllServices/AllServices";
import SliderComponent from "../../../Utils/SliderComponent/SliderComponent";
import { useHomeHook } from "./Home.hook";
import BackgroundImage from "../../../Utils/BackgroundImage/BackgroundImage";
import HomeMap from "../../../Utils/HomeMap/HomeMap";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, useNavigation } from "@react-navigation/native";
import ActiveRide from "../../../Utils/ActiveRide/ActiveRide";

const Home = () => {
  const navigation = useNavigation();

  const {
    location,
    nearByRandomItems,
    placeName,
    nearbyPlaces,
    activeOrder,
    favoritePlaces, // this is favorite places from show one place in home screen
    previousOrders, // this is previous order show in home screen
  } = useHomeHook();

  const onBackLogin = async () => {
    await AsyncStorage.removeItem("token");
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "AuthStack" }],
      })
    );
    // navigation.navigate("RideHistory"); // replace AuthStack with your stack name for login screen
  };

  // console.log(activeOrder);

  return (
    <View style={styles.container}>
      <HomeMap location={location} />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.bottomSheet}>
          <Text style={styles.text}></Text>
          <DropLocation
            nearByRandomItems={nearByRandomItems} // this is display 3 items
            placeName={placeName} // this prop is store current location text
            nearbyPlaces={nearbyPlaces} // this prop store nearby places from user current location to 1 km radius famous location [place this data into "select drop location screen to display initial locations"]
            location={location} // this is location used for pass this data into price screen
            // activeOrder={activeOrder} // check if active order have any pending status this will prevent  create another another
            favoritePlaces={favoritePlaces}
            previousOrders={previousOrders}
          />
          <AllServices
            placeName={placeName}
            nearbyPlaces={nearbyPlaces}
            location={location}
            favoritePlaces={favoritePlaces}
            previousOrders={previousOrders}
          />
          <SliderComponent />
          <BackgroundImage />
          <Button title="Go Back" onPress={onBackLogin} />
        </View>
      </ScrollView>
      {Object.keys(activeOrder)?.length > 0 && (
        <ActiveRide activeOrder={activeOrder} />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },

  scrollContainer: {
    paddingTop: 250,
  },
  bottomSheet: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: "#fff5f9",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    zIndex: 1,
    gap: 5,
  },
  text: {
    width: 60,
    height: 3,
    backgroundColor: "#ffe2e6",
    borderRadius: 100,
    alignSelf: "center",
    marginVertical: 10,
  },
});
