import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import AppBarLayout from "../sharedLogics/AppBarLayout";
import WhereToGo from "./Components/WhereToGo";
import SelectOnMap from "./Components/SelectOnMap";
import { useSelectDropLocationHook } from "./Hooks/SelectDropLocation.hook";
import MicModal from "./MicModal";

const SelectDropLocation = () => {
  const {
    isMicModalOpenClose,
    setIsMicModalOpenClose,
    micVoiceText,
    setMicVoiceText,
  } = useSelectDropLocationHook();
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <AppBarLayout title="Select Destination">
          <View style={styles.container}>
            <WhereToGo
              micVoiceText={micVoiceText}
              setMicVoiceText={setMicVoiceText}
              setIsMicModalOpenClose={setIsMicModalOpenClose}
            />
          </View>
          <SelectOnMap />
        </AppBarLayout>
      </KeyboardAvoidingView>
      <MicModal
        setMicVoiceText={setMicVoiceText}
        isMicModalOpenClose={isMicModalOpenClose}
        setIsMicModalOpenClose={setIsMicModalOpenClose}
      />
    </>
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
