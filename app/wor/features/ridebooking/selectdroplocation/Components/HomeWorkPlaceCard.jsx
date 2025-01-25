import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeLocationCard from "../../../../utiles/HomeLocationCard";
import { useDispatch, useSelector } from "react-redux";
import CustomBtn from "../../../../utiles/CustomBtn";
import { useNavigation } from "@react-navigation/native";
import {
  setDropDetails,
  setInitialDropDetails,
} from "../../sharedLogics/rideDetailsSlice";
import AddHomePlaceBtn from "./AddHomePlaceBtn";

const HomeWorkPlaceCard = ({ handleAddedHomePlace }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { homePlace, workPlace } = useSelector((state) => state.homePlaces);
  const { isParcScreen } = useSelector((state) => state.allRideDetails);

  const onNavigateShowPriceScreen = (type) => {
    let place = type === "home" ? homePlace : workPlace;
    dispatch(setDropDetails(place));

    if (isParcScreen) {
      dispatch(setInitialDropDetails(place));
      navigation.navigate("ChangeLoc100mViaMap");
      return;
    }

    navigation.navigate("ShowPrice");
  };

  return (
    <View style={styles.homeWorLocationCard}>
      {homePlace ? (
        <HomeLocationCard
          onPress={() => onNavigateShowPriceScreen("home")}
          location="Home"
          vicinity={homePlace?.vicinity}
        />
      ) : (
        <AddHomePlaceBtn
          iconType="Entypo"
          iconsName="home"
          onPress={() => handleAddedHomePlace({ type: "home" })}
        />
      )}
      {workPlace ? (
        <HomeLocationCard
          location="Work"
          vicinity={workPlace?.vicinity}
          iconType="AntDesign"
          iconName="star"
          onPress={() => onNavigateShowPriceScreen("home")}
        />
      ) : (
        <AddHomePlaceBtn
          iconType="MaterialIcons"
          iconsName="work"
          title="Work"
          subTitle="Add Work Place"
          onPress={() => handleAddedHomePlace({ type: "work" })}
        />
      )}
      {/* <HomeLocationCard
        location="Work"
        vicinity={workPlace?.vicinity}
        iconType="AntDesign"
        iconName="star"
        onPress={() => onNavigateShowPriceScreen("home")}
      /> */}
    </View>
  );
};

export default HomeWorkPlaceCard;

const styles = StyleSheet.create({
  homeWorLocationCard: {
    backgroundColor: "#f7f7f7",
    width: "100%",
    // height: "20%",
    gap: 5,
    justifyContent: "space-around",
    alignItems: "center",
    // backgroundColor: "blue",
  },
});
