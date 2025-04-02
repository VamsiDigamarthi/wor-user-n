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
import { COLORS } from "../../../../../../Constants/colors";
import { fonts } from "../../../../fonts/Fonts";
import Entypo from "@expo/vector-icons/Entypo";

const { height } = Dimensions.get("window");

export default function FutureOrderBox() {
  const { previousOrders } = useSelector((state) => state.previewOrders);

  const [modalVisible, setModalVisible] = useState(false);

  // Return null if there are no previous orders
  if (!previousOrders || previousOrders.length === 0) return null;

  return (
    <View style={styles.container}>
      {/* Single Card */}
      <SingleCard prevOrder={previousOrders[0]} />

      {/* Pop Circle Button */}
      {previousOrders.length > 1 && (
        <TouchableOpacity
          style={styles.popCircle}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.popCircleText}>
            {/* + {previousOrders.length - 1} More ^ */}
            <Entypo name="chevron-up" size={24} color="#FFF" />
          </Text>
        </TouchableOpacity>
      )}

      {/* Modal for Showing All Orders */}
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
    </View>
  );
}

const SingleCard = ({ prevOrder }) => {
  return (
    <View style={styles.box}>
      <View style={styles.imageCard}>
        <Image
          style={{ width: "90%", height: 40, objectFit: "contain" }}
          source={require("../../../../../../assets/images/HomeServiceImages/cab.png")}
        />
      </View>
      <View style={styles.pickDropLocaCard}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 15,
            fontFamily: "robotoSemiBold",
            color: COLORS.heading,
          }}
        >
          {prevOrder.pickupAddress}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 12,
            color: COLORS.subHeading,
            fontFamily: "robotoRegular",
          }}
        >
          {prevOrder.dropAddress}
        </Text>
      </View>
      <View style={styles.dataShow}>
        <Text style={{ fontFamily: "robotoRegular" }}>
          {prevOrder.time?.split("T")?.[0]}
        </Text>
        <Text style={{ fontFamily: "robotoRegular" }}>
          {prevOrder.time?.split("T")?.[1]}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1,
  },
  box: {
    height: 80,
    backgroundColor: COLORS.cardBackground,
    width: "94%",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "space-between",
    elevation: 1,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  imageCard: {
    width: 60,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#fff",
  },
  pickDropLocaCard: {
    width: "50%",
  },
  dataShow: {
    width: 80,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  popCircle: {
    // backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    padding: 8,
    position: "absolute",
    zIndex: 2,
    bottom: 80, // Adjust based on the card's height
    alignSelf: "center",
    backgroundColor: "#E02E88",
  },
  popCircleText: {
    fontSize: 16,
    fontFamily: "robotoRegular",
    textAlign: "center",
    color: "#fff",
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
    backgroundColor: "#EA4C89",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#FFF",
  },
});
