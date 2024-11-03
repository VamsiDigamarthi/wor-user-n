import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MainNavigation from "./navigation/MainNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Import GestureHandlerRootView

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Wrap everything in GestureHandlerRootView */}
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <StatusBar style="auto" />
        <MainNavigation />
      </SafeAreaView>
    </GestureHandlerRootView>
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
