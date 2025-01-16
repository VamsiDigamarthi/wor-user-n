import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  ImageBackground,
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
import AllServices from "../../../app/wor/features/ridebooking/home/components/AllServices/AllServices";
import SliderComponent from "../../../Utils/SliderComponent/SliderComponent";
import BackgroundImage from "../../../Utils/BackgroundImage/BackgroundImage";
import { COLORS } from "../../../Constants/colors";
import DateTimePicker from "../../../Utils/DateTimePicker/DateTimePicker";
import ModalUI from "../../../Utils/Modal/Modal";
import { infoModalStyles } from "../../../Components/InfoUi/Styles/InfoModalStyles";
import OtpInfoUi from "../../../Components/InfoUi/OtpInfoUi";
import AllowNotification from "../../../Utils/AllowNotification/AllowNotification";
import FutureOrderBox from "../../../Components/FutureOrderBox/FutureOrderBox";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ContentLoader, { Rect } from "react-content-loader/native";
import * as Clipboard from "expo-clipboard";

const screenHeight = Dimensions.get("window").height;
// <<<<<<< changes-from-last-4-days
const androidHeight = [screenHeight * 0.54, screenHeight * 0.6]; // Adjust snap points
// =======
// const androidHeight = [screenHeight * 0.4, screenHeight * 0.4]; // Adjust snap points
// >>>>>>> master
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
    captainMarkers,
  } = useHomeHook();

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const onHandleOpenInfoModal = () => {
    console.log("press");
    setIsInfoModalOpen(!isInfoModalOpen);
  };

  const [isOpenCloseSOS, setIsOpenCloseSOS] = useState(false);
  const toggleCloseSOS = () => setIsOpenCloseSOS(!isOpenCloseSOS);

  // console.log(favoritePlaces, nearByRandomItems);

  return (
    <BottomSheetModalProvider>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* Map Container */}
        <View
          style={[
            styles.mapContainer,

            // { height: mapHeight }
          ]}
        >
          {!location || location == null || location == undefined ? (
            <View style={styles.loadingWrapper}>
              <ActivityIndicator color="#e02e88" size={30} />
            </View>
          ) : (
            <HomeMap
              captainMarkers={captainMarkers}
              location={location}
              // height={mapHeight}
              handleOpenSafetyModal={toggleCloseSOS}
            />
          )}
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          index={1} // Initial snap point
          snapPoints={snapPoints}
          onChange={handleSheetChange}
          enablePanDownToClose={false} // Prevent closing
          style={[styles.bottomSheet, { elevation: 1 }]} // Apply custom styles
          backgroundStyle={styles.backgroundStyle} // Set pink background
          handleIndicatorStyle={styles.handleIndicator}
        >
          <BottomSheetScrollView contentContainerStyle={styles.sheetContent}>
            <View style={styles.bottomSheet}>
              {/* <Text style={styles.text}></Text> */}
              <DropLocation
                nearByRandomItems={nearByRandomItems} // this is display 3 items
                placeName={placeName} // this prop is store current location text
                nearbyPlaces={nearbyPlaces} // this prop store nearby places from user current location to 1 km radius famous location [place this data into "select drop location screen to display initial locations"]
                location={location} // this is location used for pass this data into price screen
              />
              <AllServices
                placeName={placeName}
                nearbyPlaces={nearbyPlaces}
                location={location}
              />
              <View style={{ height: 10 }} />
              <SliderComponent />
              <HomeCopyBox />
              <BackgroundImage />
              {/* <Button title="notification" onPress={onHandleOpenInfoModal} /> */}
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

function HomeCopyBox() {
  const copyToClipboard = (text) => {
    if (text) {
      Clipboard.setStringAsync(text); // Copies text to clipboard
      // Alert.alert("Copied to Clipboard", text);
    } else {
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View style={styles.copyBox}>
      <Text>Invite Your Friends to women rider</Text>
      <TouchableOpacity
        style={styles.copyBtn}
        onPress={() => copyToClipboard("GOWOR")}
      >
        <Text style={{ fontWeight: "bold" }}>Code : GOWOR</Text>
        <MaterialCommunityIcons name="content-copy" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const SkeletonLoader = () => {
  return (
    <View style={styles.SkeletonLoader}>
      <ContentLoader
        speed={2}
        width="98%" // Bar width (adjust as needed)
        height={20} // Bar height
        backgroundColor="#e0e0e0"
        foregroundColor="#f5f5f5"
      >
        <Rect x="0" y="0" rx="8" ry="8" width="100%" height="20" />
      </ContentLoader>
    </View>
  );
};

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
    backgroundColor: "#fff",
    // padding: 20,
    paddingHorizontal: 5,
    // backgroundColor: COLORS.bottomSheetBg,
  },
  contentText: {
    fontSize: 16,
    // lineHeight: 24,
    marginBottom: 10,
  },
  bottomSheet: {
    // padding: 10,

    overflow: "hidden",
    borderTopLeftRadius: 35, // Top-left corner radius
    borderTopRightRadius: 35, // Top-right corner radius
    // elevation: 1,ele
  },
  backgroundStyle: {
    // backgroundColor: COLORS.bottomSheetBg,
    // gap: 5, // Pink background color for BottomSheet
  },
  handleIndicator: {
    backgroundColor: "gray",
    width: 50,
    height: 4,
    borderRadius: 2,
  },

  copyBox: {
    marginTop: 10,
    padding: 10,
    height: 120,
    borderRadius: 20,
    gap: 10,
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F0F5",
  },
  copyBtn: {
    flexDirection: "row",
    gap: 10,
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    width: 160,
    borderStyle: "dashed",
  },

  SkeletonLoader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginHorizontal: 20,
  },
});
//
