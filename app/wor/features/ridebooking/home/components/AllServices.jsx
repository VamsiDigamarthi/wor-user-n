import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setSelectVehicleType } from "../../sharedLogics/rideDetailsSlice";
import { fonts } from "../../../../fonts/Fonts";
import {
  autoImg,
  parcelImg,
  scrootyImg,
  worMiniImg,
} from "../../../../Images/Home";
// A reusable service card component
const ServiceCard = ({ imageSource, label, onPress }) => {
  return (
    <View style={styles.serviceBtnContainer}>
      <Pressable onPress={onPress} style={styles.serviceCardBtn}>
        <Image source={imageSource} style={styles.image} />
      </Pressable>
      <Text style={styles.serviceCardLabel}>{label}</Text>
    </View>
  );
};

const AllServices = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const navigateToParcelScreen = () => {
    navigation.navigate("ParcelHome");
  };

  const navigateToPickLocationScreen = (vehicle) => {
    dispatch(setSelectVehicleType(vehicle));
    navigation.navigate("SelectDropLocation");
  };

  const renderServices1 = () => {
    const services = [
      {
        label: "Scooty",
        image: scrootyImg,
        vehicle: "scooty",
      },
      {
        label: "Wor Mini",
        image: worMiniImg,
        vehicle: "car",
      },
      {
        label: "Auto",
        image: autoImg,
        vehicle: "auto",
      },
    ];

    return services.map((service, index) => (
      <ServiceCard
        key={index}
        imageSource={service.image}
        label={service.label}
        onPress={
          service.isParcel
            ? navigateToParcelScreen
            : () => navigateToPickLocationScreen(service.vehicle)
        }
      />
    ));
  };

  const renderServices2 = () => {
    const services = [
      {
        label: "Wor Luxury",
        image: worMiniImg,
        vehicle: "wor-premium",
        // isParcel: true,
      },
      {
        label: "Parcel",
        image: parcelImg,
        vehicle: null,
        isParcel: true,
      },
      {
        label: "Parcel",
        image: scrootyImg,
        vehicle: null,
        isParcel: true,
      },
    ];

    return services.map((service, index) => (
      <ServiceCard
        key={index}
        imageSource={service.image}
        label={service.label}
        onPress={
          service.isParcel
            ? navigateToParcelScreen
            : () => navigateToPickLocationScreen(service.vehicle)
        }
      />
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>Services</Text>
        </View>
      </View>
      <View style={{ gap: 10 }}>
        <View style={styles.serviceGrid}>{renderServices1()}</View>
        <View style={styles.serviceGrid}>{renderServices2()}</View>
      </View>
    </View>
  );
};

export default AllServices;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fdfdfd",
    padding: 10,
    borderRadius: 10,

    // elevation: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  viewAllContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewAllText: {
    color: "#EA4C89",
    marginRight: 5,
  },
  headerText: {
    fontSize: 18,

    fontFamily: fonts.robotoBold,
  },
  serviceGrid: {
    flexDirection: "row",
    // flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  singleItem: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#f5f5f5",
    marginBottom: 10,
    minWidth: 95,
    marginRight: 10, // Space between cards in horizontal scroll
  },
  image: {
    width: 65,
    height: 65,
    // marginBottom: 5,
    resizeMode: "contain",
  },
  scrollView: {
    paddingVertical: 10,
  },

  serviceCardBtn: {
    backgroundColor: "#F2F0F5",
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 15,
  },

  serviceCardLabel: {
    color: "#757575",
    fontFamily: fonts.robotoSemiBold,
  },

  serviceBtnContainer: {
    alignItems: "center",
    marginBottom: 8,
  },
});
