import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { useSelector } from "react-redux";
import {
  middleDropAccept,
  middleDropRejection,
} from "../Services/middleDrop.serv";

const MiddleDropModal = ({ setMiddleDrop, middleDrop }) => {
  const navigation = useNavigation();

  const { token } = useSelector((state) => state.token);

  const { completeRideDetails } = useSelector((state) => state.allRideDetails);

  const handleOpenCloseCancelModal = async () => {
    const data = await middleDropAccept({
      orderId: completeRideDetails?._id,
      token,
    });

    if (data) {
      setMiddleDrop(false);
      console.log("data", data);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "AuthenticatedStack" }],
        })
      );
    }
  };

  const handleRejectMiddleDrop = async () => {
    const data = await middleDropRejection({
      orderId: completeRideDetails?._id,
      token,
    });
    if (data) {
      setMiddleDrop(false);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={middleDrop ?? false}
      onRequestClose={handleOpenCloseCancelModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <Text style={styles.heading}>Confirm Midway Drop-Off</Text>
          <Text style={styles.subHeading}>
            Are you sure you want to end the ride at this location?
          </Text>
          <View style={styles.rowCard}>
            <Pressable
              style={[styles.okBtn, styles.confirmButton]}
              onPress={handleOpenCloseCancelModal}
            >
              <Text style={styles.okay}>Okay</Text>
            </Pressable>
            <Pressable
              style={[styles.okBtn, styles.cancelBtn]}
              onPress={handleRejectMiddleDrop}
            >
              <Text style={styles.cancel}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MiddleDropModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Background overlay
    padding: 30,
  },
  container: {
    padding: 20,
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 10,
    gap: 10,
  },
  sorryText: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    color: "#e02e88",
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#e02e88",
  },
  subHeading: { fontSize: 12, fontWeight: "600", textAlign: "center" },
  rowCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  okBtn: {
    width: "45%",
    height: 44,

    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "#e02e88",
    text: "#fff",
  },
  cancelBtn: {
    backgroundColor: "#f7f7f7",
  },
  okay: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  cancel: {
    color: "#e02e88",
    fontSize: 15,
    fontWeight: "600",
  },
});
