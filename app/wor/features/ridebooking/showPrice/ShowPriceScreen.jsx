import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import AppBarLayout from "../sharedLogics/AppBarLayout";
import { useShowPriceScreenHook } from "./Hooks/ShowPriceScreen.hook";
import { useBottomSheetConfig } from "../sharedLogics/BottomSheetComponent/useBottomSheetConfig";
import BottomSheetComponent from "../sharedLogics/BottomSheetComponent/BottomSheetComponent";
import DisplayVehicle from "./Components/DisplayVehicle";
import OfferCouponCard from "./Components/OfferCouponCard";
import CustomBtn from "../../../utiles/CustomBtn";
import ShceduleOrderModal from "./Modal/ShceduleOrderModal";
import OfferModal from "./Modal/OfferModal";
import PaymentModal from "./Modal/PaymentModal";

import PollyLineNew from "../../../utiles/PollyLineNew";

const screenHeight = Dimensions.get("window").height;
const androidSnapPoints = [0.37, 0.78].map((p) => screenHeight * p); // Example snap points for Android
const iosSnapPoints = [0.3, 0.65].map((p) => screenHeight * p); // Example snap points for iOS

const ShowPriceScreen = () => {
  const {
    location,
    dropDetails,
    filteredVehicles,
    selectedVehicleType,
    isParcScreen,
    onNavigateConfirmLocationScreen,
    kownBotSheetChangeUpOrDown,
    knowMoveDownOrUp,
    storedSelectedVehicle,
    timerSetModalOpen,
    shceduleOrderModal,
    time,
    setShceduleOrderModal,
    hasSoftwareNavigationBar,
  } = useShowPriceScreenHook();

  const { mapHeight, snapPoints, handleSheetChange } = useBottomSheetConfig(
    androidSnapPoints,
    iosSnapPoints,
    kownBotSheetChangeUpOrDown
  );

  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const btnTitle =
    selectedVehicleType === "scooty"
      ? "Book Scooty"
      : selectedVehicleType === "car"
      ? "Book WoR Mini"
      : selectedVehicleType === "bookany"
      ? "Book Any"
      : selectedVehicleType === "wor-premium"
      ? "Book WoR Luxury"
      : "Book Auto";

  return (
    <>
      <AppBarLayout
        title={dropDetails?.name}
        vicinity={dropDetails?.vicinity}
        isPositionAppbar={true}
        timerFunction={timerSetModalOpen}
        borderStyles={false}
      >
        <View style={styles.mapContainer}>
          <PollyLineNew
            selectedVehicleType={selectedVehicleType}
            origin={location}
            destination={dropDetails.location}
            otpVerified={false}
            rideStarted={false}
          />
        </View>
        <BottomSheetComponent
          style={{ marginBottom: isParcScreen ? 150 : 100 }}
          snapPoints={snapPoints}
          handleSheetChange={handleSheetChange}
        >
          {/* Conditional Rendering Based on filteredVehicles */}
          {!filteredVehicles || filteredVehicles.length === 0 ? (
            <View style={styles.loaderContainer}>
              <Text style={styles.loadingText}>Fetching Prices...</Text>
              <ActivityIndicator size="large" color="#e02e88" />
            </View>
          ) : (
            <>
              {filteredVehicles?.length === 1 ? (
                <View style={{ paddingHorizontal: 15, paddingVertical: 20 }}>
                  {filteredVehicles?.map((vehicle, index) => (
                    <DisplayVehicle key={index} vehicle={vehicle} />
                  ))}
                  <View style={{ height: 150, width: "100%" }} />
                </View>
              ) : (
                <>
                  {knowMoveDownOrUp === "moved down" && !time ? (
                    <View style={styles.singleFilterStyle}>
                      {storedSelectedVehicle?.map((vehicle, index) => (
                        <DisplayVehicle key={index} vehicle={vehicle} />
                      ))}
                    </View>
                  ) : (
                    <View
                      style={{ paddingHorizontal: 15, paddingVertical: 20 }}
                    >
                      {filteredVehicles?.map((vehicle, index) => (
                        <DisplayVehicle key={index} vehicle={vehicle} />
                      ))}
                    </View>
                  )}
                </>
              )}
            </>
          )}
        </BottomSheetComponent>
        <View
          style={[
            styles.coupneWithBtn,
            // { bottom: hasSoftwareNavigationBar ? 18 : 0 },
          ]}
        >
          <OfferCouponCard
            onPaymentPress={() => setPaymentModalOpen(true)}
            onOfferPress={() => setOfferModalOpen(true)}
          />

          <CustomBtn
            width="100%"
            btnBg={selectedVehicleType ? "#e02e88" : "#fff"}
            btnColor={selectedVehicleType ? "#fff" : "#e02e88"}
            title={btnTitle}
            onPress={onNavigateConfirmLocationScreen}
            disabled={!selectedVehicleType}
            borderColor="#e02e88"
            borderWidth={1}
          />
          <Text style={styles.payThrough}>
            Pay through your wallet and get{" "}
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>₹2</Text>{" "}
            discount.
          </Text>
        </View>
      </AppBarLayout>
      {shceduleOrderModal && (
        <ShceduleOrderModal
          timerSetModalOpen={() => setShceduleOrderModal(!shceduleOrderModal)}
        />
      )}
      {offerModalOpen && (
        <OfferModal onClose={() => setOfferModalOpen(false)} />
      )}
      {paymentModalOpen && (
        <PaymentModal onClose={() => setPaymentModalOpen(false)} />
      )}
    </>
  );
};

export default ShowPriceScreen;

const styles = StyleSheet.create({
  mapContainer: {
    width: "100%",
    height: "100%",
  },
  coupneWithBtn: {
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 25,
    paddingVertical: 10,
    gap: 20,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    paddingBottom: 20,
    elevation: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#fff",
    // position: "relative",
  },
  singleFilterStyle: {
    width: "100%",
    height: 300,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  payThrough: {
    position: "absolute",
    left: 0,
    right: 0,
    top: -19,
    backgroundColor: "#169608",
    padding: 2,
    color: "#fff",
    fontWeight: "500",
    textAlign: "center",
  },
});
