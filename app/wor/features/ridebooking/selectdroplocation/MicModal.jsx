import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNewMicHook } from "./Hooks/MicNewHook";
const MicModal = ({
  isMicModalOpenClose,
  setIsMicModalOpenClose,
  setMicVoiceText,
  micVoiceText,
}) => {
  const { handleMicPress, isListening, stopListening } = useNewMicHook({
    setMicVoiceText,
    setIsMicModalOpenClose,
    isMicModalOpenClose,
  });
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isMicModalOpenClose}
      onRequestClose={() => {
        stopListening();
        setIsMicModalOpenClose(false);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={handleMicPress} style={styles.micButton}>
            <View style={styles.micCard}>
              <Icon
                name={isListening ? "mic" : "mic-none"}
                size={24}
                color="red"
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.infoText}>
            {isListening ? micVoiceText : "Tap to speak"}
          </Text>
          <Pressable
            onPress={() => setIsMicModalOpenClose(false)}
            style={styles.closeModalBtn}
          >
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
export default MicModal;
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    gap: 10,
  },
  modalContent: {
    width: "85%",
    padding: 20,
    height: 250,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  micCard: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  micButton: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: {
    fontSize: 16,
    color: "red",
    fontWeight: "600",
  },
});
