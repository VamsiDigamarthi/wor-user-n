import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import ModalUI from "../../../../utiles/Modal/Modal";

const StartRides = ({ setDisplayStartModal, isDispalyStartModal }) => {
  return (
    // <Modal onRequestClose={setDisplayStartModal} animationType="slide">
    //   <View style={[styles.modalContainer]}>
    //     <View style={[styles.modalContent]}>
    //       <Pressable style={styles.cross} onPress={setDisplayStartModal}>
    //         <Entypo size={40} name="circle-with-cross" color="#fff" />
    //       </Pressable>
    //       <Image
    //         source={require("../../../../../../assets/Ride Starts from.png")}
    //         style={{ width: "100%", height: 500, resizeMode: "contain" }}
    //       />
    //     </View>
    //   </View>
    // </Modal>
    <ModalUI
      openCloseState={isDispalyStartModal}
      closeModalFun={setDisplayStartModal}
      modalStyle="slide"
      // style={infoModalStyles.aadharModalStyles}
      // insideCardStyle={[infoModalStyles.insideCardStyle]}
      closebtn={false}
      bgColor="transparent"
    >
      <View style={[styles.modalContent]}>
        <Pressable style={styles.cross} onPress={setDisplayStartModal}>
          <Entypo size={40} name="circle-with-cross" color="#fff" />
        </Pressable>
        <Image
          source={require("../../../../../../assets/Ride Starts from.png")}
          style={{ width: "100%", height: 500, resizeMode: "contain" }}
        />
      </View>
    </ModalUI>
  );
};

export default StartRides;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(0, 0, 0, 0.5)", // Background overlay
    // backgroundColor: "red",
  },
  modalContent: {
    width: "100%",
    padding: 10,
    // backgroundColor: "white",
    borderRadius: 10,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    // gap: 5,
    position: "relative",
  },
  cross: {
    position: "absolute",
    top: 55,
    right: -15,
    zIndex: 99,
  },
});
