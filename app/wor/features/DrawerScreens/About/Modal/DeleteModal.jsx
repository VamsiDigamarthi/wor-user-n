import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalUI from "../../../../utiles/Modal/Modal";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { infoModalStyles } from "../../../../../../Components/InfoUi/Styles/InfoModalStyles";
import LeaseTell from "./LeaseTell";

const DeleteModal = ({ deletAcoountModal, handleDeleteAcoountModal }) => {
  const { token } = useSelector((state) => state.token);
  const navigation = useNavigation();

  return (
    <ModalUI
      openCloseState={deletAcoountModal}
      closeModalFun={handleDeleteAcoountModal}
      style={infoModalStyles.aadharModalStyles}
      insideCardStyle={infoModalStyles.insideCardStyle}
      // rightBtnFun={handleDeleteAccount}
      closebtn={false}
    >
      <View style={styles.container}>
        <LeaseTell />
      </View>
    </ModalUI>
  );
};

export default DeleteModal;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    width: "100%",
  },
});
