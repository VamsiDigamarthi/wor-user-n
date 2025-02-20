import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import EmergencyContactModal from "../Modals/EmergencyContactModal";
import { fonts } from "../../../../fonts/Fonts";

const TrackMe = ({ trackMeTranslateY }) => {
  const [openContactModal, setOpenContactModal] = useState(false);

  const handleContactModal = () => {
    setOpenContactModal(!openContactModal);
  };

  return (
    <>
      <Animated.View
        style={[
          styles.trackMeContainer,
          { transform: [{ translateY: trackMeTranslateY }] }, // Animated position
        ]}
      >
        <Pressable style={styles.rowCard} onPress={handleContactModal}>
          <Entypo size={20} name="share" color="#fff" />
          <Text style={styles.trackMeText}>Track Me</Text>
        </Pressable>
      </Animated.View>
      <EmergencyContactModal
        openModal={openContactModal}
        closeModal={handleContactModal}
      />
    </>
  );
};

export default TrackMe;

const styles = StyleSheet.create({
  trackMeContainer: {
    position: "absolute",
    bottom: 20,
    // right: 20,

    padding: 10,
    borderRadius: 20,
    zIndex: 999999,
    // backgroundColor: "red",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  trackMeText: {
    color: "#000",
    fontSize: 16,
    fontFamily: fonts.robotoBold,
    color: "#fff",
  },
  rowCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#EA4C89",
  },
});
