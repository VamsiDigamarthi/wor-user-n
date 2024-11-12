import { Image, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ProfileCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageCard}>
        <Image
          style={styles.image}
          source={require("../../../../assets/images/profile/Services.png")}
        />
        <View style={styles.editCard}>
          <FontAwesome name="edit" size={25} color="#e02e88" />
        </View>
      </View>
      <Text style={styles.textCard}>Dharani</Text>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 5,
  },
  imageCard: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderColor: "#ffe2e8",
    borderWidth: 2,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    resizeMode: "cover",
  },
  editCard: {
    position: "absolute",
    right: -1,
    bottom: 0,
  },
  textCard: {
    fontSize: 16,
    fontWeight: "600",
  },
});
