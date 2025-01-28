import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import Home from "../Screens/Dashboard/Home/Home";
import RideBook from "../Screens/Dashboard/RideBook/RideBook";
import CustomAppBar from "../Utils/CustomAppBar/CustomAppBar";
// import SelectDropLocation from "../Screens/Dashboard/SelectDropLocation/SelectDropLocation";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ShowPrice from "../Screens/Dashboard/ShowPrice/ShowPrice";
import LookingForRide from "../Screens/Dashboard/LookingForRide/LookingForRide";
import CaptainAcceptRide from "../Screens/Dashboard/CaptainAcceptRide/CaptainAcceptRide";
import { useNavigation } from "@react-navigation/native";
import MapPreview from "../Screens/Dashboard/MapPreview/MapPreview";
import FavoritePlace from "../Screens/Dashboard/FavoritePlace/FavoritePlace";
import CustomDrawerContent from "../Utils/CustomDrawerContent/CustomDrawerContent";
// import ReferAndEarn from "../Screens/Dashboard/ReferAndEarn/ReferAndEarn";
// import Notification from "../Screens/Dashboard/Notification/Notification";
import Notification from "../app/wor/features/DrawerScreens/Notification/Notification";
// import Help from "../Screens/Dashboard/Help/Help";
// import ProfileScreen from "../Screens/Dashboard/ProfileScreen/ProfileScreen";
import PersonalInfo from "../app/wor/features/DrawerScreens/Profile/Screens/PersonalInfo/PersonalInfo";
// import SafetyHome from "../Screens/Dashboard/Safety/SafetyHome";
import EmailVerification from "../Screens/Dashboard/Safety/EmailVerification";
import MobileVerification from "../Screens/Dashboard/Safety/MobileVerification";
// import SettingsScreen from "../Screens/Dashboard/Settings/Settings";
import Preference from "../Screens/Dashboard/Preference/Preference";
// import About from "../Screens/Dashboard/About/About";
// import ParcelHome from "../Screens/Parcels/ParcelHome/ParcelHome";
// import Donation from "../Screens/Dashboard/Donation/Donation";
import PaymentMethods from "../Screens/Dashboard/PaymnetMethods/PaymentMethods";

import RideDetails from "../Components/Dashboard/CaptainAcceptCom/RideDetails/RideDetails";
import CaptainRideComplete from "../Components/Dashboard/CaptainAcceptCom/CapatinRideComplete/CaptainRideComplete";
import MapWithCurrentLocation from "../Components/Dashboard/FixedMapView/FixedMapView";
// import ParcelMapWithBottomSheet from "../Screens/Parcels/ParcelMapWithBottomSheet/ParcelMapWithBottomSheet";
import VoiceTest from "../Components/BgVoice/VoiceTest";
import BgTest from "../Components/BgVoice/BgTest";
import FullMapPreview from "../Utils/FullMapPreview/FullMapPreview";
import Wallet from "../Screens/Dashboard/Wallet/Wallet";
import { COLORS } from "../Constants/colors";
import Coins from "../Screens/Dashboard/Donation/Coins";
import DrawerFavorite from "../Screens/Dashboard/DrawerFavorite/DrawerFavorite";
// import ParcelSavePlaces from "../Screens/Parcels/ParcelSavePlaces/ParcelSavePlaces";
import DashBoardAadharCard from "../Screens/Dashboard/ShowPrice/Screens/DashBoardAadharCard";
import DashBoardMPinCard from "../Screens/Dashboard/ShowPrice/Screens/DashBoardMPinCard";

// import NewHome from "../Screens/Dashboard/Home/NewHome";

import NewHome from "../Screens/Dashboard/Home/NewHome";
import WalletLoad from "../app/wor/features/DrawerScreens/Wallet/Wallet";

// import { useEffect, useState } from "react";
// import * as Notifications from "expo-notifications";
// import { AppState } from "react-native";
import FaqHome from "../Screens/Faqs/FaqHome";
import FaqAnswer from "../Screens/Faqs/FaqAnswer";
import ChatWithCaptain from "../Components/ChatUi/ChatWithCaptain";

import Suggestions from "../app/wor/features/DrawerScreens/Suggestions/Suggestions";

import PoliceStationMapCard from "../Screens/Dashboard/Home/BottosheetScreens/components/PoliceStationMapCard/PoliceStationMapCard";
import Chat from "../Components/Dashboard/CaptainAcceptCom/RatingMsgCall/Chat/Chat";
import FakeCall from "../Utils/FakeCall/FakeCall";
import ChangePickLocation from "../Screens/Dashboard/ChangePickLocation/ChangePickLocation";
import HomeScreen from "../app/wor/features/ridebooking/home/screens/HomeScreen";
import ParcelHomeScreen from "../app/wor/features/Parcels/screens/ParcelHomeScreen";
// import ChangeLoc100mViaMap from "../app/wor/utiles/ChangeLoc100mViaMap";
import ParSavedUsers from "../app/wor/features/Parcels/screens/ParSavedUsers";

/* Drawer Screens */

import AadharNewScreen from "../app/wor/features/DrawerScreens/Profile/Screens/AadharNewScreen";

import PersonalInfoPreview from "../app/wor/features/DrawerScreens/Profile/Screens/PersonalInfoPreview/PersonalInfoPreview";
import ProfileDocumentScreen from "../app/wor/features/DrawerScreens/Profile/Screens/ProfileDocumentScreen";
import EmergencyContactNumber from "../app/wor/features/DrawerScreens/Profile/Screens/EmergencyContactNumber/EmergencyContactNumber";

import RideHistory from "../app/wor/features/DrawerScreens/RideHistory/RideHistory";
import RideHistoryDetailView from "../app/wor/features/DrawerScreens/RideHistory/Screens/RideHistoryDetailView";

import AboutScreen from "../app/wor/features/DrawerScreens//About/About";

// import Donation from "../app/wor/features/DrawerScreens/Donation/Donation";
import Donation from "../app/wor/features/DrawerScreens/Donation/DonationNew";

import Help from "../app/wor/features/DrawerScreens/Help/Help";

import Rating from "../app/wor/features/DrawerScreens/Rating/Rating";

import RefertoEarn from "../app/wor/features/DrawerScreens/ReferAndEarn/RefertoEarn";

import Profile from "../app/wor/features/DrawerScreens/Profile/Profile";
import Safety from "../app/wor/features/DrawerScreens/Safety/Safety";

import HelpAndSupport from "../app/wor/features/DrawerScreens/HelpAndSupport/HelpAndSupport";
import DrivingSchools from "../app/wor/features/DrawerScreens/DrivingSchools/DrivingSchools";
import DrivingSchoolsDetailView from "../app/wor/features/DrawerScreens/DrivingSchools/Screens/DrivingSchoolDetailVIew";

import SelectDropLocation from "../app/wor/features/ridebooking/selectdroplocation/SelectDropLocation";
import SelectLocationByMapScreen from "../app/wor/features/ridebooking/SelectLocationByMap/SelectLocationByMapScreen";
// import SelectDropLocation from "../Screens/Dashboard/SelectDropLocation/SelectDropLocation";
import ChangeLoc100mViaMapScreen from "../app/wor/SharedScreens/ChangeLoc100mViaMapScreen/ChangeLoc100mViaMapScreen";
// <<<<<<< 22-01-app-folder-added
import ShowPriceScreen from "../app/wor/features/ridebooking/showPrice/ShowPriceScreen";
import LookingForRideScreen from "../app/wor/features/ridebooking/LookingforRide/LookingForRideScreen";
import CaptainAcceptRideScreen from "../app/wor/features/ridebooking/CaptainAcceptRide/CaptainAcceptRideScreen";
import FeedBackScreen from "../app/wor/features/ridebooking/FeedBack/FeedBackScreen";
import ChatScreen from "../app/wor/features/ridebooking/Chat/ChatScreen";
import { useEffect } from "react";

// =======
import SetNewMpin from "../app/wor/features/DrawerScreens/Profile/Screens/MpinScreen";
import PaymentHistory from "../app/wor/features/DrawerScreens/Wallet/Screens/PaymentHistory";
// import DelAccScreen from "../app/wor/features/DrawerScreens/About/Screens/DelAccount";
import SavedLocations from "../app/wor/features/DrawerScreens/SavedLocations/SavedLocations";
import AppSettingsScreen from "../app/wor/features/DrawerScreens/About/AppSettingsScreen";
// >>>>>>> master
/* Drawer Screens */

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Reusable function to handle common header options
const getCommonOptions = (
  navigation,
  title,
  backgroundColor = "#fff5f9",
  showRight = false,
  rightText = "FAQs",
  navigationText
) => {
  return {
    header: () => (
      <CustomHeader
        navigation={navigation}
        title={title}
        backgroundColor={backgroundColor}
        showRight={showRight}
        rightText={rightText}
        navigationText={navigationText}
      />
    ),
  };
};

const DrawerNavigator = ({ route }) => {
  const screenBackgroundColors = {
    Rating: COLORS.bottomSheetBg,
  };

  return (
    <>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />} // Use custom drawer
        screenOptions={{
          header: ({ navigation }) => <CustomAppBar navigation={navigation} />,
          headerStyle: {
            backgroundColor: "red", // Apply background color to the header
          },
          // Apply background color to the individual screens
          sceneContainerStyle: {
            backgroundColor: screenBackgroundColors[route.name] || null, // Fallback to white if no color found
          },
          drawerStyle: {
            width: "80%",
            // borderTopRightRadius: 20,
            // borderBottomRightRadius: 20,
            // overflow: "hidden",
            // borderBottomRightRadius: 20,
            // borderTopRightRadius: 20,
            // borderRightWidth: 8,
            // borderColor: "#e02e88",
          },
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
      </Drawer.Navigator>
    </>
  );
};

const AuthenticatedStack = ({ initialRoute, params }) => {
  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Safety"
        // component={SafetyHome}
        component={Safety}
        options={{ headerShown: false }}
        initialParams={params}
      />
      <Stack.Screen
        name="ReferAndEarn"
        // component={ReferAndEarn}
        component={RefertoEarn}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="RideBook" component={RideBook} />

      <Stack.Screen
        name="SelectDropLocation"
        // component={SelectDropLocation}
        component={SelectDropLocation}
        options={{ headerShown: false }}
      />

      {/* ShowPrice screen using reusable function */}
      <Stack.Screen
        name="ShowPrice"
        // component={ShowPrice}
        component={ShowPriceScreen}
        options={{ headerShown: false }}
      />

      {/* Looking for Ride screen */}
      <Stack.Screen
        name="lookingforride"
        // component={LookingForRide}
        component={LookingForRideScreen}
        options={{ headerShown: false }}
        initialParams={params}
      />

      {/* MapPreview screen using reusable function */}
      <Stack.Screen
        name="MapPreview"
        component={MapPreview}
        options={({ navigation }) => getCommonOptions(navigation, "Map")}
      />

      <Stack.Screen
        name="FixMapPreview"
        // component={MapWithCurrentLocation}
        component={SelectLocationByMapScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ChangePickLocation"
        component={ChangePickLocation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Favorite"
        component={FavoritePlace}
        options={{ headerShown: false }}
      />

      {/* CaptainAcceptRide screen */}
      <Stack.Screen
        name="captaineacceptride"
        // component={CaptainAcceptRide}
        component={CaptainAcceptRideScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="captaineacceptrideusershowridedetails"
        component={RideDetails}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="captainrideComplete"
        // component={CaptainRideComplete}
        component={FeedBackScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="RideHistory"
        component={RideHistory}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="RideHistoryDetailView"
        component={RideHistoryDetailView}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EmergencyContactNumber"
        component={EmergencyContactNumber}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EmailVerification"
        component={EmailVerification}
        options={({ navigation }) =>
          getCommonOptions(navigation, "Email Verification")
        }
      />

      <Stack.Screen
        name="MobileVerification"
        component={MobileVerification}
        options={({ navigation }) =>
          getCommonOptions(navigation, "Mobile Verification")
        }
      />

      <Stack.Screen
        name="Notifications"
        component={Notification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Help"
        // component={Help}
        component={Help}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        // component={ProfileScreen}
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PersonalInfo"
        component={PersonalInfo}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="FakeCall"
        component={FakeCall}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PersonalInfoPreview"
        component={PersonalInfoPreview}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Preference"
        component={Preference}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Donation"
        component={Donation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethods}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="FullMapPreview"
        component={FullMapPreview}
        options={{ headerShown: false }}
      />

      {/* extra */}
      <Stack.Screen
        name="DashBoardAadharCard"
        component={DashBoardAadharCard}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="DashBoardMPinCard"
        component={DashBoardMPinCard}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ProfileDocumentScreen"
        component={AadharNewScreen}
        options={{ headerShown: false }}
      />

      {/* side bar screens */}

      <Stack.Screen
        name="Rating"
        component={Rating}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Wallet"
        component={Wallet}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DrawerFavorite"
        component={DrawerFavorite}
        options={{ headerShown: false }}
      />

      {/* side bar screens */}

      {/* Voice and Bg */}

      <Stack.Screen
        name="VoiceTest"
        component={VoiceTest}
        options={({ navigation }) =>
          getCommonOptions(navigation, "VoiceTest", "#fff")
        }
      />

      <Stack.Screen
        name="BgTest"
        component={BgTest}
        options={({ navigation }) =>
          getCommonOptions(navigation, "BgTest", "#fff")
        }
      />

      <Stack.Screen
        name="Coins"
        component={Coins}
        options={({ navigation }) =>
          getCommonOptions(navigation, "Your Coins", "#fff")
        }
      />

      <Stack.Screen
        name="FaqHome"
        component={FaqHome}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="FaqAnswer"
        component={FaqAnswer}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ChatWithCaptain"
        component={ChatWithCaptain}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Suggestions"
        component={Suggestions}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Chat"
        // component={Chat}
        component={ChatScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PoliceStationMapCard"
        component={PoliceStationMapCard}
        options={{ headerShown: false }}
      />
      {/* parcel screens */}
      <Stack.Screen
        name="ParcelHome"
        // component={ParcelHome}
        component={ParcelHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangeLoc100mViaMap"
        // component={ChangeLoc100mViaMap}
        component={ChangeLoc100mViaMapScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ParSavedUsers"
        component={ParSavedUsers}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WalletLoad"
        component={WalletLoad}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HelpAndSupport"
        component={HelpAndSupport}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DrivingSchools"
        component={DrivingSchools}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DrivingSchoolsDetailView"
        component={DrivingSchoolsDetailView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SetNewMpin"
        component={SetNewMpin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PaymentHistory"
        component={PaymentHistory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AppSettings"
        component={AppSettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SavedLocations"
        component={SavedLocations}
        options={{ headerShown: false }}
      />

      {/* <Stack.Screen
        name="ParcelPickLocation"
        component={PickLocation}
        options={{ headerShown: false }}
      /> */}
      {/* <Stack.Screen
        name="ParcelMapWithBottomSheet"
        component={ParcelMapWithBottomSheet}
        options={{ headerShown: false }}
        // options={({ navigation }) =>
        //   getCommonOptions(navigation, "Parcel Details", "#fff")
        // }
      /> */}

      {/* <Stack.Screen
        name="ParcelSavePlaces"
        component={ParcelSavePlaces}
        options={{ headerShown: false }}
      /> */}
      {/* parcel screens */}
    </Stack.Navigator>
  );
};

export default AuthenticatedStack;

const CustomHeader = ({
  navigation,
  title,
  backgroundColor,
  showRight = true,
  rightText,
  navigationText,
}) => (
  <View style={[styles.mainContainer]}>
    <View style={[styles.btnContainer]}>
      <TouchableOpacity
        style={[styles.btn]}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={30} color="#E02E88" />
      </TouchableOpacity>
    </View>

    <View style={[styles.textContainer]}>
      <View style={styles.textinnerCard}>
        <Ionicons
          name="location-sharp"
          size={20}
          color="lightgray"
          style={[styles.icon]}
        />

        <Text style={[styles.text]}>{title}</Text>

        <Pressable onPress={() => Alert.alert("Info Pressed")}>
          <Ionicons
            name="information-circle-outline"
            size={15}
            color="lightgray"
            style={[styles.icon, { marginLeft: 5 }]}
          />
        </Pressable>
      </View>
      {showRight && (
        <Pressable
          onPress={() => navigation.navigate(navigationText)}
          style={styles.rightIconCard}
        >
          <Text>{rightText}</Text>
        </Pressable>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    // marginTop: 20,
    // marginBottom: 5,
    // borderWidth: 1, // Apply border to all sides
    borderColor: "#FFE2E6",
    // paddingHorizontal: 13,
    // paddingVertical: 5,
    elevation: 1,
    // backgroundColor: "red",
    borderRadius: 6,
    height: 50,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    paddingLeft: 10,
    zIndex: 30,
    backgroundColor: "#fff",
  },

  btnContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "15%",
    height: "100%",
  },

  btn: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  textContainer: {
    flexDirection: "row",
    // borderWidth: 1,
    borderColor: "#FFE2E6",
    width: "87.5%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    borderRadius: 30,
    paddingRight: 20,
    position: "relative",
    elevation: 1,
    backgroundColor: "#fff",
    // backgroundColor: "red",
    // borderWidth: 1,
    // borderColor: "red",
  },
  textinnerCard: {
    flexDirection: "row",
    gap: 5,
    width: "75%",
    marginLeft: 5,
    alignItems: "center",
    // backgroundColor: "blue",
  },
  text: {
    color: "#302f2f",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    // width: "100%",
  },
  icon: {
    marginTop: 2,
  },
  rightIconCard: {
    width: "25%",
    height: "60%",
    borderWidth: 1,
    borderColor: "#ffe2e6",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
});
