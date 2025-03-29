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
    // const handleDeepLink = (event) => {
    //   const url = event.url;

    //   if (url.includes("maps.google.com") || url.startsWith("geo:")) {
    //     // const checkReady = setInterval(async () => {

    //     const checkReady = async () => {
    //       const coordinates = extractCoordinates(url);
    //       console.log(`URL: ${JSON.stringify(coordinates)}`);
    //       if (coordinates) {
    //         // const getLocation = async () => {
    //         //   try {
    //         //     await dispatch(fetchLocation()).unwrap(); // Wait for the async operation
    //         //     // Now you can safely use location data here
    //         //     console.log("Location data:", location);
    //         //   } catch (error) {
    //         //     console.error("Failed to fetch location:", error);
    //         //   }
    //         // };
    //         // // const dataNew =  dispatch(fetchLocation());
    //         // getLocation();

    //         // dispatch(fetchLocation());
    //         dispatch(setIsBeforeBook(true));
    //         const locationResult = await dispatch(fetchLocation()).unwrap();
    //         console.log("Fetched location:", locationResult.location);

    //         const data = await fetchNameAndVicinity(
    //           coordinates?.latitude,
    //           coordinates?.longitude
    //         );

    //         // setDropDetails
    //         await dispatch(
    //           setDropDetails({
    //             location: {
    //               lat: coordinates.latitude,
    //               lng: coordinates.longitude,
    //             },
    //             name: data?.name,
    //             vicinity: data?.vicinity,
    //           })
    //         ).payload;

    //         // console.log(
    //         //   data2,
    //         //   "=---------------here data2-------==============="
    //         // );

    //         navigationRef?.current?.navigate("ShowPrice");
    //       }

    //       // Alert.alert(
    //       //   "Location Detected",
    //       //   `URL: ${JSON.stringify(coordinates)}`
    //       // );
    //       // clearInterval(checkReady);

    //       // else {
    //       //   console.log("navigation not ready");
    //       // }
    //     };

    //     checkReady();
    //     // }, 100);
    //   }
    // };

    // Handle when the app is opened from a deep link

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
    // const checkTokenAndNavigate = async () => {
    //   try {
    //     const storedToken = await AsyncStorage.getItem("token");
    //     // console.log("storedToken", storedToken);
    //     if (storedToken) {
    //       try {
    //         // console.log("kjhg");

    //         await handleTokenValidation(JSON.parse(storedToken));

    //         const previousOrders = await API.get("/user/all-orders", {
    //           headers: {
    //             Authorization: `Bearer ${JSON.parse(storedToken)}`,
    //             "Content-Type": "application/json",
    //           },
    //         });
    //         console.log("previousOrders: " + previousOrders?.data);

    //         const checkReady = setInterval(() => {
    //           if (
    //             navigationRef.current?.isReady() &&
    //             previousOrders?.data?.length
    //           ) {
    //             previousOrders?.data?.forEach(async (singleOrder) => {
    //               // console.log(singleOrder);
    //               console.log("before sockets ---------------------------");
    //               if (isConnected) {
    //                 console.log("connectd -----------------------------");
    //                 socket.emit("ride-live-communication", {
    //                   orderId: singleOrder?._id,
    //                   userType: "user",
    //                 });
    //               }
    //               if (singleOrder.status === "pending") {
    //                 let dropDetails = {
    //                   location: {
    //                     lat: singleOrder?.drop?.coordinates[1],
    //                     lng: singleOrder?.drop?.coordinates[0],
    //                   },
    //                   name: singleOrder?.dropAddress,
    //                   vicinity: singleOrder?.dropVicinity,
    //                 };

    //                 let pickupDetails = {
    //                   location: {
    //                     lat: singleOrder?.pickup?.coordinates[1],
    //                     lng: singleOrder?.pickup?.coordinates[0],
    //                   },
    //                   name: singleOrder?.pickupAddress,
    //                   vicinity: singleOrder?.pickupVicinity,
    //                 };
    //                 dispatch(setPickUpDetails(pickupDetails));
    //                 dispatch(setDropDetails(dropDetails));
    //                 dispatch(
    //                   setIsSendOrReceiveParcel(
    //                     singleOrder?.isSendOrReceiveParcel
    //                   )
    //                 );

    //                 navigationRef.current?.navigate("lookingforride", {
    //                   orderId: singleOrder?._id,
    //                   orderPlaceTime: singleOrder.orderPlaceTime,
    //                 });
    //               } else if (singleOrder.status === "accept") {
    //                 // let data2 = await dispatch(
    //                 //   setDropDetails({
    //                 //     location: {
    //                 //       lat: coordinates.latitude,
    //                 //       lng: coordinates.longitude,
    //                 //     },
    //                 //     name: data?.name,
    //                 //     vicinity: data?.vicinity,
    //                 //   })
    //                 // ).payload;
    //                 await dispatch(setCompleteRideDetails(singleOrder)).payload;
    //                 navigationRef.current?.navigate("captaineacceptride");
    //               } else if (singleOrder.status === "waiting") {
    //                 console.log(
    //                   "----------------waiting order exist--------------"
    //                 );

    //                 navigationRef.current?.navigate("lookingforride", {
    //                   orderId: singleOrder?._id,
    //                   orderPlaceTime: singleOrder.orderPlaceTime,
    //                   futureTime: singleOrder.futureTime,
    //                 });
    //               }
    //             });

    //             clearInterval(checkReady);
    //           }
    //         }, 100);
    //         // console.log("previous", previousOrders?.data);
    //         dispatch(setOrders(previousOrders?.data));
    //         // dispatch(setToken(JSON.parse(storedToken)));
    //       } catch (error) {
    //         dispatch(setToken(JSON.parse(storedToken)));

    //         console.log("all order fetch failed in main navogation stack");
    //         console.log(error);
    //       }
    //     } else {
    //       dispatch(noToken(false));
    //     }

    //     return () => clearInterval(checkReady);
    //   } catch (error) {
    //     console.error("Error reading token or initializing navigation:", error);
    //   }
    // };

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
        if (isConnected && singleOrder.status === "pending") {
          socket.emit("ride-live-communication", {
            orderId: singleOrder?._id,
            userType: "user",
          });
        }

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
      dispatch(noToken(false));
      AsyncStorage.removeItem("token");
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

  // Handle notifications
  // const handleNotification = useCallback(
  //   (notification) => {
  //     const id = notification?.request?.identifier;
  //     if (!id || processedNotifications.has(id)) return;

  //     const screen = notification?.request?.content?.data?.screen;

  //     // console.log(screen, "-----------------screen--------------------------");

  //     const order = notification?.request?.content?.data?.order;

  //     // console.log(order, "--------------------------------");

  //     if (screen) {
  //       let newOrder;
  //       if (navigationRef.current?.isReady()) {
  //         if (screen === "lookingforride") {
  //           const newOrder = JSON.parse(order);
  //           let dropDetails = {
  //             location: {
  //               lat: newOrder?.drop?.coordinates[1],
  //               lng: newOrder?.drop?.coordinates[0],
  //             },
  //             name: newOrder?.dropAddress,
  //             vicinity: newOrder?.dropVicinity,
  //           };

  //           let pickupDetails = {
  //             location: {
  //               lat: newOrder?.pickup?.coordinates[1],
  //               lng: newOrder?.pickup?.coordinates[0],
  //             },
  //             name: newOrder?.pickupAddress,
  //             vicinity: newOrder?.pickupVicinity,
  //           };
  //           dispatch(setPickUpDetails(pickupDetails));
  //           dispatch(setDropDetails(dropDetails));
  //           dispatch(setIsSendOrReceiveParcel(newOrder?.isSendOrReceiveParcel));

  //           navigationRef.current.navigate(screen, {
  //             orderId: newOrder._id,
  //           });
  //         } else if (screen === "captaineacceptride") {
  //           newOrder = JSON.parse(order);
  //           dispatch(setCompleteRideDetails(newOrder));
  //           navigationRef.current?.navigate(screen);
  //         } else if (screen === "Chat") {
  //           newOrder = JSON.parse(order);
  //           dispatch(setCompleteRideDetails(newOrder));

  //           navigationRef.current?.navigate("AuthenticatedStack", {
  //             // screen: "Chat",
  //             params: {
  //               screen: "chat",
  //               orderId: newOrder._id,
  //               captainDetails: newOrder?.acceptCaptain,
  //             },
  //           });
  //         }
  //       } else {
  //         setPendingNotification(screen);
  //       }
  //     }

  //     setProcessedNotifications((prev) => new Set(prev).add(id));
  //   },
  //   [processedNotifications]
  // );

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

  // const { dropDetails } = useSelector((state) => state.allRideDetails);

  // useEffect(() => {
  //   if (dropDetails) {
  //     setTimeout(() => {
  //       console.log("✅ dropDetails updated! Navigating...");
  //       navigationRef.current?.navigate("ShowPrice");
  //     }, 500); // Adjust delay if necessary
  //   }
  // }, [dropDetails]);

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
