import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MainNavigation from "./navigation/MainNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";
import store from "./redux/store";
import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import NoInternet from "./Components/unavailable/NoInternet";
import { LogBox } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

LogBox.ignoreLogs([
  "`new NativeEventEmitter()` was called with a non-null argument without the required `addListener` method",
  "`new NativeEventEmitter()` was called with a non-null argument without the required `removeListeners` method",
]);

// Configure foreground notifications for Expo
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Request notification permissions for both Firebase and Expo
async function requestUserPermission() {
  // Firebase Messaging Permissions
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Firebase Messaging: Notification permission granted");
  } else {
    console.log("Firebase Messaging: Notification permission denied");
  }

  // Expo Notifications Permissions
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus === "granted") {
    console.log("Expo Notifications: Permission granted");
  } else {
    console.log("Expo Notifications: Permission denied");
  }
}

// Handle foreground notifications// Foreground notifications
messaging().onMessage(async (remoteMessage) => {
  // console.log("Message received in foreground!", remoteMessage);

  if (remoteMessage.notification) {
    // Only schedule notification if not displayed natively
    await Notifications.scheduleNotificationAsync({
      content: {
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        data: { ...remoteMessage.data },
      },
      trigger: null,
      mydata: remoteMessage.data,
    });
  }
});

// Background notifications
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  // console.log("Message received in background!", remoteMessage);

  if (remoteMessage.notification) {
    // Optionally schedule notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        data: { ...remoteMessage.data },
      },
      trigger: null,
      mydata: remoteMessage.data,
    });
  }
});
// Initialize permissions and token fetching
async function initializeNotifications() {
  await requestUserPermission();
}

initializeNotifications();

export default function App() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  if (!isConnected) {
    return (
      <NoInternet
        onclick={() => {
          NetInfo.fetch().then((state) => {
            setIsConnected(state.isConnected);
          });
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}> */}
        <StatusBar style="auto" />
        <BottomSheetModalProvider>
          <MainNavigation />
        </BottomSheetModalProvider>
        <Toast />
        {/* </SafeAreaView> */}
      </GestureHandlerRootView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
