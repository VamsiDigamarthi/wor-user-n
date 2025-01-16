import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ProfileNavigationCard = ({ title, navigateTo }) => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate(navigateTo)}>
      <View style={styles.container}>
        <View style={styles.leftCard}>
          <Entypo name="book" size={24} color="black" />
          <Text style={styles.text}>{title}</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={25} color="#e02e88" />
      </View>
    </Pressable>
  );
};

export default ProfileNavigationCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    // borderWidth: 1,
    // borderColor: "#ffe2e6",
    // paddingHorizontal: 15,
    // paddingVertical: 12,
    // borderRadius: 10,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
  },

  leftCard: {
    flexDirection: "row",
    gap: 10,
  },
});
