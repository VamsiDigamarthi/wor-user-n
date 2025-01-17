import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppBarLayout from "../sharedLogics/AppBarLayout";
import WhereToGo from "./Components/WhereToGo";
import SelectOnMap from "./Components/SelectOnMap";

const SelectDropLocation = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <AppBarLayout title="Select Destination">
        <View style={styles.container}>
          <WhereToGo />
        </View>
        <SelectOnMap />
      </AppBarLayout>
    </KeyboardAvoidingView>
  );
};

export default SelectDropLocation;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    width: "100%",
    height: "77%",
    gap: 10,
  },
});
