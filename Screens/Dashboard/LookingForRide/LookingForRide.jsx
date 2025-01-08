import {
  Dimensions,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import ProgressBar from "../../../Components/Dashboard/LookForRideCom/ProgressBar/ProgressBar";
import ShowPickDropPriceCard from "../../../Components/Dashboard/LookForRideCom/ShowPickDropPriceCard/ShowPickDropPriceCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLookingForRideHook } from "./LookingForRide.hook";
import { coordinationMap } from "../../../Constants/displaylocationmap";
import ModalUI from "../../../Utils/Modal/Modal";
import ShowPollyLine from "../../../Components/Dashboard/ShowPrices/ShowPollyLine/ShowPollyLine";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { COLORS } from "../../../Constants/colors";

import { Chase } from "react-native-animated-spinkit";
import { infoModalStyles } from "../../../Components/InfoUi/Styles/InfoModalStyles";

const screenHeight = Dimensions.get("window").height;
const androidHeight = [screenHeight * 0.1, screenHeight * 0.44]; // Adjust snap points
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
  const [mapHeight, setMapHeight] = useState(androidHeight[0]); // Initial map height
  const snapPoints = ["38%", "50%"];

  const handleSheetChange = useCallback((index) => {
    let height = screenHeight * 0.95; // Default map height
    // console.log(index);
    if (index === 2) {
      height = screenHeight * 0.6; // Map height at middle snap point
    }
    setMapHeight(height);
  }, []);
  // console.log(dropAddress);

  return (
    <View style={styles.container}>
      <View style={[styles.mapContainer, { height: mapHeight }]}>
        <ShowPollyLine
          origin={pickUpCoordinated}
          destination={dropAddress?.location}
        />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={1} // Initial snap point
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        enablePanDownToClose={false} // Prevent closing
        style={styles.bottomSheet} // Apply custom styles
        backgroundStyle={styles.backgroundStyle} // Set pink background
        handleIndicatorStyle={styles.handleIndicator}
      >
        <BottomSheetScrollView contentContainerStyle={styles.sheetContent}>
          <View style={styles.bottomSheet}>
            <Text style={styles.text}></Text>
            {futureTime ? (
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 60,
                }}
              >
                <Chase size={60} color="#e02e88" />
              </View>
            ) : (
              <ProgressBar progressWidth={progressWidth} />
            )}
            <View style={styles.cancelBtnWithImage}>
              <Image
                style={styles.images}
                source={{
                  uri: "https://s3-alpha-sig.figma.com/img/7911/de63/52b2a75265856d69f141a38e4434558f?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RAocZw5Rc3jB8VsL64WqRmTcZsABcJV4rNDw4rdVJ3gZKC8iLxUAiPZul0RJnCgirjIrvjJT1FBxkNXOYwoJW0UvlmRhI9BtAmQUzZGPg15wqw1Uz~E6EEbDAKAofy7aCQ2ZGsg-A48C~9n0ozfB1b2gTGC8wsuHz05K3Z9q4zwvfbJy3tJbiEnWNFDaEGvo2MAst9ckOtdE~W6YjEH41GSjdlx1UtPSVuqH4HODgwRnxUGgqYayCpkkiLiHQB1w5lesRCndmYVgGQG3m2v1Q9TSI09LwJxAk5066FcD9mt2SrVTwBNeTMK8rZYluvhUnGYX-fDOgCFjsdSN7Yj5SA__",
                }}
              />
              <View style={styles.cancelBtn}>
                <CustomBtn
                  title={`${
                    showCancelWithReOrderBtn ? "Cancel" : "Re-Place"
                  } Ride`}
                  btnBg="#fff"
                  btnColor="#001"
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
        <View>
          <CancelRideModalScreen
            onConfirmCancelRide={onConfirmCancelRide}
            onOpenCancelOrderInfoHandle={onOpenCancelOrderInfoHandle}
          />
        </View>
      </ModalUI>
    </View>
  );
};

export default LookingForRide;

const CancelRideModalScreen = ({
  onConfirmCancelRide,
  onOpenCancelOrderInfoHandle,
}) => {
  return (
    <View style={{ padding: 10, gap: 15 }}>
      <Text style={{ fontWeight: "bold", fontSize: 24 }}>
        Are You Sure Want to Cancel the Ride ?
      </Text>
      <Text style={{ fontSize: 16 }}>
        Pickup location can be changed upto 100m even after captain is assigned.
      </Text>

      <CustomBtn
        onPress={onConfirmCancelRide}
        title="Cancel my ride"
        btnColor="#fff"
        btnBg="#e02e88"
      />

      <CustomBtn
        onPress={onOpenCancelOrderInfoHandle}
        title="Keep Searching"
        btnColor="#e02e88"
        btnBg="#fff"
        borderWidth={1}
        borderColor={"#e02e88"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // gap: 20,
    // marginTop: 29,
  },
  mapContainer: {
    width: "100%",
  },
  mapImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 5,
  },
  sheetContent: {
    // padding: 20,
    paddingHorizontal: 10,
    backgroundColor: COLORS.bottomSheetBg,
  },
  contentText: {
    fontSize: 16,
    // lineHeight: 24,
    marginBottom: 10,
  },
  bottomSheet: {
    borderTopLeftRadius: 20, // Top-left corner radius
    borderTopRightRadius: 20, // Top-right corner radius
  },
  backgroundStyle: {
    backgroundColor: COLORS.bottomSheetBg,
    gap: 5, // Pink background color for BottomSheet
  },

  cancelBtnWithImage: {
    width: "100%",
    height: 200,
    position: "relative",
    marginTop: 50,
  },

  images: {
    width: "100%",
    height: "90%",
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  cancelBtn: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
    padding: 10,
    gap: 20,
  },
});
