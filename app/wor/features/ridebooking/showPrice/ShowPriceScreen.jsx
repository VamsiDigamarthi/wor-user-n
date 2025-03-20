import { Dimensions, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import AppBarLayout from "../sharedLogics/AppBarLayout";
import { useShowPriceScreenHook } from "./Hooks/ShowPriceScreen.hook";
import ShowPollyLine from "../../../utiles/ShowPollyLine";
import { useBottomSheetConfig } from "../sharedLogics/BottomSheetComponent/useBottomSheetConfig";
import BottomSheetComponent from "../sharedLogics/BottomSheetComponent/BottomSheetComponent";
import DisplayVehicle from "./Components/DisplayVehicle";
import OfferCouponCard from "./Components/OfferCouponCard";
import CustomBtn from "../../../utiles/CustomBtn";
import ShceduleOrderModal from "./Modal/ShceduleOrderModal";
import OfferModal from "./Modal/OfferModal";
import PaymentModal from "./Modal/PaymentModal";

import PollyLineNew from "../../../utiles/PollyLineNew";

// import { withLocationBarrierHoc } from "../../../../../HOC/withLocationBarrier";


const screenHeight = Dimensions.get("window").height;
const androidSnapPoints = [0.35, 0.7].map((p) => screenHeight * p); // Example snap points for Android
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
  } = useShowPriceScreenHook();

  const { mapHeight, snapPoints, handleSheetChange } = useBottomSheetConfig(
    androidSnapPoints,
    iosSnapPoints,
    kownBotSheetChangeUpOrDown
  );

  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  return (
    <>
      <AppBarLayout
        title={dropDetails?.name}
        vicinity={dropDetails?.vicinity}
        isPositionAppbar={true}
        // isTimer={true}
        timerFunction={timerSetModalOpen}
        borderStyles={false}
      >
        <View style={styles.mapContainer}>
          {/* <ShowPollyLine
            selectedVehicleType={selectedVehicleType}
            origin={location}
            destination={dropDetails.location}
          /> */}
          <PollyLineNew
            selectedVehicleType={selectedVehicleType}
            origin={location}
            destination={dropDetails.location}
            otpVerified={null}
          />
        </View>
        <BottomSheetComponent
          style={{ marginBottom: isParcScreen ? 150 : 100 }}
          snapPoints={snapPoints}
          handleSheetChange={handleSheetChange}
        >
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
                <View style={{ paddingHorizontal: 15, paddingVertical: 20 }}>
                  {filteredVehicles?.map((vehicle, index) => (
                    <DisplayVehicle key={index} vehicle={vehicle} />
                  ))}
                </View>
              )}
            </>
          )}
        </BottomSheetComponent>
        <View style={styles.coupneWithBtn}>
          <OfferCouponCard
            onPaymentPress={() => setPaymentModalOpen(true)}
            onOfferPress={() => setOfferModalOpen(true)}
          />
          <CustomBtn
            width="100%"
            btnBg={selectedVehicleType ? "#e02e88" : "#fff"}
            btnColor={selectedVehicleType ? "#fff" : "#e02e88"}
            title={`Book ${selectedVehicleType} `}
            onPress={onNavigateConfirmLocationScreen}
            disabled={true}
            borderColor="#e02e88"
            borderWidth={1}
          />
        </View>
      </AppBarLayout>
      {shceduleOrderModal && (
        <ShceduleOrderModal
          // shceduleOrderModal={shceduleOrderModal}
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
    paddingBottom: 30,
    elevation: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#fff",
  },
  singleFilterStyle: {
    width: "100%",
    height: 300,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
});
