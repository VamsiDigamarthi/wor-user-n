import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState, useCallback } from "react";
import AuthenticatedStack from "./AuthenticatedStack";
import AuthStack from "./AuthStack";
import { Image, StyleSheet, View } from "react-native";
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
} from "../app/wor/features/ridebooking/sharedLogics/rideDetailsSlice";
import { useSocket } from "../SocketContext";

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
    const checkTokenAndNavigate = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        // console.log("storedToken", storedToken);
        if (storedToken) {
          try {
            // console.log("kjhg");
            const previousOrders = await API.get("/user/all-orders", {
              headers: {
                Authorization: `Bearer ${JSON.parse(storedToken)}`,
                "Content-Type": "application/json",
              },
            });

            const checkReady = setInterval(() => {
              if (
                navigationRef.current?.isReady() &&
                previousOrders?.data?.length
              ) {
                previousOrders?.data?.forEach((singleOrder) => {
                  // console.log(singleOrder);
                  console.log("before sockets ---------------------------");
                  if (isConnected) {
                    console.log("connectd -----------------------------");
                    socket.emit("ride-live-communication", {
                      orderId: singleOrder?._id,
                      userType: "user",
                    });
                  }
                  if (singleOrder.status === "pending") {
                    let dropDetails = {
                      location: {
                        lat: singleOrder?.drop?.coordinates[1],
                        lng: singleOrder?.drop?.coordinates[0],
                      },
                      name: singleOrder?.dropAddress,
                      vicinity: singleOrder?.dropVicinity,
                    };

                    let pickupDetails = {
                      location: {
                        lat: singleOrder?.pickup?.coordinates[1],
                        lng: singleOrder?.pickup?.coordinates[0],
                      },
                      name: singleOrder?.pickupAddress,
                      vicinity: singleOrder?.pickupVicinity,
                    };
                    dispatch(setPickUpDetails(pickupDetails));
                    dispatch(setDropDetails(dropDetails));
                    dispatch(
                      setIsSendOrReceiveParcel(
                        singleOrder?.isSendOrReceiveParcel
                      )
                    );

                    navigationRef.current?.navigate("lookingforride", {
                      orderId: singleOrder?._id,
                      orderPlaceTime: singleOrder.orderPlaceTime,
                    });
                  } else if (singleOrder.status === "accept") {
                    dispatch(setCompleteRideDetails(singleOrder));
                    navigationRef.current?.navigate("captaineacceptride");
                  } else if (singleOrder.status === "waiting") {
                    console.log(
                      "----------------waiting order exist--------------"
                    );

                    navigationRef.current?.navigate("lookingforride", {
                      orderId: singleOrder?._id,
                      orderPlaceTime: singleOrder.orderPlaceTime,
                      futureTime: singleOrder.futureTime,
                    });
                  }
                });

                clearInterval(checkReady);
              }
            }, 100);
            // console.log("previous", previousOrders?.data);
            dispatch(setOrders(previousOrders?.data));
            dispatch(setToken(JSON.parse(storedToken)));
          } catch (error) {
            dispatch(setToken(JSON.parse(storedToken)));

            console.log("all order fetch failed in main navogation stack");
            console.log(error);
          }
        } else {
          dispatch(noToken(false));
        }

        return () => clearInterval(checkReady);
      } catch (error) {
        console.error("Error reading token or initializing navigation:", error);
      }
    };

    checkTokenAndNavigate();
  }, [dispatch, isConnected]);

  // Handle notifications
  const handleNotification = useCallback(
    (notification) => {
      const id = notification?.request?.identifier;
      if (!id || processedNotifications.has(id)) return;

      const screen = notification?.request?.content?.data?.screen;
      const order = notification?.request?.content?.data?.order;

      if (screen) {
        let newOrder;
        if (navigationRef.current?.isReady()) {
          if (screen === "lookingforride") {
            const newOrder = JSON.parse(order);
            let dropDetails = {
              location: {
                lat: newOrder?.drop?.coordinates[1],
                lng: newOrder?.drop?.coordinates[0],
              },
              name: newOrder?.dropAddress,
              vicinity: newOrder?.dropVicinity,
            };

            let pickupDetails = {
              location: {
                lat: newOrder?.pickup?.coordinates[1],
                lng: newOrder?.pickup?.coordinates[0],
              },
              name: newOrder?.pickupAddress,
              vicinity: newOrder?.pickupVicinity,
            };
            dispatch(setPickUpDetails(pickupDetails));
            dispatch(setDropDetails(dropDetails));
            dispatch(setIsSendOrReceiveParcel(newOrder?.isSendOrReceiveParcel));

            navigationRef.current.navigate(screen, {
              orderId: newOrder._id,
            });
          } else if (screen === "captaineacceptride") {
            newOrder = JSON.parse(order);
            dispatch(setCompleteRideDetails(newOrder));
            navigationRef.current?.navigate(screen);
          }
          else if(screen === 'Chat'){
            newOrder = JSON.parse(order);
            dispatch(setCompleteRideDetails(newOrder));
            navigationRef.current?.navigate(screen,{
              orderId: newOrder._id,
              captainDetails :newOrder?.acceptCaptain
            });
          }
        } else {
          setPendingNotification(screen);
        }
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
      navigationRef.current.navigate(pendingNotification, {
        screen: pendingNotification,
      });
      setPendingNotification(null);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingCard}>
        <Image
          style={styles.loadingImage}
          source={require("../assets/images/logo.png")}
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
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
