import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AppBarLayout from "../sharedLogics/AppBarLayout";
import BottomSheetComponent from "../sharedLogics/BottomSheetComponent/BottomSheetComponent";
import { useBottomSheetConfig } from "../sharedLogics/BottomSheetComponent/useBottomSheetConfig";
import RatingCard from "./Components/RatingCard";
import WhatWeSay from "./Components/WhatWeSay";
import CustomBtn from "../../../utiles/CustomBtn";
import Toast from "react-native-toast-message";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const screenHeight = Dimensions.get("window").height;
const androidSnapPoints = [0.38, 0.7].map((p) => screenHeight * p); // Example snap points for Android
const iosSnapPoints = [0.15, 0.6].map((p) => screenHeight * p); // Example snap points for iOS

const FeedBackScreen = () => {
  const { token } = useSelector((state) => state.token);

  const { mapHeight, snapPoints, handleSheetChange } = useBottomSheetConfig(
    androidSnapPoints,
    iosSnapPoints
  );
  const navigation = useNavigation();

  const [ratingData, setRatingData] = useState({
    giveVehicleNumber: "yes",
    reviewTest: "",
    rating: 0,
  });

  const handleRatingChange = (key, value) => {
    setRatingData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onNavigateRatingScreen = () => {
    try {
      API.post(
        "/rating",
        {
          ...ratingData,
          ratingText: ratingData?.reviewTest,
          rating: ratingData?.rating,
          // orderId: orderDetails?._id,
          // userId: orderDetails?.head?._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Toast.show({
        text1: "review added successfully",
        type: "success",
        position: "bottom",
      });
      navigation.dispatch(
        CommonActions.reset({
          index: 0, // Ensures the specified route is the only route in the stack
          routes: [{ name: "AuthenticatedStack" }], // Replace 'Home' with your target screen name
        })
      );
    } catch (error) {
      console.log(error?.response?.data?.message);
      Toast.show({
        text1: error?.response?.data?.message ?? "Post Review Failed",
        type: "error",
        position: "bottom",
      });
      navigation.dispatch(
        CommonActions.reset({
          index: 0, // Ensures the specified route is the only route in the stack
          routes: [{ name: "AuthenticatedStack" }], // Replace 'Home' with your target screen name
        })
      );
    }
  };

  return (
    <AppBarLayout title="Ride On the way">
      <View style={styles.mapContainer}></View>
      <BottomSheetComponent
        backgroundColor="#f7f7f7"
        snapPoints={snapPoints}
        handleSheetChange={handleSheetChange}
      >
        <View style={styles.innerCard}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Feed Back</Text>
          <RatingCard
            handleRatingChange={handleRatingChange}
            rating={ratingData?.rating}
            setRatingData={setRatingData}
          />
          <WhatWeSay handleRatingChange={handleRatingChange} />
          <CustomBtn
            title="Submit & Proceed"
            btnBg={
              ratingData?.reviewTest?.length > 0 && ratingData?.rating > 0
                ? "#e02e88"
                : "#fff"
            }
            btnColor={
              ratingData?.reviewTest?.length > 0 && ratingData?.rating > 0
                ? "#fff"
                : "#000"
            }
            onPress={onNavigateRatingScreen}
          />
          <Text
            style={{ fontSize: 15, fontWeight: "600", textAlign: "center" }}
          >
            Thanks for choosing Women rider
          </Text>
        </View>
      </BottomSheetComponent>
    </AppBarLayout>
  );
};

export default FeedBackScreen;

const styles = StyleSheet.create({
  mapContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "red",
  },
  innerCard: {
    gap: 10,
    padding: 10,
    paddingBottom: 30,
  },
});
