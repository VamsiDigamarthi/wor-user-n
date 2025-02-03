import { View, Text, StyleSheet } from "react-native";
import React, { Children, useState } from "react";
import MainSelectingScreens from "./BottosheetScreens/MainSelectingScreens";
import LiveLocation from "./BottosheetScreens/LiveLocation";
import SpamCallSheet from "./BottosheetScreens/SpamCallSheet";
import PoliceStatons from "./BottosheetScreens/PoliceStatons";
import ChatWithCaptain from "./BottosheetScreens//components/ChatUi/ChatWithCaptain";
import ModalUI from "../../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../../Components/InfoUi/Styles/InfoModalStyles";
// import OtpInfoUi from "../InfoUi/OtpInfoUi";

export default function MapModalUi({ toggle, setToggle, Children }) {
  const onHandleOpenInfoModal = () => {
    setToggle(!toggle);
    setScreen("main");
  };

  const [screen, setScreen] = useState("main");
  const changeScreen = (screen) => {
    setScreen(screen);
  };

  return (
    <ModalUI
      openCloseState={toggle}
      closeModalFun={onHandleOpenInfoModal}
      modalStyle="slide"
      style={infoModalStyles.aadharModalStyles}
      insideCardStyle={[infoModalStyles.insideCardStyle, { padding: 10 }]}
      btnText="Close"
      btnStyles={[
        infoModalStyles.modalCloseBtn,
        { backgroundColor: "#e02e88" },
      ]}
      btnTextStyle={[
        infoModalStyles.btnTextStyle,
        { color: "#fff", fontWeight: "bold" },
      ]}
    >
      {screen === "main" && <MainSelectingScreens onPress={changeScreen} />}
      {screen === "liveloc" && <LiveLocation onPress={changeScreen} />}
      {screen === "spam" && <SpamCallSheet onPress={changeScreen} />}
      {screen === "police" && <PoliceStatons onPress={changeScreen} />}
      {screen === "chat" && <ChatWithCaptain onPress={changeScreen} />}
    </ModalUI>
  );
}

const styles = StyleSheet.create({});
