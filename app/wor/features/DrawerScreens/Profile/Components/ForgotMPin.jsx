import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import MPinMobileNumberModal from "../Modal/MPinModal/MPinMobileNumberModal";

const ForgotMPin = ({ handleChangeSetMpin }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <View style={styles.newContainer}>
        <View style={{ gap: 15 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Set new M-Pin</Text>
          <Text style={{ fontSize: 13, color: "gray", lineHeight: 21 }}>
            You'r PIN Con't have repeating (e.g.0000), or consective(e.g.1234)
            numbers
          </Text>
          <Pressable onPress={() => setOpenModal(true)}>
            <Text style={{ color: "#2066be" }}>Forgot M-Pin</Text>
          </Pressable>
        </View>
      </View>
      <MPinMobileNumberModal
        handleChangeSetMpin={handleChangeSetMpin}
        openModal={openModal}
        closeModal={setOpenModal}
      />
    </>
  );
};

export default ForgotMPin;

const styles = StyleSheet.create({
  newContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 30,
    backgroundColor: "#fff",
  },
});
