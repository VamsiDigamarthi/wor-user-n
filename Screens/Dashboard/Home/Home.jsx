import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import DropLocation from "../../../Components/Dashboard/DropLocation/DropLocation";
import AllServices from "../../../Components/Dashboard/Home/AllServices/AllServices";
import SliderComponent from "../../../Utils/SliderComponent/SliderComponent";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/Features/Auth/LoginSlice";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const handleRideBookNavigation = async () => {
    await AsyncStorage.removeItem("token");
    // dispatch(logout());
    navigation.replace("AuthStack");
  };
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Image
          source={{
            uri: "https://developers.google.com/static/maps/images/landing/hero_maps_static_api.png",
          }}
          style={styles.mapImage} // Define your desired styles here
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={styles.bottomSheet}>
          <Text style={styles.text}></Text>
          <DropLocation />
          <AllServices />
          <SliderComponent />
        </View>
        <CustomBtn title="remove" onPress={handleRideBookNavigation} />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  mapContainer: {
    width: "100%",
    paddingHorizontal: 20,
    height: 200,
  },
  mapImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Make sure the image covers the container
  },
  bottomSheet: {
    width: "100%",
    height: "fit-content",
    paddingHorizontal: 26,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 28,
    backgroundColor: "#fff5f9",
  },
  text: {
    width: 120,
    height: 4,
    backgroundColor: "#E02E88",
    borderRadius: 100,
  },
});
