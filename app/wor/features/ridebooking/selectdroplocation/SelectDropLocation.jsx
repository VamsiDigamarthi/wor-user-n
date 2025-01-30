import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import AppBarLayout from "../sharedLogics/AppBarLayout";
import WhereToGo from "./Components/WhereToGo";
import SelectOnMap from "./Components/SelectOnMap";
import { useSelectDropLocationHook } from "./Hooks/SelectDropLocation.hook";
import MicModal from "./MicModal";
import { useRoute } from "@react-navigation/native";

const SelectDropLocation = () => {
  const {
    isMicModalOpenClose,
    setIsMicModalOpenClose,
    micVoiceText,
    setMicVoiceText,
  } = useSelectDropLocationHook();

  const { title, passParams } = useRoute().params;

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <AppBarLayout title="Select Destination" isPositionAppbar={true}>
          <View style={styles.container}>
            <WhereToGo
              title={title}
              passParams={passParams}
              micVoiceText={micVoiceText}
              setMicVoiceText={setMicVoiceText}
              setIsMicModalOpenClose={setIsMicModalOpenClose}
            />
          </View>
          <SelectOnMap />
        </AppBarLayout>
      </KeyboardAvoidingView>
      <MicModal
        micVoiceText={micVoiceText}
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
    height: "94%",
    gap: 10,
    backgroundColor: "#f7f7f7",
    paddingTop: 100,
    // backgroundColor: "blue",
  },
});
