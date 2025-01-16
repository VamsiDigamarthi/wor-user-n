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
import Infopressicons from "../../../../../../../Utils/BottomSheet/Components/Infopressicons";
import ModalUI from "../../../../../../../Utils/Modal/Modal";
import { infoModalStyles } from "../../../../../../../Components/InfoUi/Styles/InfoModalStyles";
import OtpInfoUi from "../../../../../../../Components/InfoUi/OtpInfoUi";
import { dashBoard } from "../../../../../../../Components/InfoUi/data/infoData";
// A reusable service card component
const ServiceCard = ({ imageSource, label, onPress }) => {
  return (
    <View
      style={{
        alignItems: "center",
        marginBottom: 8,
      }}
    >
      <Pressable
        onPress={onPress}
        style={{
          backgroundColor: "#F2F0F5",
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 15,
        }}
      >
        <Image source={imageSource} style={styles.image} />
      </Pressable>
      <Text style={{ fontWeight: "bold", color: "#757575" }}>{label}</Text>
    </View>
  );
};

const AllServices = ({ placeName, location, nearbyPlaces }) => {
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
    });
  };

  const renderServices = () => {
    const services = [
      {
        label: "Scooty",
        image: require("../../../../../../../assets/images/HomeServiceImages/scooty.png"),
        vehicle: "scooty",
      },
      {
        label: "Car",
        image: require("../../../../../../../assets/images/HomeServiceImages/cab.png"),
        vehicle: "car",
      },
      {
        label: "Auto",
        image: require("../../../../../../../assets/images/HomeServiceImages/auto.png"),
        vehicle: "auto",
      },

      {
        label: "Parcel",
        image: require("../../../../../../../assets/images/HomeServiceImages/gift.png"),
        vehicle: null,
        isParcel: true,
      },
      {
        label: "Parcel",
        image: require("../../../../../../../assets/images/HomeServiceImages/gift.png"),
        vehicle: null,
        isParcel: true,
      },
      {
        label: "Parcel",
        image: require("../../../../../../../assets/images/HomeServiceImages/scooty.png"),
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
          <Text style={styles.headerText}>Services</Text>
          {/* <Infopressicons onHandleOpenInfoModal={onHandleOpenInfoModal} /> */}
        </View>
        <View style={styles.viewAllContainer}>
          {/* <Pressable
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            onPress={toggleViewAll}
          >
            <Text style={styles.viewAllText}>
              {viewAll ? "Remove All" : "View All"}
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#E02E88" />
          </Pressable> */}
        </View>
      </View>

      <View style={styles.serviceGrid}>{renderServices()}</View>

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
    width: 70,
    height: 70,
    // marginBottom: 5,
    resizeMode: "contain",
  },
  scrollView: {
    paddingVertical: 10,
  },
});
