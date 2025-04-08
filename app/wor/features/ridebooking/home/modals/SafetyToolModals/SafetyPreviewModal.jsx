import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

import { fonts } from "../../../../../fonts/Fonts";

import SOSImage from "../../../../../../../assets/safetyImage/sos.png";
import WorSupport from "../../../../../../../assets/safetyImage/support.png";

import alertCall from "../../../../../../../assets/safetyImage/call.png";

import tructedContact from "../../../../../../../assets/safetyImage/trustedContact.png";

import worHepLine from "../../../../../../../assets/safetyImage/wor-help-line.png";

import nearPoliceStation from "../../../../../../../assets/safetyImage/police.png";
import { useNavigation } from "@react-navigation/native";

const SafetyPreviewModal = ({ setDisplayModal }) => {
  const navigation = useNavigation();

  const handleSoSCaller = () => {
    const url = `tel:${100}`;
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

  return (
    <>
      <Text style={{ fontSize: 18, fontWeight: fonts.robotoBold }}>
        Safety Tools
      </Text>
      <View style={styles.rowCard}>
        <Card onPress={handleSoSCaller} text="SOS Helpline" image={SOSImage} />
        <Card
          onPress={() => navigation.navigate("SupportChat")}
          text="WoR Support"
          image={WorSupport}
        />
      </View>
      <View style={styles.rowCard}>
        <Card
          onPress={() => setDisplayModal("Alert Call")}
          text="Alert Call"
          image={alertCall}
        />
        <Card
          onPress={() => setDisplayModal("Trusted Contacts")}
          text="Trusted Contacts"
          image={tructedContact}
        />
      </View>
      <View style={styles.rowCard}>
        <Card
          onPress={() => setDisplayModal("Women’s Helpline")}
          text="Women’s Helpline"
          image={worHepLine}
        />
        <Card
          onPress={() => setDisplayModal("Nearby Police station")}
          text="Nearby Police station"
          image={nearPoliceStation}
        />
      </View>
    </>
  );
};

export default SafetyPreviewModal;

const Card = ({ text, image, onPress }) => (
  <Pressable onPress={onPress} style={styles.mainCard}>
    <View style={styles.card}>
      <Image source={image} style={{ width: 60, height: 60 }} />
    </View>
    <Text style={{ textAlign: "center", fontSize: 12, fontWeight: "600" }}>
      {text}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  rowCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainCard: {
    gap: 5,
    alignItems: "center",
    width: 120,
  },
  card: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#F2F0F5",
    justifyContent: "center",
    alignItems: "center",
  },
});
