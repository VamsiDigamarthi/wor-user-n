import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "../Screens/Dashboard/Profile/Profile";
import Home from "../Screens/Dashboard/Home/Home";
import RideBook from "../Screens/Dashboard/RideBook/RideBook";
import CustomAppBar from "../Utils/CustomAppBar/CustomAppBar";
import SelectDropLocation from "../Screens/Dashboard/SelectDropLocation/SelectDropLocation";
import {
  Settings,
  StatusBar,
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
import RideHistory from "../Screens/Dashboard/RideHistory/RideHistory";
import CustomDrawerContent from "../Utils/CustomDrawerContent/CustomDrawerContent";
import ReferAndEarn from "../Screens/Dashboard/ReferAndEarn/ReferAndEarn";
import Notification from "../Screens/Dashboard/Notification/Notification";
import Help from "../Screens/Dashboard/Help/Help";

import ProfileScreen from "../Screens/Dashboard/ProfileScreen/ProfileScreen";
import PersonalInfo from "../Screens/Dashboard/ProfileScreen/Screens/PersonalInfo/PersonalInfo";

import SafetyHome from "../Screens/Dashboard/Safety/SafetyHome";
import EmailVerification from "../Screens/Dashboard/Safety/EmailVerification";
import MobileVerification from "../Screens/Dashboard/Safety/MobileVerification";
import SettingsScreen from "../Screens/Dashboard/Settings/Settings";
import Preference from "../Screens/Dashboard/Preference/Preference";
import About from "../Screens/Dashboard/About/About";
import ParcelHome from "../Screens/Parcels/ParcelHome/ParcelHome";
import PersonalInfoPreview from "../Screens/Dashboard/ProfileScreen/Screens/PersonalInfoPreview/PersonalInfoPreview";
import Donation from "../Screens/Dashboard/Donation/Donation";
import PaymentMethods from "../Screens/Dashboard/PaymnetMethods/PaymentMethods";
import SendAndReceiveParcel from "../Screens/Parcels/SendAndReceiveParcel/SendAndReceiveParcel";
import PickLocation from "../Screens/Parcels/PickLocation/PickLocation";

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
  const options = {
    title: title || "Title", // Set the title
    headerStyle: {
      backgroundColor: backgroundColor,
      elevation: 0,
      shadowOpacity: 0, // Removes shadow on iOS
      shadowRadius: 0, // Removes shadow on iOS
      shadowOffset: { width: 0, height: 0 }, // Removes shadow offset on iOS
    },
    headerTitleStyle: {
      color: "#302f2f",
    },

    headerLeft: () => (
      <TouchableOpacity
        style={{
          marginLeft: 10,
          marginRight: 10,
          borderWidth: 1,
          borderColor: "#ffffff",
          borderRadius: 4,
          backgroundColor: "#fff",
          padding: 5,
          elevation: 2,
        }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={24} color="#E02E88" />
      </TouchableOpacity>
    ),
  };

  // Conditionally add headerRight if showRight is true
  if (showRight) {
    options.headerRight = () => (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#fff",
          paddingVertical: 3,
          paddingHorizontal: 5,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "#E02E88",
          marginRight: 0,
        }}
        onPress={() => navigation.navigate(navigationText)} // Replace with your desired navigation action
      >
        <Ionicons name="help-circle-outline" size={18} color="#E02E88" />
        <Text
          style={{
            color: "#E02E88",
            marginLeft: 2,
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          {rightText}
        </Text>
      </TouchableOpacity>
    );
  }

  return options;
};

const DrawerNavigator = ({ route }) => {
  const placeName = route?.params?.placeName || "";
  return (
    <>
      <StatusBar backgroundColor="#f5f2f2" barStyle="dark-content" />

      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />} // Use custom drawer
        screenOptions={{
          header: ({ navigation }) => (
            <CustomAppBar navigation={navigation} placeName={placeName} />
          ),
        }}
      >
        {/* Home Screen as default */}
        <Drawer.Screen name="Home" component={Home} />
      </Drawer.Navigator>
    </>
  );
};

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator>
      {/* Drawer screens */}
      <Stack.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />

      {/* RideBook screen */}
      <Stack.Screen name="RideBook" component={RideBook} />

      {/* SelectDropLocation screen using reusable function */}
      <Stack.Screen
        name="SelectDropLocation"
        component={SelectDropLocation}
        options={({ navigation }) =>
          getCommonOptions(navigation, "Designation")
        }
      />

      {/* ShowPrice screen using reusable function */}
      <Stack.Screen
        name="ShowPrice"
        component={ShowPrice}
        options={({ navigation }) =>
          getCommonOptions(navigation, "Book Your Ride", "#f5f2f2")
        }
      />

      {/* Looking for Ride screen */}
      <Stack.Screen
        name="lookingforride"
        component={LookingForRide}
        options={{ headerShown: false }}
      />

      {/* MapPreview screen using reusable function */}
      <Stack.Screen
        name="MapPreview"
        component={MapPreview}
        options={({ navigation }) => getCommonOptions(navigation, "Map")}
      />

      <Stack.Screen
        name="Favorite"
        component={FavoritePlace}
        options={({ navigation }) => getCommonOptions(navigation, "Favorite")}
      />

      {/* CaptainAcceptRide screen */}
      <Stack.Screen
        name="captaineacceptride"
        component={CaptainAcceptRide}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RideHistory"
        component={RideHistory}
        options={({ navigation }) =>
          getCommonOptions(navigation, "Book History")
        }
      />

      <Stack.Screen
        name="Safety"
        component={SafetyHome}
        options={({ navigation }) =>
          getCommonOptions(navigation, "Safety & Privacy", "#fff")
        }
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
        name="ReferAndEarn"
        component={ReferAndEarn}
        options={({ navigation }) =>
          getCommonOptions(
            navigation,
            "Refer and Earn",
            "#f5f2f2",
            true,
            "FAQs"
          )
        }
      />
      <Stack.Screen
        name="Notifications"
        component={Notification}
        options={({ navigation }) =>
          getCommonOptions(navigation, "Notifications", "#f5f2f2")
        }
      />
      <Stack.Screen
        name="Help"
        component={Help}
        options={({ navigation }) =>
          getCommonOptions(navigation, "Help", "#f5f2f2", true)
        }
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) =>
          getCommonOptions(navigation, "Profile", "#f5f2f2")
        }
      />
      <Stack.Screen
        name="PersonalInfo"
        component={PersonalInfo}
        options={({ navigation }) =>
          getCommonOptions(navigation, "Personal Info", "#f5f2f2")
        }
      />

      <Stack.Screen
        name="PersonalInfoPreview"
        component={PersonalInfoPreview}
        options={({ navigation }) =>
          getCommonOptions(
            navigation,
            "Personal Info",
            "#f5f2f2",
            true,
            "Edit Profile",
            "PersonalInfo"
          )
        }
      />

      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={({ navigation }) =>
          getCommonOptions(navigation, "Settings", "#f5f2f2")
        }
      />
      <Stack.Screen
        name="Preference"
        component={Preference}
        options={({ navigation }) =>
          getCommonOptions(navigation, "Preference", "#f5f2f2")
        }
      />

      <Stack.Screen
        name="Donation"
        component={Donation}
        options={({ navigation }) =>
          getCommonOptions(navigation, "Support Our Mission", "#f5f2f2")
        }
      />

      <Stack.Screen
        name="About"
        component={About}
        options={({ navigation }) =>
          getCommonOptions(navigation, "About", "#f5f2f2", true, "Help", "Help")
        }
      />

      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethods}
        options={({ navigation }) =>
          getCommonOptions(navigation, "Payment", "#f5f2f2")
        }
      />

      {/* parcel screens */}
      <Stack.Screen
        name="ParcelHome"
        component={ParcelHome}
        options={({ navigation }) =>
          getCommonOptions(navigation, "Send or Receive Parcel", "#f5f2f2")
        }
      />
      <Stack.Screen
        name="SendReceiveParcel"
        component={SendAndReceiveParcel}
        options={({ navigation }) =>
          getCommonOptions(navigation, "Send or Receive Parcel", "#f5f2f2")
        }
      />
      <Stack.Screen
        name="ParcelPickLocation"
        component={PickLocation}
        options={({ navigation }) =>
          getCommonOptions(navigation, "Pickup Location", "#fff")
        }
      />
    </Stack.Navigator>
  );
};

export default AuthenticatedStack;
