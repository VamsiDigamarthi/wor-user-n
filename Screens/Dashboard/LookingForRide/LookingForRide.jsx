import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import ProgressBar from "../../../Components/Dashboard/LookForRideCom/ProgressBar/ProgressBar";
import ShowPickDropPriceCard from "../../../Components/Dashboard/LookForRideCom/ShowPickDropPriceCard/ShowPickDropPriceCard";
import ModalUI from "../../../Utils/Modal/Modal";
import ShowPollyLine from "../../../Components/Dashboard/ShowPrices/ShowPollyLine/ShowPollyLine";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { COLORS } from "../../../Constants/colors";
import { Chase } from "react-native-animated-spinkit";
import { infoModalStyles } from "../../../Components/InfoUi/Styles/InfoModalStyles";
import { useLookingForRideHook } from "./LookingForRide.hook";

const screenHeight = Dimensions.get("window").height;
const androidHeight = [screenHeight * 0.2, screenHeight * 0.44];
const iosHeight = [screenHeight * 0.15, screenHeight * 0.6];

const LookingForRide = () => {
  const {
    dropAddress,
    vehicleType,
    price,
    placeName,
    pickUpCoordinated,
    progressWidth,
    showCancelWithReOrderBtn,
    onCancelRide,
    onRePlaceOrder,
    onNewCancelHandle,
    calncelModalInfoOpenClose,
    onOpenCancelOrderInfoHandle,
    onConfirmCancelRide,
    futureTime,
  } = useLookingForRideHook();

  const bottomSheetRef = useRef(null);
  const [mapHeight, setMapHeight] = useState(androidHeight[0]);
  const snapPoints = ["38%", "50%"];

  const handleSheetChange = useCallback((index) => {
    const height = index === 1 ? screenHeight * 0.5 : screenHeight * 0.95;
    setMapHeight(height);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <ShowPollyLine
          height={mapHeight}
          origin={pickUpCoordinated}
          destination={dropAddress?.location}
        />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        enablePanDownToClose={false}
        style={styles.bottomSheet}
        backgroundStyle={styles.backgroundStyle}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <BottomSheetScrollView contentContainerStyle={styles.sheetContent}>
          <View>
            {futureTime ? (
              <View style={styles.loadingContainer}>
                <Chase size={60} color="#EA4C89" />
              </View>
            ) : (
              <ProgressBar progressWidth={progressWidth} />
            )}
            <View style={styles.cancelBtnWithImage}>
              <Image
                style={styles.images}
                source={require("../../../assets/images/loadingbg.png")}
              />
              <View style={styles.cancelBtn}>
                <CustomBtn
                  title={
                    showCancelWithReOrderBtn ? "Cancel Ride" : "Re-Place Ride"
                  }
                  btnBg="#F7F7F7"
                  btnColor="#EA4C89"
                  borderRadius={10}
                  width="100%"
                  onPress={
                    showCancelWithReOrderBtn ? onCancelRide : onRePlaceOrder
                  }
                />
                {!showCancelWithReOrderBtn && (
                  <CustomBtn
                    title="Cancel Order"
                    btnBg="#fff"
                    btnColor="#001"
                    width="100%"
                    onPress={onNewCancelHandle}
                  />
                )}
              </View>
            </View>
            <ShowPickDropPriceCard
              vehicleType={vehicleType}
              price={price}
              placeName={placeName}
              dropAddress={dropAddress?.name}
            />
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
      <ModalUI
        openCloseState={calncelModalInfoOpenClose}
        closeModalFun={onOpenCancelOrderInfoHandle}
        rightBtnFun={onConfirmCancelRide}
        modalStyle="slide"
        closebtn={false}
        style={infoModalStyles.aadharModalStyles}
        insideCardStyle={infoModalStyles.insideCardStyle}
        showBtns={false}
      >
        <CancelRideModalScreen
          onConfirmCancelRide={onConfirmCancelRide}
          onOpenCancelOrderInfoHandle={onOpenCancelOrderInfoHandle}
        />
      </ModalUI>
    </View>
  );
};

export default LookingForRide;

const CancelRideModalScreen = ({
  onConfirmCancelRide,
  onOpenCancelOrderInfoHandle,
}) => (
  <View style={styles.modalContent}>
    <Text style={styles.modalTitle}>Are You Sure Want to Cancel the Ride?</Text>
    <Text style={styles.modalText}>
      Pickup location can be changed up to 100m even after captain is assigned.
    </Text>
    <CustomBtn
      onPress={onConfirmCancelRide}
      title="Cancel my ride"
      btnColor="#fff"
      btnBg="#EA4C89"
    />
    <CustomBtn
      onPress={onOpenCancelOrderInfoHandle}
      title="Keep Searching"
      btnColor="#EA4C89"
      btnBg="#fff"
      borderWidth={1}
      borderColor="#EA4C89"
    />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapContainer: { width: "100%" },
  sheetContent: {
    paddingHorizontal: 10,
    backgroundColor: COLORS.bottomSheetBg,
  },
  loadingContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
  },
  cancelBtnWithImage: { width: "100%", height: 250, position: "relative" },
  images: { width: "100%", height: "90%", marginBottom: 20, borderRadius: 10 },
  cancelBtn: { position: "absolute", bottom: 0, left: 0, width: "100%" },
  modalContent: { padding: 10, gap: 15, width: "100%" },
  modalTitle: { fontWeight: "bold", fontSize: 24 },
  modalText: { fontSize: 16 },
});
