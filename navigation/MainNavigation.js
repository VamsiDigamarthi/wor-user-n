import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import AuthenticatedStack from "./AuthenticatedStack";
import AuthStack from "./AuthStack";
import { Image, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Notifications from "expo-notifications";
import { AppState } from "react-native";
import { noToken, setToken } from "../redux/Features/Auth/LoginSlice";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const dispatch = useDispatch();
  const { token, loading } = useSelector((state) => state.token);

  const navigationRef = useRef();
  const [appState, setAppState] = useState(AppState.currentState);
  const [pendingNotification, setPendingNotification] = useState(null);
  const [processedNotifications, setProcessedNotifications] = useState(new Set());

      useEffect(  () => {
        const checkToken = async () => {
          try {
            const storedToken = await AsyncStorage.getItem("token");
            if (storedToken) {
              dispatch(setToken(JSON.parse(storedToken)));
            } else {
              dispatch(noToken(false));
            }
          } catch (error) {
            console.error("Error reading token", error);
          }
        };

        checkToken();
      }, []);

  const handleNotification = (notification) => {
    const id = notification?.request?.identifier; // Unique identifier for each notification
    if (!id || processedNotifications.has(id)) {
      // Skip if notification has already been processed
      return;
    }

    const screen = notification?.request?.content?.data?.screen;
    if (screen) {
      if (navigationRef.current?.isReady()) {
        navigationRef.current.navigate(screen, {
          screen,
        });
      } else {
        setPendingNotification(screen);
      }
    }

    // Mark notification as processed
    setProcessedNotifications((prev) => new Set(prev).add(id));
  };

  useEffect(() => {
    const appStateListener = AppState.addEventListener("change", (nextAppState) => {
      setAppState(nextAppState);
    });

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
  }, [appState, processedNotifications]);

  useEffect(() => {
    const handleAppLaunchNotification = async () => {
      const response = await Notifications.getLastNotificationResponseAsync();
      if (response) {
        handleNotification(response.notification);
      }
    };

    handleAppLaunchNotification();
  }, [processedNotifications]);

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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          initialRouteName="login"
          options={{ headerShown: false }}
        />
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
