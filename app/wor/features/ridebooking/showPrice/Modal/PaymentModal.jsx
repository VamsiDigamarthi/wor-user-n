import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import ModalUI from "../../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../../Components/InfoUi/Styles/InfoModalStyles";

import { fonts } from "../../../../fonts/Fonts";
import PaymentModalNew from "../../../../../wor/features/DrawerScreens/Wallet/Modal/PaymentModal";

export default function PaymentModal({ onClose }) {
  return (
    <ModalUI
      // openCloseState={shceduleOrderModal}
      closeModalFun={onClose}
      style={infoModalStyles.aadharModalStyles}
      insideCardStyle={infoModalStyles.insideCardStyle}
      closebtn={false}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Payment Methods</Text>

        <PaymentModalNew />
      </View>
    </ModalUI>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: fonts.robotoSemiBold,
    fontSize: 15,
    paddingVertical: 10,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: "#757575",
  },
  container: {
    paddingHorizontal: 10,
  },
});
