import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import RideBook from "../Screens/Dashboard/RideBook/RideBook";

import FavoritePlace from "../Screens/Dashboard/FavoritePlace/FavoritePlace";
import CustomDrawerContent from "../Utils/CustomDrawerContent/CustomDrawerContent";
import Notification from "../app/wor/features/DrawerScreens/Notification/Notification";
import PersonalInfo from "../app/wor/features/DrawerScreens/Profile/Screens/PersonalInfo/PersonalInfo";

import Preference from "../Screens/Dashboard/Preference/Preference";
import PaymentMethods from "../Screens/Dashboard/PaymnetMethods/PaymentMethods";

import RideDetails from "../Components/Dashboard/CaptainAcceptCom/RideDetails/RideDetails";

import FullMapPreview from "../Utils/FullMapPreview/FullMapPreview";
import Wallet from "../Screens/Dashboard/Wallet/Wallet";
import { COLORS } from "../Constants/colors";
import DrawerFavorite from "../Screens/Dashboard/DrawerFavorite/DrawerFavorite";

import WalletLoad from "../app/wor/features/DrawerScreens/Wallet/Wallet";

import FaqAnswer from "../Screens/Faqs/FaqAnswer";
import ChatWithCaptain from "../Components/ChatUi/ChatWithCaptain";

import Suggestions from "../app/wor/features/DrawerScreens/Suggestions/Suggestions";

import PoliceStationMapCard from "../Screens/Dashboard/Home/BottosheetScreens/components/PoliceStationMapCard/PoliceStationMapCard";

import FakeCall from "../Utils/FakeCall/FakeCall";
import ChangePickLocation from "../Screens/Dashboard/ChangePickLocation/ChangePickLocation";
import HomeScreen from "../app/wor/features/ridebooking/home/screens/HomeScreen";
import ParcelHomeScreen from "../app/wor/features/Parcels/screens/ParcelHomeScreen";
// import ChangeLoc100mViaMap from "../app/wor/utiles/ChangeLoc100mViaMap";
import ParSavedUsers from "../app/wor/features/Parcels/screens/ParSavedUsers";

/* Drawer Screens */

import AadharNewScreen from "../app/wor/features/DrawerScreens/Profile/Screens/AadharNewScreen";

import PersonalInfoPreview from "../app/wor/features/DrawerScreens/Profile/Screens/PersonalInfoPreview/PersonalInfoPreview";
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

// =======
import SetNewMpin from "../app/wor/features/DrawerScreens/Profile/Screens/MpinScreen";
import PaymentHistory from "../app/wor/features/DrawerScreens/Wallet/Screens/PaymentHistory";
import SavedLocations from "../app/wor/features/DrawerScreens/SavedLocations/SavedLocations";
import AppSettingsScreen from "../app/wor/features/DrawerScreens/About/AppSettingsScreen";
import PaymentMethod from "../app/wor/features/DrawerScreens/Wallet/Screens/PaymentMethod";
import ChatBot from "../app/wor/features/DrawerScreens/RideHistory/Screens/ChatBot";
import HomeAppBard from "../app/wor/utiles/HomeAppBard";
import CustomeDrawer from "../app/wor/utiles/CustomeDrawer/CustomeDrawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ad from "../app/wor/Ad";
import { useEffect, useState } from "react";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DrawerNavigator = ({ route }) => {
  const screenBackgroundColors = {
    Rating: COLORS.bottomSheetBg,
  };

  const [ownUser, setOwnUser] = useState(true);

  const takeOwnUser = async () => {
    const isOwnUser = await AsyncStorage.getItem("ownUser");
    setOwnUser(isOwnUser === "true");
  };

  useEffect(() => {
    takeOwnUser();
  }, []);

  return (
    <>
      <Drawer.Navigator
        drawerContent={(props) => <CustomeDrawer {...props} />} // Use custom drawer
        screenOptions={{
          header: ({ navigation }) => <HomeAppBard navigation={navigation} />,

          sceneContainerStyle: {
            backgroundColor: screenBackgroundColors[route.name] || null, // Fallback to white if no color found
          },
          drawerStyle: {
            width: "80%",
          },
        }}
      >
        <Drawer.Screen name="Home" component={ownUser ? HomeScreen : Ad} />
        <Drawer.Screen
          name="captaineacceptride"
          component={CaptainAcceptRideScreen}
          options={{ headerShown: false }}
        />
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
        component={Safety}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReferAndEarn"
        component={RefertoEarn}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="RideBook" component={RideBook} />

      <Stack.Screen
        name="SelectDropLocation"
        component={SelectDropLocation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ShowPrice"
        component={ShowPriceScreen}
        options={{ headerShown: false }}
      />

      {/* Looking for Ride screen */}
      <Stack.Screen
        name="lookingforride"
        component={LookingForRideScreen}
        options={{ headerShown: false }}
        initialParams={params}
      />

      <Stack.Screen
        name="FixMapPreview"
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

      <Stack.Screen
        name="captaineacceptrideusershowridedetails"
        component={RideDetails}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="captainrideComplete"
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
        name="Notifications"
        component={Notification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Help"
        component={Help}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
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

      <Stack.Screen
        name="ProfileDocumentScreen"
        component={AadharNewScreen}
        options={{ headerShown: false }}
      />

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

      <Stack.Screen
        name="ChatBot"
        component={ChatBot}
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
        component={ParcelHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangeLoc100mViaMap"
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
      <Stack.Screen
        name="PaymentMethodNew"
        component={PaymentMethod}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthenticatedStack;
