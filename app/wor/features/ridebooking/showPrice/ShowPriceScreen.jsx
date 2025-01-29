import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
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

import ModalUI from "../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../Components/InfoUi/Styles/InfoModalStyles";
import { TouchableOpacity } from "react-native-gesture-handler";

import OfferCard from "./Components/OfferCard";
import UhOhCard from "./Components/UhOhCard";
import PaymentMethodCard from "./Components/PaymentMethodCard";
import DatePicker from "react-native-date-picker";

const screenHeight = Dimensions.get("window").height;

const androidSnapPoints = [0.35, 0.7].map((p) => screenHeight * p); // Example snap points for Android
const iosSnapPoints = [0.35, 0.6].map((p) => screenHeight * p); // Example snap points for iOS

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
  } = useShowPriceScreenHook();
  const { mapHeight, snapPoints, handleSheetChange } = useBottomSheetConfig(
    androidSnapPoints,
    iosSnapPoints,
    kownBotSheetChangeUpOrDown
  );

  const [coupons, setCoupons] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  return (
    <>
      <AppBarLayout
        title={dropDetails?.name}
        vicinity={dropDetails?.vicinity}
        isPositionAppbar={true}
        isTimer={true}
        timerFunction={timerSetModalOpen}
        borderStyles={false}
      >
        <View style={styles.mapContainer}>
          <ShowPollyLine origin={location} destination={dropDetails.location} />
        </View>
        <BottomSheetComponent
          style={{ marginBottom: isParcScreen ? 150 : 100 }}
          snapPoints={snapPoints}
          handleSheetChange={handleSheetChange}
        >
          {knowMoveDownOrUp === "moved down" ? (
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
        </BottomSheetComponent>
        <View style={styles.coupneWithBtn}>
          <OfferCouponCard />
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
      <ShceduleOrderModal
        shceduleOrderModal={shceduleOrderModal}
        timerSetModalOpen={timerSetModalOpen}
      />
    </>

    //     {modalOpen && (
    //       <ModalUI
    //         modalStyle="slide"
    //         style={infoModalStyles.aadharModalStyles}
    //         insideCardStyle={infoModalStyles.insideCardStyle}
    //         closebtn={false}
    //         closeModalFun={() => setModalOpen(false)}
    //       >
    //         <View style={{ width: "100%", padding: 10 }}>
    //           {/* {coupons.length > 0 && (
    //             <Text style={{ fontWeight: "bold", fontSize: 20 }}>Offers</Text>
    //           )}

    //           {coupons.length ? (
    //             <View style={{ marginTop: 10, gap: 10 }}>
    //               <OfferCard />
    //               <OfferCard />
    //               <OfferCard />
    //             </View>
    //           ) : (
    //             <UhOhCard />
    //           )} */}

    //           <PaymentMethodCard paymentMethod={paymentMethod} />
    //         </View>
    //       </ModalUI>
    //     )}
    //   </View>
    // </AppBarLayout>
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
