import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import ModalUI from "../app/wor/utiles/Modal/Modal";
import { infoModalStyles } from "../Components/InfoUi/Styles/InfoModalStyles";
import { useDispatch, useSelector } from "react-redux";
import { setLocationBarrierModal } from "./redux/locationBarrierSlice";
import { useNavigation } from "@react-navigation/native";

const LocationBarrierModal = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { isDisplayLocationBarrierModal } = useSelector(
    (state) => state.locationBarrier
  );

  const handleCloseModal = () => {
    dispatch(setLocationBarrierModal(false));
  };

  console.log("isDisplayLocationBarrierModal", isDisplayLocationBarrierModal);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // Reset modal state when screen comes into focus
      if (isDisplayLocationBarrierModal) {
        dispatch(setLocationBarrierModal(false));
      }
    });

    return unsubscribe; // Unsubscribe on unmount
  }, [navigation]);

  return (
    <ModalUI
      openCloseState={isDisplayLocationBarrierModal}
      closeModalFun={handleCloseModal}
      modalStyle="slide"
      closebtn={false}
      style={infoModalStyles.aadharModalStyles}
      insideCardStyle={infoModalStyles.insideCardStyle}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Available Rides</Text>
        <View style={styles.imgCard}>
          <Image
            style={{ width: 250, height: 250, resizeMode: "contain" }}
            source={require("../assets/location-barrier.png")}
          />
        </View>
        <Text style={styles.subHeading}>
          Currently, we are not servicing your area, but we plan to expand to
          more locations soons
        </Text>
      </View>
    </ModalUI>
  );
};

export default LocationBarrierModal;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 35,
    gap: 10,
  },

  heading: {
    fontSize: 18,
    fontWeight: "600",
  },
  imgCard: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  subHeading: {
    textAlign: "center",
    lineHeight: 22,
    fontSize: 14,
    fontWeight: "600",
  },
});
