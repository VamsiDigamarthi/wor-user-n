import {
  Alert,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ModalUI from "../../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../../Components/InfoUi/Styles/InfoModalStyles";
import { AddIcon, UserIcons } from "../../../../Icons/Icons";
import { emergencyContact } from "../Services/emergencyContact";
import { useSelector } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useLocationTracking } from "../Hooks/LocationTracking.hook";
import { useSocket } from "../../../../../../SocketContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EmergencyContactModal = ({ openModal, closeModal }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const { token } = useSelector((state) => state.token);
  const { completeRideDetails } = useSelector((state) => state.allRideDetails);
  const { socket, isConnected } = useSocket();
  const [isLiveTrackingEnabled, setIsLiveTrackingEnabled] = useState(false);

  const { locationRef } = useLocationTracking(
    completeRideDetails?._id,
    socket,
    isConnected,
    isLiveTrackingEnabled
  );

  const [userBackendContactNumber, setUserBackendContactNumber] = useState([]);

  const handleFetchEmergecyContact = async () => {
    const data = await emergencyContact({ token });
    if (data) {
      setUserBackendContactNumber(data);
    }
  };

  const handleNavigateEmenrgencyContcat = () => {
    navigation.navigate("EmergencyContactNumber");
  };

  useEffect(() => {
    if (isFocused) {
      handleFetchEmergecyContact();
      checkStoredLiveTracking();
    }
  }, [isFocused]);

  const checkStoredLiveTracking = async () => {
    try {
      const storedRideId = await AsyncStorage.getItem("liveTrackingRideId");
      if (storedRideId === completeRideDetails?._id) {
        setIsLiveTrackingEnabled(true); // Continue live tracking
      } else {
        await AsyncStorage.removeItem("liveTrackingRideId"); // Remove if different
        setIsLiveTrackingEnabled(false); // Stop live tracking
      }
    } catch (error) {
      console.error("Error checking live tracking state:", error);
    }
  };

  const shareLocation = async (mobile, link) => {
    setIsLiveTrackingEnabled(true);
    const locationLink = `http://localhost:3000/live-tracking/${completeRideDetails?._id}?startLat=${completeRideDetails?.pickup?.coordinates[1]}&startLng=${completeRideDetails?.pickup?.coordinates[0]}&destLat=${completeRideDetails?.drop?.coordinates[1]}&destLng=${completeRideDetails?.drop?.coordinates[0]}`;

    const message = `Hi, I am sharing my location: ${locationLink}`;
    let formattedMobile = mobile.split(" ").join("");

    if (!formattedMobile?.startsWith("+91")) {
      formattedMobile = "+91" + formattedMobile;
    }
    const phoneNumber = `+${formattedMobile}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;

    Linking.openURL(whatsappUrl).catch(() => {
      Alert.alert("Something Went Wrong");
    });

    // Store the ride ID for live tracking
    try {
      await AsyncStorage.setItem(
        "liveTrackingRideId",
        completeRideDetails?._id
      );
    } catch (error) {
      console.error("Error storing live tracking state:", error);
    }
  };

  return (
    <ModalUI
      openCloseState={openModal}
      closeModalFun={closeModal}
      modalStyle="slide"
      style={infoModalStyles.aadharModalStyles}
      insideCardStyle={infoModalStyles.insideCardStyle}
      closebtn={false}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>
          Share your ride to your trusted ones for your safety
        </Text>
        <Text style={styles.subText}>You can share upto 5 members</Text>
        <View style={styles.contactMain}>
          {userBackendContactNumber?.map((contact, index) => (
            <Pressable
              onPress={() => shareLocation(contact?.mobile)}
              key={index}
              style={styles.contact}
            >
              <View style={styles.imageCard}>
                <UserIcons size={30} color="#EA4C89" />
              </View>
              <Text style={styles.name}>{contact?.name}</Text>
            </Pressable>
          ))}

          {userBackendContactNumber?.length < 5 && (
            <Pressable
              style={styles.contact}
              onPress={handleNavigateEmenrgencyContcat}
            >
              <View style={styles.imageCard}>
                <AddIcon size={30} color="#EA4C89" />
              </View>
              <Text style={styles.name}>Add</Text>
            </Pressable>
          )}
        </View>
      </View>
    </ModalUI>
  );
};

export default EmergencyContactModal;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingVertical: 30,
    width: "100%",
    gap: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 22,
  },
  subText: {
    fontSize: 16,
    color: "gray",
  },
  contactMain: {
    flexDirection: "row",
    gap: 7,
    width: "100%",
    flexWrap: "wrap",
  },
  contact: {
    gap: 5,
    alignItems: "center",
    flexWrap: "wrap",
  },
  imageCard: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f0f5",
    borderRadius: 10,
  },
  name: {
    fontSize: 13,
    width: 50,
    fontWeight: "600",
    textAlign: "center",
    overflow: "hidden",
  },
});
