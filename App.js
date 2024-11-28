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

// Get the Firebase token for the device
async function getToken() {
  const token = await messaging().getToken();
  console.log("Device FCM Token:", token);
}

// Handle foreground notifications
messaging().onMessage(async (remoteMessage) => {
  console.log("Message received in foreground!", remoteMessage);

  // Show notification using Expo Notifications
  await Notifications.scheduleNotificationAsync({
    content: {
      title: remoteMessage.notification?.title || "New Notification",
      body: remoteMessage.notification?.body || "You have a new message",
    },
    trigger: null, // Immediate display
  });
});

// Handle background notifications
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message received in background!", remoteMessage);

  // Optionally show a notification
  await Notifications.scheduleNotificationAsync({
    content: {
      title: remoteMessage.notification?.title || "Background Notification",
      body: remoteMessage.notification?.body || "You received a new message",
    },
    trigger: null,
  });
});

// Initialize permissions and token fetching
async function initializeNotifications() {
  await requestUserPermission();
  await getToken();
}

initializeNotifications();

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <StatusBar style="auto" />
          <MainNavigation />
          <Toast />
        </SafeAreaView>
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
