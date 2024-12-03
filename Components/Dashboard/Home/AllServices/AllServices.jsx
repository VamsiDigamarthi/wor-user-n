import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Infopressicons from "../../../../Utils/BottomSheet/Components/Infopressicons";
import ModalUI from "../../../../Utils/Modal/Modal";
import { infoModalStyles } from "../../../InfoUi/Styles/InfoModalStyles";
import OtpInfoUi from "../../../InfoUi/OtpInfoUi";
import { dashBoard } from "../../../InfoUi/data/infoData";
// A reusable service card component
const ServiceCard = ({ imageSource, label, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.singleItem}>
      <Image source={imageSource} style={styles.image} />
      <Text>{label}</Text>
    </Pressable>
  );
};

const AllServices = ({
  placeName,
  location,
  nearbyPlaces,
  favoritePlaces,
  previousOrders,
}) => {
  const navigation = useNavigation();
  const [viewAll, setViewAll] = useState(false);

  const toggleViewAll = () => setViewAll((prev) => !prev);

  const navigateToParcelScreen = () => {
    navigation.navigate("ParcelHome");
  };

  const navigateToPickLocationScreen = (vehicle) => {
    navigation.navigate("SelectDropLocation", {
      placeName, // current location text
      pickUpCoordinated: location, // user coordinates to calculate the price
      nearbyPlaces, // nearby places for the "select drop location" screen
      selectedVehicleType: vehicle,
      favoritePlaces,
      previousOrders,
    });
  };

  const renderServices = () => {
    const services = [
      {
        label: "Scooty",
        image: require("../../../../assets/images/scooty.png"),
        vehicle: "scooty",
      },
      {
        label: "Car",
        image: require("../../../../assets/images/car.png"),
        vehicle: "car",
      },
      {
        label: "Auto",
        image: require("../../../../assets/images/auto.png"),
        vehicle: "auto",
      },
      {
        label: "Parcel",
        image: require("../../../../assets/images/image.png"),
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

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const onHandleOpenInfoModal = () => {
    setIsInfoModalOpen(!isInfoModalOpen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Text style={styles.headerText}>Services Now</Text>
          <Infopressicons onHandleOpenInfoModal={onHandleOpenInfoModal} />
        </View>
        <View style={styles.viewAllContainer}>
          <Pressable onPress={toggleViewAll}>
            <Text style={styles.viewAllText}>
              {viewAll ? "Remove All" : "View All"}
            </Text>
          </Pressable>
          <Ionicons name="arrow-forward" size={20} color="#E02E88" />
        </View>
      </View>

      {viewAll ? (
        <View style={styles.serviceGrid}>{renderServices()}</View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
        >
          {renderServices()}
        </ScrollView>
      )}

      <ModalUI
        openCloseState={isInfoModalOpen}
        closeModalFun={onHandleOpenInfoModal}
        modalStyle="slide"
        style={infoModalStyles.aadharModalStyles}
        insideCardStyle={infoModalStyles.insideCardStyle}
        btnText="Okay, Got It"
        btnStyles={infoModalStyles.modalCloseBtn}
        btnTextStyle={infoModalStyles.btnTextStyle}
      >
        <OtpInfoUi mainTitle="Dash Board" data={dashBoard} />
      </ModalUI>
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
    // borderWidth: 1,
    borderColor: "#ffe2e6",
    elevation: 1,
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
    color: "#E02E88",
    marginRight: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  serviceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: "space-between",
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
    width: 60,
    height: 60,
    marginBottom: 5,
    resizeMode: "contain",
  },
  scrollView: {
    paddingVertical: 10,
  },
});
