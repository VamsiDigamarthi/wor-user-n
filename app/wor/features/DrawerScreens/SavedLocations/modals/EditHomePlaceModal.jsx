import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ModalUI from "../../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../../Components/InfoUi/Styles/InfoModalStyles";
import LocationInput from "../../../ridebooking/selectdroplocation/Components/LocationInput";

const EditHomePlaceModal = ({
  openEditHome,
  handleOpenCloseEditHomeModal,
  editDeleteType,
  place,
}) => {
  console.log("editDeleteType", editDeleteType);
  const [inputValue, setInputValue] = useState(place?.name || "");

  return (
    <ModalUI
      openCloseState={openEditHome}
      closeModalFun={handleOpenCloseEditHomeModal}
      style={infoModalStyles.aadharModalStyles}
      insideCardStyle={infoModalStyles.insideCardStyle}
      closebtn={false}
    >
      <View style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {`Edit ${editDeleteType?.toUpperCase()} Place`}
        </Text>
        <LocationInput
          passParams={true}
          inputValue={inputValue?.length > 0 ? inputValue : ""}
          handleInputChange={handleInputChange}
          setIsMicModalOpenClose={setIsMicModalOpenClose}
        />
      </View>
    </ModalUI>
  );
};

export default EditHomePlaceModal;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: "100%",
  },
});
