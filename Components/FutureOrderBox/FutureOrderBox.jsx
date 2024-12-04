import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { COLORS } from "../../Constants/colors";

const { height } = Dimensions.get("window");

export default function FutureOrderBox() {
  const { previousOrders } = useSelector((state) => state.previewOrders);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      {previousOrders?.length > 0 && (
        <>
          <View style={[styles.boxContainer]}>
            {previousOrders.length > 1 && (
              <TouchableOpacity
                style={styles.popCircle}
                onPress={() => setModalVisible(true)}
              >
                <Text>+ {previousOrders.length - 1} More ^</Text>
              </TouchableOpacity>
            )}

            <SingleCard prevOrder={previousOrders[0]} />
          </View>

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
                  data={previousOrders}
                  keyExtractor={(item) => item._id.toString()}
                  renderItem={({ item }) => <SingleCard prevOrder={item} />}
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
      )}
    </>
  );
}

const SingleCard = ({ prevOrder }) => {
  return (
    <View style={styles.box}>
      <View style={styles.imageCard}>
        <Image
          style={{ width: "90%", height: 40, objectFit: "contain" }}
          source={require("../../assets/images/car.png")}
        />
      </View>
      <View style={styles.pickDropLocaCard}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 15,
            fontWeight: "600",
            color: COLORS.heading,
          }}
        >
          {prevOrder.pickupAddress}
        </Text>
        <Text
          numberOfLines={1}
          style={{ fontSize: 12, color: COLORS.subHeading }}
        >
          {prevOrder.dropAddress}
        </Text>
      </View>
      <View style={styles.dataShow}>
        <Text>{prevOrder.time?.split("T")?.[0]}</Text>
        <Text>{prevOrder.time?.split("T")?.[1]}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    // marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "transparent",
    // padding: 10,
  },

  box: {
    height: 80,
    backgroundColor: COLORS.cardBackground,
    width: "97%",
    left: "6%",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "space-between",
    elevation: 3,
    flexDirection: "row",
    gap: 5,
    shadowColor: "red",
    alignItems: "center",
  },

  imageCard: {
    width: 60,
    height: "100%",
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    elevation: 1,
    shadowColor: "red",
    backgroundColor: "#fff",
  },
  pickDropLocaCard: {
    width: "50%",
    // backgroundColor: "blue",
  },
  dataShow: {
    width: 80,
    // backgroundColor: "yellow",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  popCircle: {
    backgroundColor: COLORS.cardBackground,

    borderRadius: 20,
    padding: 5,
    alignSelf: "center",
    marginBottom: 5,
    position: "absolute",
    zIndex: 1,
    top: -14,
    elevation: 5,
    shadowColor: "red",
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
