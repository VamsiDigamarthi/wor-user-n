import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalUI from "../../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../../Components/InfoUi/Styles/InfoModalStyles";

const ChangeDestinationModal = ({
  openDestinationModal,
  closeDestinationModal,
}) => {
  return (
    <ModalUI
      openCloseState={openDestinationModal}
      closeModalFun={closeDestinationModal}
      style={infoModalStyles.aadharModalStyles}
      insideCardStyle={infoModalStyles.insideCardStyle}
      closebtn={false}
    >
      <Text>ChangeDestinationModal</Text>
    </ModalUI>
  );
};

export default ChangeDestinationModal;

const styles = StyleSheet.create({});
