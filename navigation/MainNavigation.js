import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState, useCallback } from "react";
import AuthenticatedStack from "./AuthenticatedStack";
import AuthStack from "./AuthStack";
import { Alert, Image, Linking, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Notifications from "expo-notifications";
import { AppState } from "react-native";
import { noToken, setToken } from "../redux/Features/Auth/LoginSlice";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { API } from "../Constants/url";
import { setOrders } from "../redux/Features/Auth/PreviousOrders";
import {
  setCompleteRideDetails,
  setDropDetails,
  setIsSendOrReceiveParcel,
  setPickUpDetails,
  pickUpDetails,
  setIsBeforeBook,
} from "../app/wor/features/ridebooking/sharedLogics/rideDetailsSlice";
import { useSocket } from "../SocketContext";
import { fetchNameAndVicinity } from "../Constants/displaylocationmap";
import { fetchLocation } from "../redux/Features/Location/LocationSlice";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const dispatch = useDispatch();
  const { token, loading } = useSelector((state) => state.token);
  const [initialScreen, setInitialScreen] = useState("DrawerNavigator");
  const [params, setParams] = useState(null);
  const { socket, isConnected } = useSocket();

  const navigationRef = useRef();
  const [appState, setAppState] = useState(AppState.currentState);
  const [pendingNotification, setPendingNotification] = useState(null);
  const [processedNotifications, setProcessedNotifications] = useState(
    new Set()
  );

  useEffect(() => {
    const handleDeepLink = async (event) => {
      const url = event.url;
      if (url.includes("maps.google.com") || url.startsWith("geo:")) {
        const coordinates = extractCoordinates(url);
        if (coordinates) {
          await new Promise((resolve) => {
            const interval = setInterval(() => {
              if (navigationRef.current?.isReady()) {
                clearInterval(interval);
                resolve();
              }
            }, 100);
          });

          dispatch(setIsBeforeBook(true));
          const locationResult = await dispatch(fetchLocation()).unwrap();
          console.log("Fetched location:", locationResult.location);

          const data = await fetchNameAndVicinity(
            coordinates.latitude,
            coordinates.longitude
          );

          await dispatch(
            setDropDetails({
              location: {
                lat: coordinates.latitude,
                lng: coordinates.longitude,
              },
              name: data?.name,
              vicinity: data?.vicinity,
            })
          ).payload;

          navigationRef.current?.navigate("ShowPrice");
        }
      }
    };

    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    // Listen for deep link changes
    const linkingListener = Linking.addEventListener("url", handleDeepLink);

    return () => {
      linkingListener.remove(); // Cleanup
    };
  }, []);

  useEffect(() => {
    const checkTokenAndNavigate = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          const isValid = await handleTokenValidation(JSON.parse(storedToken));
          if (!isValid) return;

          const previousOrders = await API.get("/user/all-orders", {
            headers: {
              Authorization: `Bearer ${JSON.parse(storedToken)}`,
              "Content-Type": "application/json",
            },
          });

          dispatch(setOrders(previousOrders?.data));

          await new Promise((resolve) => {
            const interval = setInterval(() => {
              if (navigationRef.current?.isReady()) {
                clearInterval(interval);
                processOrders(previousOrders?.data);
                resolve();
              }
            }, 100);
          });
        } else {
          dispatch(noToken(false));
        }
      } catch (error) {
        console.error("Error reading token or initializing navigation:", error);
      }
    };

    const processOrders = (orders) => {
      orders?.forEach((singleOrder) => {
        // if (isConnected && singleOrder.status === "pending") {
        if (isConnected) {
          socket.emit("ride-live-communication", {
            orderId: singleOrder?._id,
            userType: "user",
          });
        }
        // }

        if (["pending", "accept", "waiting"].includes(singleOrder.status)) {
          handleOrderNavigation(singleOrder);
        }
      });
    };

    const handleOrderNavigation = (order) => {
      let dropDetails = {
        location: {
          lat: order?.drop?.coordinates[1],
          lng: order?.drop?.coordinates[0],
        },
        name: order?.dropAddress,
        vicinity: order?.dropVicinity,
      };
      let pickupDetails = {
        location: {
          lat: order?.pickup?.coordinates[1],
          lng: order?.pickup?.coordinates[0],
        },
        name: order?.pickupAddress,
        vicinity: order?.pickupVicinity,
      };

      dispatch(setPickUpDetails(pickupDetails));
      dispatch(setDropDetails(dropDetails));
      dispatch(setIsSendOrReceiveParcel(order?.isSendOrReceiveParcel));
      // console.log("order.status", order.orderPlaceDate, order._id);

      if (order.status === "pending") {
        navigationRef.current?.navigate("lookingforride", {
          orderId: order?._id,
          orderPlaceTime: order.orderPlaceTime,
        });
      } else if (order.status === "accept") {
        dispatch(setCompleteRideDetails(order));
        navigationRef.current?.navigate("captaineacceptride");
      } else if (order.status === "waiting") {
        navigationRef.current?.navigate("lookingforride", {
          orderId: order?._id,
          orderPlaceTime: order.orderPlaceTime,
          futureTime: order.futureTime,
        });
      }
    };

    checkTokenAndNavigate();
  }, [dispatch, isConnected]);

  const handleTokenValidation = async (storedToken) => {
    const profile = await checkProfileValidOrNot(storedToken);
    if (!profile) {
      // dispatch(noToken(false));
      // AsyncStorage.removeItem("token");
      return false;
    } else {
      dispatch(setToken(storedToken));
      return true;
    }
  };

  const checkProfileValidOrNot = async (token) => {
    try {
      const response = await API.get("/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error validating profile:", error.message);
      return null;
    }
  };

  const handleNotification = useCallback(
    async (notification) => {
      const id = notification?.request?.identifier;
      if (!id || processedNotifications.has(id)) return;

      const { screen, order } = notification?.request?.content?.data;
      if (!screen) return;

      const parsedOrder = JSON.parse(order);

      switch (screen) {
        case "lookingforride":
          dispatch(setPickUpDetails(parsedOrder.pickupDetails));
          dispatch(setDropDetails(parsedOrder.dropDetails));
          dispatch(setIsSendOrReceiveParcel(parsedOrder.isSendOrReceiveParcel));
          navigationRef.current?.navigate(screen, { orderId: parsedOrder._id });
          break;

        case "captaineacceptride":
          dispatch(setCompleteRideDetails(parsedOrder));
          navigationRef.current?.navigate(screen);
          break;

        case "Chat":
          dispatch(setCompleteRideDetails(parsedOrder));
          navigationRef.current?.navigate("AuthenticatedStack", {
            screen: "chat",
            params: {
              orderId: parsedOrder._id,
              captainDetails: parsedOrder.acceptCaptain,
            },
          });
          break;

        default:
          break;
      }

      setProcessedNotifications((prev) => new Set(prev).add(id));
    },
    [processedNotifications]
  );

  // Listeners for AppState and Notifications
  // Handle notifications received while app is launched
  useEffect(() => {
    const handleAppLaunchNotification = async () => {
      const response = await Notifications.getLastNotificationResponseAsync();
      if (response) {
        handleNotification(response.notification);
      }
    };

    handleAppLaunchNotification();
  }, [handleNotification]);

  // Handle pending notifications when NavigationContainer is ready
  const onReady = () => {
    if (pendingNotification) {
      // navigationRef.current.navigate(pendingNotification, {
      //   screen: pendingNotification,
      // });

      navigationRef.current?.navigate("AuthenticatedStack", {
        screen: pendingNotification, // Dynamic screen name
        params: {},
      });
      setPendingNotification(null);
    }
  };

  // deep link

  const extractCoordinates = (geoUrl) => {
    const match = geoUrl.match(
      /geo:([-+]?[0-9]*\.?[0-9]+),([-+]?[0-9]*\.?[0-9]+)/
    );
    if (match) {
      return {
        latitude: parseFloat(match[1]),
        longitude: parseFloat(match[2]),
      };
    }
    return null;
  };

  if (loading) {
    return (
      <View style={styles.loadingCard}>
        {/* <Image
          style={styles.loadingImage}
          source={require("../assets/images/logo.png")}
        /> */}

        <Image
          style={styles.loadingImage}
          source={require("../assets/wor user.gif")}
        />
      </View>
    );
  }

  return (
    <NavigationContainer ref={navigationRef} onReady={onReady}>
      <Stack.Navigator
        initialRouteName={token ? "AuthenticatedStack" : "AuthStack"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AuthenticatedStack">
          {(props) => (
            <AuthenticatedStack
              {...props}
              initialRoute={initialScreen}
              params={params}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="AuthStack" component={AuthStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({
  loadingCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingImage: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
    // flex: 1,
  },
});
