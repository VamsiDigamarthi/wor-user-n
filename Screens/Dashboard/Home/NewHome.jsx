import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomSheet, {
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, CommonActions } from "@react-navigation/native";
import * as Location from "expo-location";
// import * as Clipboard from "expo-clipboard";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Toast from "react-native-toast-message";
// import messaging from "@react-native-firebase/messaging";
// import * as Notifications from "expo-notifications";

import { useHomeHook } from "./Home.hook";
import HomeMap from "../../../Utils/HomeMap/HomeMap";
import DropLocation from "../../../Components/Dashboard/DropLocation/DropLocation";
import SliderComponent from "../../../Utils/SliderComponent/SliderComponent";
import BackgroundImage from "../../../Utils/BackgroundImage/BackgroundImage";
import ModalUI from "../../../Utils/Modal/Modal";
import { infoModalStyles } from "../../../Components/InfoUi/Styles/InfoModalStyles";
import AllowNotification from "../../../Utils/AllowNotification/AllowNotification";
import FutureOrderBox from "../../../Components/FutureOrderBox/FutureOrderBox";
import { COLORS } from "../../../Constants/colors";
import ContentLoader, { Rect } from "react-content-loader/native";

import AllServices from "../../../Utils/AllServices/AllServices";

import CopyBox from "../../../app/wor/utiles/CopyBox";

const screenHeight = Dimensions.get("window").height;
const androidHeight = [screenHeight * 0.54, screenHeight * 0.6];
const iosHeight = [screenHeight * 0.15, screenHeight * 0.6];

const NewHome = () => {
  const bottomSheetRef = useRef(null);
  const dispatch = useDispatch();

  const [mapHeight, setMapHeight] = useState(androidHeight[0]);
  const snapPoints = useMemo(
    () => (Platform.OS === "ios" ? iosHeight : androidHeight),
    []
  );

  const handleSheetChange = useCallback((index) => {
    const height = index === 1 ? screenHeight * 0.6 : screenHeight * 0.95;
    setMapHeight(height);
  }, []);

  const onBackLogin = async () => {
    await AsyncStorage.removeItem("token");
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "AuthStack" }],
      })
    );
  };

  const navigation = useNavigation();

  const {
    location,
    nearByRandomItems,
    placeName,
    nearbyPlaces,
    activeOrder,
    captainMarkers,
    homeLocations,
    workLocation,
  } = useHomeHook();

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const onHandleOpenInfoModal = () => {
    console.log("press");
    setIsInfoModalOpen(!isInfoModalOpen);
  };

  const [isOpenCloseSOS, setIsOpenCloseSOS] = useState(false);

  const toggleCloseSOS = () => setIsOpenCloseSOS(!isOpenCloseSOS);

  return (
    <BottomSheetModalProvider>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* Map Container */}
        <View style={[styles.mapContainer]}>
          {!location ? (
            <View style={styles.loadingWrapper}>
              <ActivityIndicator color="#e02e88" size={30} />
            </View>
          ) : (
            <HomeMap
              captainMarkers={captainMarkers}
              location={location}
              height={mapHeight}
              handleOpenSafetyModal={toggleCloseSOS}
            />
          )}
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
            <View style={styles.bottomSheet}>
              <DropLocation
                nearByRandomItems={nearByRandomItems} // this is display 3 items
                placeName={placeName} // this prop is store current location text
                nearbyPlaces={nearbyPlaces} // this prop store nearby places from user current location to 1 km radius famous location [place this data into "select drop location screen to display initial locations"]
                location={location} // this is location used for pass this data into price screen
                homeLocations={homeLocations}
                workLocation={workLocation}
              />
              <AllServices
                placeName={placeName}
                nearbyPlaces={nearbyPlaces}
                location={location}
              />
              <View style={{ height: 10 }} />
              <SliderComponent />
              <CopyBox />
              <BackgroundImage />
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </View>

      <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <FutureOrderBox />
      </View>

      <ModalUI
        openCloseState={isInfoModalOpen}
        closeModalFun={onHandleOpenInfoModal}
        modalStyle="slide"
        style={infoModalStyles.aadharModalStyles}
        insideCardStyle={infoModalStyles.insideCardStyle}
        btnText="Okay, Got It"
        btnStyles={infoModalStyles.modalCloseBtn}
        btnTextStyle={infoModalStyles.btnTextStyle}
        closebtn={false}
      >
        <AllowNotification onModalClose={onHandleOpenInfoModal} />
      </ModalUI>
    </BottomSheetModalProvider>
  );
};

export default NewHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  mapContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  sheetContent: {
    backgroundColor: "#fff",
    paddingHorizontal: 5,
  },
  bottomSheet: {
    overflow: "hidden",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  backgroundStyle: {},
  handleIndicator: {
    backgroundColor: "gray",
    width: 50,
    height: 4,
    borderRadius: 2,
  },
});
