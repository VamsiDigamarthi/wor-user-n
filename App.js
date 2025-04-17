globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;
import { StatusBar } from "expo-status-bar";
import { Linking, StyleSheet, Alert, Platform } from "react-native";
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
import "react-native-reanimated";
import { SocketProvider } from "./SocketContext";
import { useFonts } from "expo-font";
import RobotoThin from "./assets/fonts/Roboto/Roboto-Thin.ttf";
import RobotoRegular from "./assets/fonts/Roboto/Roboto-Regular.ttf";
import RobotoBold from "./assets/fonts/Roboto/Roboto-Bold.ttf";
import RobotoSemiBold from "./assets/fonts/Roboto/Roboto-SemiBold.ttf";
import RobotoMedium from "./assets/fonts/Roboto/Roboto-Medium.ttf";
import inAppMessaging from "@react-native-firebase/in-app-messaging";
import analytics from "@react-native-firebase/analytics";
import { PlayInstallReferrer } from "react-native-play-install-referrer";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';

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

// // Request notification permissions for both Firebase and Expo
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

  //   // Expo Notifications Permissions
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

messaging().onMessage(async (remoteMessage) => {
  console.log("onMessage triggered");
});

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("setBackgroundMessageHandler triggered");
});

// // Handle foreground notifications// Foreground notifications
messaging().onMessage(async (remoteMessage) => {
  console.log("Message received in foreground!", remoteMessage);

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

// // Background notifications
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message received in background!", remoteMessage);

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
// // Initialize permissions and token fetching
async function initializeNotifications() {
  await requestUserPermission();
}

initializeNotifications();

export default function App() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    PlayInstallReferrer.getInstallReferrerInfo((installReferrerInfo, error) => {
      if (!error) {
        console.log(
          "Install referrer = " + installReferrerInfo.installReferrer
        );
        const referrerParams = new URLSearchParams(
          installReferrerInfo.installReferrer
        );
        const referrerId = referrerParams.get("utm_content");
        console.log("Referrer ID = " + referrerId);

        console.log("UTM Source = " + referrerParams.get("utm_source"));
        console.log("UTM Medium = " + referrerParams.get("utm_medium"));
        console.log("UTM Campaign = " + referrerParams.get("utm_campaign"));
        console.log("UTM Content = " + referrerParams.get("utm_content"));
      } else {
        console.log("Failed to get install referrer info!");
        console.log("Response code: " + error.responseCode);
        console.log("Message: " + error.message);
      }
    });
  }, []);
  useEffect(() => {
    async function onInAppMessage() {
      try {
        // supress false means to show in app messages
        inAppMessaging().setMessagesDisplaySuppressed(false);

        // Use this for campaings
        await analytics().logEvent("message");
        // console.log("In App Message");
      } catch (error) {
        console.log("Firebase inapp messaage error", error.message);
      }
    }
    onInAppMessage();


    const requestTracking = async () => {
      try {
        const { status } = await requestTrackingPermissionsAsync();
        console.log(`Tracking permission: ${status}`);
      } catch (error) {
        console.log(error);
      }
    };

    requestTracking();
  }, []);

  const [loaded, error] = useFonts({
    "roboto-regular": RobotoRegular,
    "roboto-thin": RobotoThin,
    "roboto-bold": RobotoBold,
    "roboto-semiBold": RobotoSemiBold,
    "roboto-medium": RobotoMedium,
  });

  useEffect(() => {
    // requestUserPermission()

    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loaded || error) {
      console.log(loaded, "loaded");
    }
  }, [loaded, error]);

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
  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <SocketProvider>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <StatusBar style="dark" />
              <BottomSheetModalProvider>
                <MainNavigation />
              </BottomSheetModalProvider>
              <Toast />
            </GestureHandlerRootView>
          </SafeAreaView>
        </SafeAreaProvider>
      </SocketProvider>
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
