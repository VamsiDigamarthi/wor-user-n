import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeLocationCard from "../../../../utiles/HomeLocationCard";
import { useDispatch, useSelector } from "react-redux";
import CustomBtn from "../../../../utiles/CustomBtn";
import { useNavigation } from "@react-navigation/native";
import {
  setDropDetails,
  setInitialDropDetails,
  setIsBeforeBook,
} from "../../sharedLogics/rideDetailsSlice";
import AddHomePlaceBtn from "./AddHomePlaceBtn";
import { setHomeOrWorkPlaceType } from "../redux/homePlaceType.slice";

const HomeWorkPlaceCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { homePlace, workPlace, otherHomePlace } = useSelector(
    (state) => state.homePlaces
  );
  const { isParcScreen } = useSelector((state) => state.allRideDetails);

  const onNavigateShowPriceScreen = (type) => {
    let place =
      type === "home"
        ? homePlace
        : type === "second-home"
        ? otherHomePlace
        : workPlace;

    console.log(place, "HOME WORK PLACE CLICKED");

    dispatch(setIsBeforeBook(true));
    dispatch(setDropDetails(place));

    if (isParcScreen) {
      dispatch(setInitialDropDetails(place));
      navigation.navigate("ChangeLoc100mViaMap");
      return;
    }

    navigation.navigate("ShowPrice");
  };

  const handleSetHomeOrWorkPlace = ({ type }) => {
    dispatch(setHomeOrWorkPlaceType(type));
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
          onPress={() => handleSetHomeOrWorkPlace({ type: "home" })}
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
          onPress={() => handleSetHomeOrWorkPlace({ type: "work" })}
        />
      )}
      {otherHomePlace && (
        <HomeLocationCard
          onPress={() => onNavigateShowPriceScreen("second-home")}
          location="Another Home Place"
          vicinity={otherHomePlace?.vicinity}
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
    gap: 10,
    justifyContent: "space-around",
    alignItems: "center",
    // backgroundColor: "blue",
  },
});
