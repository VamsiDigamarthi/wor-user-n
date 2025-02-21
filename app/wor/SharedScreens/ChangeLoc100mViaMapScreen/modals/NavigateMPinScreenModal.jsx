import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalUI from "../../../utiles/Modal/Modal";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import CustomBtn from "../../../utiles/CustomBtn";
import { fonts } from "../../../fonts/Fonts";

const NavigateMPinScreenModal = ({
  rideBookBeforeCheckMPinAddhar,
  onChangeRideBookBeforeCheckPinAddharHandler,
}) => {
  const { profile } = useSelector((state) => state.profileSlice);

  const navigation = useNavigation();

  const onNavigateAadharUploadUi = () => {
    onChangeRideBookBeforeCheckPinAddharHandler()
    navigation.navigate("ProfileDocumentScreen");
  };

  const onMpinScreen = () => {
    navigation.navigate("SetNewMpin");
  };

  return (
    <ModalUI
      openCloseState={rideBookBeforeCheckMPinAddhar}
      closeModalFun={onChangeRideBookBeforeCheckPinAddharHandler}
      closebtn={false}
    >
      <View style={styles.container}>
        {profile?.aadharCarVerificaation === null && (
          <Text style={styles.text}>
            Book your ride with Aadhar for a safe and Convenient Journey
          </Text>
        )}

        {!profile?.mpin && (
          <Text style={styles.text}>
            MPIN is a secure 4-digit code for safe account access and ride
            protection.
          </Text>
        )}

        <View
          style={{
            flexDirection: "row",
            gap: 10,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {profile?.aadharCarVerificaation === null && (
            <CustomBtn
              title="Gender Verification"
              onPress={onNavigateAadharUploadUi}
              width="50%"
              btnBg="#EA4C89"
              btnColor={"#fff"}
            />
          )}
          {!profile?.mpin && (
            <CustomBtn
              title="Set Mpin"
              onPress={onMpinScreen}
              width="50%"
              btnBg="#EA4C89"
              btnColor={"#fff"}
            />
          )}
        </View>
      </View>
    </ModalUI>
  );
};

export default NavigateMPinScreenModal;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 10,
    paddingVertical: 20,
  },
  text: {
    fontSize: 16,
    fontFamily:fonts.robotoMedium,
    
    textAlign: "center",
    lineHeight: 22,
  },
});
