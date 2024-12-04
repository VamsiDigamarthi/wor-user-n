import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const ModalUI = ({
  openCloseState,
  closeModalFun,
  rightBtnText,
  rightBtnFun,
  children,
  modalStyle = "fade",
  style,
  insideCardStyle,
  btnStyles,
  btnText = "Close",
  btnTextStyle,
  closebtn = true,
}) => {
  return (
    <Modal
      animationType={modalStyle}
      transparent={true}
      visible={openCloseState}
      onRequestClose={closeModalFun}
    >
      <View style={[styles.modalContainer, style]}>
        <View style={[styles.modalContent, insideCardStyle]}>
          {children}
          {closebtn && (
            <View
              style={[
                styles.cancelBtnCard,
                btnStyles && { paddingHorizontal: 20 },
              ]}
            >
              <Pressable
                onPress={closeModalFun}
                style={[styles.closeModalBtn, btnStyles]}
              >
                <Text style={[styles.closeText, btnTextStyle]}>{btnText}</Text>
              </Pressable>
              {rightBtnText && (
                <Pressable onPress={rightBtnFun} style={styles.closeModalBtn}>
                  <Text style={styles.closeText}>{rightBtnText}</Text>
                </Pressable>
              )}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalUI;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    // height: "fit",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    gap: 10,
  },
  modalContent: {
    width: "85%",
    padding: 20,
    // height: 250,
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    // gap: 5,
  },
  cancelBtnCard: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 0,
    width: "100%",
    // marginTop: 10,
  },
  closeModalBtn: {
    backgroundColor: "lightgray",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
