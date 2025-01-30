import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ModalUI from "../../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../../Components/InfoUi/Styles/InfoModalStyles";
import LeaseTell from "./LeaseTell";
import AreYouSureModal from "./AreYouSureModal";
import ConfirmDelete from "./ConfirmDelete";

const DeleteModal = ({ deletAcoountModal, handleDeleteAcoountModal }) => {
  const [displayModalType, setDisplayModalType] = useState("lease");
  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelect = (id) => {
    setSelectedValue(id);
  };

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
        {displayModalType === "lease" ? (
          <LeaseTell
            selectedValue={selectedValue}
            handleSelect={handleSelect}
            setDisplayModalType={setDisplayModalType}
            handleDeleteAcoountModal={handleDeleteAcoountModal}
          />
        ) : (
          <>
            {displayModalType === "areYourSure" ? (
              <AreYouSureModal
                setDisplayModalType={setDisplayModalType}
                handleDeleteAcoountModal={handleDeleteAcoountModal}
              />
            ) : (
              <ConfirmDelete
                selectedValue={selectedValue}
                handleDeleteAcoountModal={handleDeleteAcoountModal}
                setDisplayModalType={setDisplayModalType}
              />
            )}
          </>
        )}
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
