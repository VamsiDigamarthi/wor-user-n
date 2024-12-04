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

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const dispatch = useDispatch();
  const { token, loading } = useSelector((state) => state.token);

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

        if (storedToken) {
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
                if (singleOrder.status === "pending") {
                  navigationRef.current?.navigate("lookingforride", {
                    vehicleType: singleOrder.vehicleType,
                    price: singleOrder.price,
                    placeName: singleOrder.pickupAddress,
                    dropAddress: {
                      location: {
                        lat: singleOrder?.drop?.coordinates[1],
                        lng: singleOrder?.drop?.coordinates[0],
                      },
                      name: singleOrder?.dropAddress,
                      vicinity: singleOrder?.dropVicinity,
                    },
                    pickUpCoordinated: {
                      lat: singleOrder?.pickup?.coordinates[1],
                      lng: singleOrder?.pickup?.coordinates[0],
                    },
                    orderId: singleOrder._id,
                    orderPlaceTime: singleOrder.orderPlaceTime,
                  });
                } else if (singleOrder.status === "accept") {
                  navigationRef.current?.navigate("captaineacceptride", {
                    orderDetails: singleOrder,
                  });
                } else if (singleOrder.status === "waiting") {
                  navigationRef.current?.navigate("lookingforride", {
                    vehicleType: singleOrder.vehicleType,
                    price: singleOrder.price,
                    placeName: singleOrder.pickupAddress,
                    dropAddress: {
                      location: {
                        lat: singleOrder?.drop?.coordinates[1],
                        lng: singleOrder?.drop?.coordinates[0],
                      },
                      name: singleOrder?.dropAddress,
                      vicinity: singleOrder?.dropVicinity,
                    },
                    pickUpCoordinated: {
                      lat: singleOrder?.pickup?.coordinates[1],
                      lng: singleOrder?.pickup?.coordinates[0],
                    },
                    orderId: singleOrder._id,
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
        } else {
          dispatch(noToken(false));
        }

        return () => clearInterval(checkReady);
      } catch (error) {
        console.error("Error reading token or initializing navigation:", error);
      }
    };

    checkTokenAndNavigate();
  }, [dispatch]);

  // Handle notifications
  const handleNotification = useCallback(
    (notification) => {
      const id = notification?.request?.identifier;
      if (!id || processedNotifications.has(id)) return;

      const screen = notification?.request?.content?.data?.screen;
      const order = notification?.request?.content?.data?.order;

      if (screen) {
        let newObj;
        if (navigationRef.current?.isReady()) {
          if (screen === "lookingforride") {
            const newOrder = JSON.parse(order);
            newObj = {
              vehicleType: newOrder.vehicleType,
              price: newOrder.price,
              placeName: newOrder.pickupAddress,
              dropAddress: {
                location: {
                  lat: newOrder?.drop?.coordinates[1],
                  lng: newOrder?.drop?.coordinates[0],
                },
                name: newOrder?.dropAddress,
                vicinity: newOrder?.dropVicinity,
              },
              pickUpCoordinated: {
                lat: newOrder?.pickup?.coordinates[1],
                lng: newOrder?.pickup?.coordinates[0],
              },
              orderId: newOrder._id,
            };
          } else if (screen === "captaineacceptride") {
            newObj = JSON.parse(order);
          }

          navigationRef.current.navigate(screen, {
            ...(newObj ?? null),
          });
        } else {
          setPendingNotification(screen);
        }
      }

      setProcessedNotifications((prev) => new Set(prev).add(id));
    },
    [processedNotifications]
  );

  // Listeners for AppState and Notifications
  useEffect(() => {
    const appStateListener = AppState.addEventListener("change", setAppState);

    const foregroundNotificationListener =
      Notifications.addNotificationReceivedListener((notification) => {
        if (appState === "active") {
          console.log("Foreground notification received");
        } else {
          handleNotification(notification);
        }
      });

    const backgroundNotificationListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        handleNotification(response.notification);
      });

    return () => {
      appStateListener.remove();
      foregroundNotificationListener.remove();
      backgroundNotificationListener.remove();
    };
  }, [appState, handleNotification]);

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
        <Stack.Screen
          name="AuthenticatedStack"
          component={AuthenticatedStack}
          initialRouteName="DrawerNavigator"
        />
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
