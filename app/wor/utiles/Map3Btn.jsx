import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  FontAwesome,
  AntDesign,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
import { Linking } from "react-native";

const openDialer = (phoneNumber) => {
  const url = `tel:${phoneNumber}`;
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Dialer is not supported on this device");
      }
    })
    .catch((err) => console.error("An error occurred", err));
};

const Map3Btns = ({
  handleZoomToggle,
  handleOpenSafetyModal,
  // height,
  mapIconsTop = 400,
}) => {
  return (
    <View style={[styles.mainCont]}>
      <TouchableOpacity
        onPress={handleOpenSafetyModal}
        style={styles.zoomButton}
      >
        <View style={[styles.singleIconsCard, styles.zoomContainer]}>
          <Feather name="shield" size={20} color="#FFF" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleZoomToggle} style={styles.zoomButton}>
        <View style={[styles.singleIconsCard, styles.zoomContainer]}>
          <MaterialIcons name="my-location" size={25} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Map3Btns;

const styles = StyleSheet.create({
  zoomControl: {
    position: "absolute",

    right: 20,
    padding: 15,
    right: 20,
    gap: 10,
  },
  zoomContainer: {
    backgroundColor: "#22222266",
    borderRadius: 50,
  },
  zoomButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  singleIconsCard: {
    width: 45,
    height: 45,
    // elevation: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  mainCont: {
    gap: 10,
    zIndex: 99999,
  },
});
