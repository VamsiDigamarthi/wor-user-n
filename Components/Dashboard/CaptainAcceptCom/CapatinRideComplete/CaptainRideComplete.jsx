import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  CommonActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import CaptainDetails from "../CaptainDetails/CaptainDetails";
import RatingCard from "../RatingCard/RatingCard";
import CaptainRideCompletePriceCard from "./CaptainRideCompletePriceCard";
import Toast from "react-native-toast-message";
import { API } from "../../../../Constants/url";
import { useSelector } from "react-redux";
const CaptainRideComplete = () => {
  const { token } = useSelector((state) => state.token);
  const navigation = useNavigation();
  const route = useRoute();
  const { orderDetails, travellingTimeAndDistnace } = route.params;
  const [ratingData, setRatingData] = useState({
    giveVehicleNumber: "yes",
    reviewTest: "",
    reviewRating: "",
  });

  const handleRatingChange = (key, value) => {
    setRatingData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onNavigateRatingScreen = () => {
    console.log(ratingData);
    try {
      API.post(
        "/rating",
        {
          ...ratingData,
          ratingText: ratingData?.reviewTest,
          rating: ratingData?.reviewRating,
          orderId: orderDetails?._id,
          userId: orderDetails?.head?._id,
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

  // console.log(ratingData)

  const onGoBacktoHomeScreen = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0, // Ensures the specified route is the only route in the stack
        routes: [{ name: "AuthenticatedStack" }], // Replace 'Home' with your target screen name
      })
    );
  };

  return (
    <View style={styles.conatiner}>
      {/* <CustomeAppbar title="Ratings" onBack={() => navigation.goBack()} /> */}

      <View style={{ height: 10 }} />
      <ScrollView
        contentContainerStyle={{
          //   paddingBottom: 20, // Ensure padding at the bottom for scroll
          alignItems: "center",
          gap: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.firstCard}>
          <CaptainDetails captainDetails={orderDetails?.acceptCaptain} />
          <View style={styles.vehicleConfirm}>
            <Text style={styles.vehicleText}>
              was the vehicle number is correct
            </Text>
            <View style={{ flexDirection: "row", gap: 7 }}>
              <Pressable
                onPress={() =>
                  setRatingData((prev) => ({
                    ...prev,
                    giveVehicleNumber: "Yes",
                  }))
                }
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#EA4C89" }}
                >
                  Yes
                </Text>
              </Pressable>
              <Pressable
                onPress={() =>
                  setRatingData((prev) => ({
                    ...prev,
                    giveVehicleNumber: "No",
                  }))
                }
              >
                <Text style={{ fontSize: 14, fontWeight: "600" }}>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <RatingCard
          handleRatingChange={handleRatingChange}
          ratingData={ratingData}
          onNavigateRatingScreen={onNavigateRatingScreen}
        />
        <CaptainRideCompletePriceCard
          orderDetails={orderDetails}
          travellingTimeAndDistnace={travellingTimeAndDistnace}
        />
        <Pressable onPress={onGoBacktoHomeScreen}>
          <Text style={styles.skip}>skip to home screen</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default CaptainRideComplete;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 20,
  },
  firstCard: {
    width: "100%",
    padding: 20,
    borderWidth: 1,
    borderColor: "#ffe2e6",
    backgroundColor: "#fff",
    borderRadius: 10,
    gap: 20,
  },
  vehicleConfirm: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  vehicleText: {
    fontSize: 11,
  },
  skip: {
    fontSize: 14,
    fontWeight: "600",
    paddingBottom: 20,
  },
});
