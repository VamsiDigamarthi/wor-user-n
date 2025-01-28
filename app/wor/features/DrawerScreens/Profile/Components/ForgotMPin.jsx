import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import MPinMobileNumberModal from "../Modal/MPinModal/MPinMobileNumberModal";
import { fonts } from "../../../../fonts/Fonts";

const ForgotMPin = ({ handleChangeSetMpin }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <View style={styles.newContainer}>
        <View style={{ gap: 15 }}>
          <Text style={{ fontSize: 18, fontFamily: fonts.robotoSemiBold }}>
            Set new M-Pin
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "gray",
              lineHeight: 21,
              fontFamily: fonts.robotoRegular,
            }}
          >
            You'r PIN Can't have repeating (e.g.0000), or consective(e.g.1234)
            numbers
          </Text>
          <Pressable onPress={() => setOpenModal(true)}>
            <Text style={{ color: "#2066be", fontFamily: fonts.robotoRegular }}>
              Forgot M-Pin
            </Text>
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
