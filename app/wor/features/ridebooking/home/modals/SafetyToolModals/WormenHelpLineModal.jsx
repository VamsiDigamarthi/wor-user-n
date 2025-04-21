import {
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const WormenHelpLineModal = ({ onPress }) => {
  const handleSoSCaller = (number) => {
    const url = `tel:${number}`;
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
    <View style={styles.container}>
      <View style={{ justifyContent: "center", paddingVertical: 5 }}>
        <TouchableOpacity
          onPress={() => onPress("main")}
          style={styles.backButton}
        >
          <FontAwesome name="chevron-left" size={15} color="#e02e88" />
          <Text>Back</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.mainHeading}>Women Helpline</Text>

      <Card
        text="Women Helpline"
        number={"181"}
        onPress={() => handleSoSCaller("181")}
      />
      <Card
        text="Women Protection Cell"
        number={"+91 90596 93448"}
        onPress={() => handleSoSCaller("9059693448")}
      />
      <Card
        text="Bharosa Hyderabad"
        number={"040 2785 2355"}
        onPress={() => handleSoSCaller("040 2785 2355")}
      />
      <Card
        text="Women Safety Wing Headquarters"
        number={"+91 87126 56858"}
        onPress={() => handleSoSCaller("8712656858")}
      />
    </View>
  );
};

export default WormenHelpLineModal;

const Card = ({ text, number, onPress }) => (
  <Pressable onPress={onPress} style={styles.innerCard}>
    <View>
      <Text style={styles.heading}>{text}</Text>
      <Text style={styles.subText}>{number}</Text>
    </View>

    <Ionicons size={22} color="#EA4C89" name="call" />
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 15,
  },
  innerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f2f2f2", // lighter gray
    padding: 14,
    borderRadius: 12,
    elevation: 2, // for subtle shadow on Android
    shadowColor: "#000", // for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    letterSpacing: 0.5,
  },
  subText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  mainHeading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#EA4C89",
    marginBottom: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

{
  /* <Text style={styles.text}>{text}</Text>
    <Pressable onPress={onPress}>
      <Ionicons size={20} color="#e02e88" name="call" />
    </Pressable> */
}
