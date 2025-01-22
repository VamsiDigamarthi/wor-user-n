import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeLocationCard from "../../../../utiles/HomeLocationCard";
import { useDispatch, useSelector } from "react-redux";
import CustomBtn from "../../../../utiles/CustomBtn";
import { useNavigation } from "@react-navigation/native";
import {
  setDropDetails,
  setInitialDropDetails,
} from "../../sharedLogics/rideDetailsSlice";

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
        <CustomBtn
          title="Add Home Place"
          borderWidth={1}
          borderColor="#e02e88"
          btnColor="#e02e88"
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
        <CustomBtn
          title="Add Work Place"
          borderWidth={1}
          borderColor="#e02e88"
          btnColor="#e02e88"
          onPress={() => handleAddedHomePlace({ type: "work" })}
        />
      )}
    </View>
  );
};

export default HomeWorkPlaceCard;

const styles = StyleSheet.create({
  homeWorLocationCard: {
    backgroundColor: "#fff",
    width: "100%",
    height: "25%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
