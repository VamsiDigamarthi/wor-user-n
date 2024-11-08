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
import { useNavigation } from "@react-navigation/native";
import MapPreview from "../Screens/Dashboard/MapPreview/MapPreview";
import FavoritePlace from "../Screens/Dashboard/FavoritePlace/FavoritePlace";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Reusable function to handle common header options
const getCommonOptions = (navigation, title, backgroundColor = "#fff5f9") => ({
  title: title || "Title", // Set the title
  headerStyle: {
    backgroundColor: backgroundColor,
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
});

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
    </Stack.Navigator>
  );
};

export default AuthenticatedStack;
