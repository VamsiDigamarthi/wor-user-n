import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome, AntDesign, MaterialIcons } from "@expo/vector-icons";
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
    <View style={[styles.mainCont, { top: mapIconsTop }]}>
      {/* <View style={styles.singleIconsCard}>
        <TouchableOpacity
          onPress={() => openDialer("100")}
          style={[
            styles.zoomButton,
            { backgroundColor: "#EC1C24", padding: 5, borderRadius: 5 },
          ]}
        >
          <Text style={{ color: "#fff", fontSize: 14, fontWeight: "600" }}>
            SOS
          </Text>
        </TouchableOpacity>
      </View> */}

      {/* <View style={styles.singleIconsCard}>
        <TouchableOpacity
          onPress={handleOpenSafetyModal}
          style={styles.zoomButton}
        >
          <AntDesign name="Safety" size={20} color="#e02e88" />
        </TouchableOpacity>
      </View> */}

      <View style={[styles.singleIconsCard, styles.zoomContainer]}>
        <TouchableOpacity onPress={handleZoomToggle} style={styles.zoomButton}>
          <MaterialIcons name="my-location" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
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
    position: "absolute",
    top: 250,
    right: 20,
  },
});
