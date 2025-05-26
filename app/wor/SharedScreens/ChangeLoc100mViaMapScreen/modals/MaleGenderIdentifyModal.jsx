import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalUI from "../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../Components/InfoUi/Styles/InfoModalStyles";
import CustomBtn from "../../../utiles/CustomBtn";

const MaleGenderIdentifyModal = ({
  maleGenderIdentify,
  toggelMaleGenderIdentify,
}) => {
  return (
    <ModalUI
      openCloseState={maleGenderIdentify}
      closeModalFun={toggelMaleGenderIdentify}
      closebtn={false}
      style={infoModalStyles.aadharModalStyles}
      insideCardStyle={infoModalStyles.insideCardStyle}
    >
      <View style={{ gap: 10, width: "100%", padding: 5 }}>
        <Text style={{ fontSize: 16, fontWeight: "500", lineHeight: 22 }}>
          Thank you for your interest in joining our platform. We appreciate
          your enthusiasm; however, our ride-sharing service is exclusively
          designed for female drivers and passengers to ensure a safe and
          comfortable environment for women.
        </Text>
        <Text style={{ fontSize: 14, fontWeight: "500", lineHeight: 22 }}>
          We kindly inform you that at this time, we are only accepting female
          candidates. Thank you for your understanding and support.
        </Text>
        <CustomBtn
          title="Okay"
          onPress={toggelMaleGenderIdentify}
          width="100%"
          btnBg="#EA4C89"
          btnColor={"#fff"}
        />
      </View>
    </ModalUI>
  );
};

export default MaleGenderIdentifyModal;

const styles = StyleSheet.create({});
