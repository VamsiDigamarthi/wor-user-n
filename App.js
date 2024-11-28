import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MainNavigation from "./navigation/MainNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Import GestureHandlerRootView
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";
import store from "./redux/store";
// import messaging from '@react-native-firebase/messaging';
// import messaging from '@react-native-firebase/messaging';
// Request permission to receive notifications
// async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Notification permission granted');
//   } else {
//     console.log('Notification permission denied');
//   }
// }

// Get the device token to send notifications to
async function getToken() {
  const token = await messaging().getToken();
  console.log("Device FCM Token:", token);
}

// Call these methods in your app initialization (e.g., componentDidMount or useEffect)
// requestUserPermission();
// getToken();

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
