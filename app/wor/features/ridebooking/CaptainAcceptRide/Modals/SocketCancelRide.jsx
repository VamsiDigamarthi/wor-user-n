import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";

const SocketCancelRide = ({ cancelOrderByUseSt, setCancelOrderByUseSt }) => {
  const navigation = useNavigation();

  const handleOpenCloseCancelModal = () => {
    setCancelOrderByUseSt(false);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "AuthenticatedStack" }],
      })
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={cancelOrderByUseSt ?? false}
      onRequestClose={handleOpenCloseCancelModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <Text style={styles.sorryText}>We're sorry, </Text>
          <Text style={styles.but}>
            but the user has canceled the ride. Thank you for your understanding
            and patience. Please stay ready for the next ride request.
          </Text>
          <Text style={styles.have}>Have a great day!</Text>
          <Pressable style={styles.okBtn} onPress={handleOpenCloseCancelModal}>
            <Text style={styles.okay}>Okay,</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default SocketCancelRide;

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
  but: {
    fontSize: 12,
    // fontWeight: "500",
    textAlign: "center",
    color: "gray",
  },
  have: {
    fontSize: 16,
    textAlign: "center",
  },
  okBtn: {
    width: "100%",
    height: 44,
    backgroundColor: "#e02e88",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  okay: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
