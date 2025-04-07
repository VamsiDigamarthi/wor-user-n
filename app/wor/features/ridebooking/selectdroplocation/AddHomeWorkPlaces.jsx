import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppBarLayout from "../sharedLogics/AppBarLayout";
import { COLORS } from "../../../../../Constants/colors";
import WhereToGo from "./Components/WhereToGo";
import { useAddHomeWorkPlace } from "./Hooks/AddHomeWorkPlaces";
import MicModal from "./MicModal";

const AddHomeWorkPlaces = () => {
  const {
    isMicModalOpenClose,
    setIsMicModalOpenClose,
    micVoiceText,
    setMicVoiceText,
    type,
    title,
    passParams,
  } = useAddHomeWorkPlace();

  return (
    <AppBarLayout
      title={`${type?.slice(0, 1)?.toUpperCase()}${
        type?.slice(1) ?? ""
      } Destination`}
      isPositionAppbar={true}
    >
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
          isMicModalOpenClose={isMicModalOpenClose}
          setIsMicModalOpenClose={setIsMicModalOpenClose}
          height={"100%"}
          isDisplayAddHomePlace={false}
          isDisplayHomeOrWorkPlace={true}
        />
      </View>
      <MicModal
        micVoiceText={micVoiceText}
        setMicVoiceText={setMicVoiceText}
        isMicModalOpenClose={isMicModalOpenClose}
        setIsMicModalOpenClose={setIsMicModalOpenClose}
      />
    </AppBarLayout>
  );
};

export default AddHomeWorkPlaces;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    width: "100%",
    height: "95%",
    gap: 10,
    backgroundColor: COLORS.mainBackgroundColor,
    paddingTop: 100,
  },
});
