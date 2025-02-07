import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AppBarLayout from "../sharedLogics/AppBarLayout";
import WhereToGo from "./Components/WhereToGo";
import SelectOnMap from "./Components/SelectOnMap";
import { useSelectDropLocationHook } from "./Hooks/SelectDropLocation.hook";
import MicModal from "./MicModal";
import { useRoute } from "@react-navigation/native";
import { COLORS } from "../../../../../Constants/colors";
import { useEffect, useState } from "react";

const SelectDropLocation = () => {
  const {
    isMicModalOpenClose,
    setIsMicModalOpenClose,
    micVoiceText,
    setMicVoiceText,
  } = useSelectDropLocationHook();

  // const [titleSt, setTitleSt] = useState(null)
  // const [paramsSt, setParamsSt] = useState(null)
  const { title, passParams } = useRoute().params || {};

  // useEffect(() => {
  //   if (title) {
  //     setTitleSt(title);
  //   }
  //   if (passParams) {
  //     setParamsSt(passParams);
  //   }
  // }, [title, passParams]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <AppBarLayout title="Select Destination" isPositionAppbar={true}>
            <View
              style={[
                styles.container,
                { paddingTop: Platform.OS == "ios" ? 110 : 100 },
              ]}
            >
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
        </TouchableWithoutFeedback>
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
    height: "95%",
    gap: 10,
    backgroundColor: COLORS.mainBackgroundColor,
    paddingTop: 100,
    // backgroundColor: "blue",
  },
});
