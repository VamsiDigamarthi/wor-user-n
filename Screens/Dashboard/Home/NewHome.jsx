import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomSheet, {
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useHomeHook } from "./Home.hook";
import { CommonActions, useNavigation } from "@react-navigation/native";
import HomeMap from "../../../Utils/HomeMap/HomeMap";
import DropLocation from "../../../Components/Dashboard/DropLocation/DropLocation";
import AllServices from "../../../Components/Dashboard/Home/AllServices/AllServices";
import SliderComponent from "../../../Utils/SliderComponent/SliderComponent";
import BackgroundImage from "../../../Utils/BackgroundImage/BackgroundImage";
import { COLORS } from "../../../Constants/colors";
import DateTimePicker from "../../../Utils/DateTimePicker/DateTimePicker";
import ModalUI from "../../../Utils/Modal/Modal";
import { infoModalStyles } from "../../../Components/InfoUi/Styles/InfoModalStyles";
import OtpInfoUi from "../../../Components/InfoUi/OtpInfoUi";
import AllowNotification from "../../../Utils/AllowNotification/AllowNotification";
import FutureOrderBox from "../../../Components/FutureOrderBox/FutureOrderBox";

const screenHeight = Dimensions.get("window").height;
const androidHeight = [screenHeight * 0.35, screenHeight * 0.5]; // Adjust snap points
const iosHeight = [screenHeight * 0.15, screenHeight * 0.6];

const NewHome = () => {
  const bottomSheetRef = useRef(null);
  const [mapHeight, setMapHeight] = useState(androidHeight[0]); // Initial map height
  const snapPoints = useMemo(
    () => (Platform.OS === "ios" ? iosHeight : androidHeight),
    []
  );

  const handleSheetChange = useCallback((index) => {
    let height = screenHeight * 0.95; // Default map height
    // console.log(index);
    if (index === 1) {
      height = screenHeight * 0.6; // Map height at middle snap point
    }
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
    // navigation.navigate("RideHistory"); // replace AuthStack with your stack name for login screen
  };

  const navigation = useNavigation();

  const {
    location,
    nearByRandomItems,
    placeName,
    nearbyPlaces,
    activeOrder,
    favoritePlaces, // this is favorite places from show one place in home screen
    previousOrders, // this is previous order show in home screen
  } = useHomeHook();

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const onHandleOpenInfoModal = () => {
    console.log("press");
    setIsInfoModalOpen(!isInfoModalOpen);
  };

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        {/* Map Container */}
        <View style={[styles.mapContainer, { height: mapHeight }]}>
          {!location || location == null || location == undefined ? (
            <View style={styles.loadingWrapper}>
              <ActivityIndicator color="#e02e88" size={30} />
            </View>
          ) : (
            <HomeMap location={location} />
          )}          
        </View>


          {/* <DateTimePicker /> */}
        {/* Bottom Sheet */}
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
              <DropLocation
                nearByRandomItems={nearByRandomItems} // this is display 3 items
                placeName={placeName} // this prop is store current location text
                nearbyPlaces={nearbyPlaces} // this prop store nearby places from user current location to 1 km radius famous location [place this data into "select drop location screen to display initial locations"]
                location={location} // this is location used for pass this data into price screen
                // activeOrder={activeOrder} // check if active order have any pending status this will prevent  create another another
                favoritePlaces={favoritePlaces}
                previousOrders={previousOrders}
              />
              <AllServices
                placeName={placeName}
                nearbyPlaces={nearbyPlaces}
                location={location}
                favoritePlaces={favoritePlaces}
                previousOrders={previousOrders}
              />
              <View style={{ height: 10 }} />
              <SliderComponent />
              <BackgroundImage />
              <Button title="notification" onPress={onHandleOpenInfoModal} />
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </View>


       <View style={{position:"absolute" , bottom:0, width:"100%"}}>
            <FutureOrderBox/>
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
    // flex:1,
    // width: "100%",
  },
  mapText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
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
  handleIndicator: {
    backgroundColor: "gray",
    width: 50,
    height: 4,
    borderRadius: 2,
  },

  
});
