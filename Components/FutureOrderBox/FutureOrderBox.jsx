import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Dimensions,
} from "react-native";

const { height } = Dimensions.get("window");

export default function FutureOrderBox() {
  const [futureOrders] = useState([
    { id: 1, name: "FutureOrderBox 1" },
    { id: 2, name: "FutureOrderBox 2" },
    { id: 3, name: "FutureOrderBox 3" },
    { id: 4, name: "FutureOrderBox 4" },
    { id: 5, name: "FutureOrderBox 5" },
    { id: 6, name: "FutureOrderBox 6" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      {/* Main Box for Future Orders */}
      <View
        style={[
          styles.boxContainer,
        ]}
      >
        {/* Single Box Display */}
        

        {/* Show Modal Button */}
        {futureOrders.length > 1 && (
          <TouchableOpacity
            style={styles.popCircle}
            onPress={() => setModalVisible(true)}
          >
            <Text>+ {futureOrders.length - 1} More ^</Text>
          </TouchableOpacity>
        )}

        <View style={styles.box}>
          <Text>{futureOrders[0].name}</Text>
        </View>

      </View>

      {/* Modal for Remaining Orders */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Future Orders</Text>
            <FlatList
              data={futureOrders}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.box}>
                  <Text>{item.name}</Text>
                </View>
              )}
              showsVerticalScrollIndicator={false}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    // marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "transparent",
    // padding: 10,
  },
  
  
  box: {
    height: 80,
    backgroundColor: "red",
    width: "95%",
    left: "2.5%",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "center",
  },
  popCircle: {
    backgroundColor: "yellow",
    borderRadius: 10,
    padding: 10,
    alignSelf: "center",
    marginBottom: 5,
    position:"absolute",
    zIndex:1,
    top:-14
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    height: height * 0.5, // Half the screen height
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "yellow",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButtonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
