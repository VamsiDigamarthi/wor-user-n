import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "../Screens/Dashboard/Profile/Profile";
import Home from "../Screens/Dashboard/Home/Home";
import RideBook from "../Screens/Dashboard/RideBook/RideBook";
import CustomAppBar from "../Utils/CustomAppBar/CustomAppBar";
import SelectDropLocation from "../Screens/Dashboard/SelectDropLocation/SelectDropLocation";
import {
  Pressable,
  Settings,
  StatusBar,
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
import PickLocation from "../Screens/Parcels/PickLocation/PickLocation";
import RideDetails from "../Components/Dashboard/CaptainAcceptCom/RideDetails/RideDetails";
import CaptainRideComplete from "../Components/Dashboard/CaptainAcceptCom/CapatinRideComplete/CaptainRideComplete";
import MapWithCurrentLocation from "../Components/Dashboard/FixedMapView/FixedMapView";
import ParcelMapWithBottomSheet from "../Screens/Parcels/ParcelMapWithBottomSheet/ParcelMapWithBottomSheet";

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
        name="FixMapPreview"
        component={MapWithCurrentLocation}
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
        name="captaineacceptrideusershowridedetails"
        component={RideDetails}
        options={({ navigation }) =>
          getCommonOptions(navigation, "Ride Details", "#f5f2f2")
        }
      />

      <Stack.Screen
        name="captainrideComplete"
        component={CaptainRideComplete}
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
          getCommonOptions(navigation, "Notifications", "#f5f2f2", true, "Edit")
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
            "Edit",
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
      {/* <Stack.Screen
        name="SendReceiveParcel"
        component={SendAndReceiveParcel}
        options={({ navigation }) =>
          getCommonOptions(navigation, "Send or Receive Parcel", "#f5f2f2")
        }
      /> */}
      <Stack.Screen
        name="ParcelPickLocation"
        component={PickLocation}
        options={({ navigation }) =>
          getCommonOptions(navigation, "Pickup Location", "#fff")
        }
      />
      <Stack.Screen
        name="ParcelMapWithBottomSheet"
        component={ParcelMapWithBottomSheet}
        options={({ navigation }) =>
          getCommonOptions(navigation, "Parcel Details", "#fff")
        }
      />
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

        <Text style={[styles.text]}>{title || "Title"}</Text>
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
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 5,
    borderWidth: 1, // Apply border to all sides
    borderColor: "#FFE2E6",
    // paddingHorizontal: 13,
    // paddingVertical: 5,
    backgroundColor: "white",
    borderRadius: 6,
    height: 50,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    paddingLeft: 10,
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
    borderWidth: 1,
    borderColor: "#FFE2E6",
    width: "85%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    borderRadius: 30,
    paddingRight: 20,
    position: "relative",
    // backgroundColor: "red",
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
