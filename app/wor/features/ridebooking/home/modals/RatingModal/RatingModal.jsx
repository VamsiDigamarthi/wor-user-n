import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalUI from "../../../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../../../Components/InfoUi/Styles/InfoModalStyles";
import { useRatingModalHook } from "./RatingModalHook";
import RatingCard from "./Components/RatingCard";
import WhatWeSay from "../../../FeedBack/Components/WhatWeSay";
import CustomBtn from "../../../../../utiles/CustomBtn";
import { fonts } from "../../../../../fonts/Fonts";

const RatingModal = ({
  openModal,
  setOpenRatingModal,
  closeModal,
  penRatOrderIdCaptainId,
}) => {
  const { ratingData, setRatingData, handleRatingChange, handleGivenRating } =
    useRatingModalHook({ penRatOrderIdCaptainId, setOpenRatingModal });

  return (
    <ModalUI
      openCloseState={openModal}
      closeModalFun={closeModal}
      style={infoModalStyles.aadharModalStyles}
      insideCardStyle={infoModalStyles.insideCardStyle}
      closebtn={false}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Rate Your Ride</Text>
        <RatingCard
          rating={ratingData?.rating}
          setRatingData={setRatingData}
          handleRatingChange={handleRatingChange}
          penRatOrderIdCaptainId={penRatOrderIdCaptainId}
        />
        <CustomBtn
          title="Submit & Proceed"
          height={60}
          btnBg={ratingData?.rating > 0 ? "#EA4C89" : "#f7f7f7"}
          btnColor={ratingData?.rating > 0 ? "#fff" : "#000"}
          onPress={handleGivenRating}
        />
        <Text style={styles.tankText}>Thanks for choosing Women Rider</Text>
      </View>
    </ModalUI>
  );
};

export default RatingModal;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 14,
    // padding: 20,
    paddingBottom: 20,
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.robotoSemiBold,
  },
  tankText: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: fonts.robotoSemiBold,
    color: "gray",
    marginVertical: 5,
  },
});
