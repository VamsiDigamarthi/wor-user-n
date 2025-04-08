import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const WormenHelpLineModal = () => {
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
      <Card text="Women's Helpline" onPress={() => handleSoSCaller(100)} />
      <Card text="Police" onPress={() => handleSoSCaller(181)} />
      <Card text="Children's Helpline" onPress={() => handleSoSCaller(1098)} />
    </View>
  );
};

export default WormenHelpLineModal;

const Card = ({ text, onPress }) => (
  <View style={styles.innerCard}>
    <Text style={styles.text}>{text}</Text>
    <Pressable onPress={onPress}>
      <Ionicons size={20} color="#e02e88" name="call" />
    </Pressable>
  </View>
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
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
