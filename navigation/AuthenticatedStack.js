import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "../Screens/Dashboard/Profile/Profile";
import Home from "../Screens/Dashboard/Home/Home";
import RideBook from "../Screens/Dashboard/RideBook/RideBook";
import CustomAppBar from "../Utils/CustomAppBar/CustomAppBar";
import SelectDropLocation from "../Screens/Dashboard/SelectDropLocation/SelectDropLocation";

import { StatusBar, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ShowPrice from "../Screens/Dashboard/ShowPrice/ShowPrice";
import LookingForRide from "../Screens/Dashboard/LookingForRide/LookingForRide";
import CaptainAcceptRide from "../Screens/Dashboard/CaptainAcceptRide/CaptainAcceptRide";

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

const DrawerNavigator = ({ route }) => {
  const placeName = route?.params?.placeName || "";
  return (
    <>
      <StatusBar backgroundColor="#f5f2f2" barStyle="dark-content" />

      <Drawer.Navigator
        screenOptions={{
          header: ({ navigation }) => (
            <CustomAppBar navigation={navigation} placeName={placeName} />
          ),
        }}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Profile" component={Profile} />
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

      <Stack.Screen name="RideBook" component={RideBook} />
      <Stack.Screen
        name="SelectDropLocation"
        component={SelectDropLocation}
        options={({ navigation }) => ({
          title: "Designation", // Set the title of the app bar
          headerStyle: {
            backgroundColor: "#fff5f9",
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            color: "#302f2f",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginLeft: 10,
                marginRight: 10,
                borderWidth: 1, // Add border to the back icon
                borderColor: "#ffffff", // Border color
                borderRadius: 4, // Rounded border
                backgroundColor: "#fff", // White background
                padding: 5, // Padding for the icon to give some space
              }}
              onPress={() => navigation.goBack()} // Go back when pressed
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color="#E02E88" // Icon color (matching the theme)
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ShowPrice"
        component={ShowPrice}
        options={({ navigation }) => ({
          title: "Book Your Ride", // Set the title of the app bar
          headerStyle: {
            backgroundColor: "#f5f2f2",
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            color: "#302f2f", // You can also set title color
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginLeft: 10,
                marginRight: 10,
                borderWidth: 1, // Add border to the back icon
                borderColor: "#ffffff", // Border color
                borderRadius: 4, // Rounded border
                backgroundColor: "#fff", // White background
                padding: 5,
                elevation: 2,
              }}
              onPress={() => navigation.goBack()} // Go back when pressed
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color="#E02E88" // Icon color (matching the theme)
              />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="lookingforride"
        component={LookingForRide}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="captaineacceptride"
        component={CaptainAcceptRide}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthenticatedStack;
