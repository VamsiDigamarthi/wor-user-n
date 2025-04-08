import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ModalUI from "../../../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../../../Components/InfoUi/Styles/InfoModalStyles";
import SafetyPreviewModal from "./SafetyPreviewModal";
import LiveLocation from "../BottosheetScreens/LiveLocation";
import SpamCallSheet from "../BottosheetScreens/SpamCallSheet";
import PoliceStatons from "../BottosheetScreens/PoliceStatons";
import WormenHelpLineModal from "./WormenHelpLineModal";

const SafetyToolModals = ({ toggle, setToggle }) => {
  const [displayModal, setDisplayModal] = useState("main");

  return (
    <ModalUI
      openCloseState={toggle}
      closeModalFun={setToggle}
      style={infoModalStyles.aadharModalStyles}
      insideCardStyle={infoModalStyles.insideCardStyle}
      closebtn={false}
    >
      <View style={styles.container}>
        {displayModal === "main" && (
          <SafetyPreviewModal setDisplayModal={setDisplayModal} />
        )}
        {displayModal === "Trusted Contacts" && (
          <LiveLocation onPress={() => setDisplayModal("main")} />
        )}
        {displayModal === "Alert Call" && (
          <SpamCallSheet onPress={() => setDisplayModal("main")} />
        )}
        {displayModal === "Nearby Police station" && (
          <PoliceStatons onPress={() => setDisplayModal("main")} />
        )}
        {displayModal === "Women’s Helpline" && (
          <WormenHelpLineModal onPress={() => setDisplayModal("main")} />
        )}
      </View>
    </ModalUI>
  );
};

export default SafetyToolModals;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 5,
    gap: 15,
  },
});
