import { Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CaptainAcceptRideDetails = ({ orderDetails }) => {
  const navigate = useNavigation();

  const onNavigateRideDetails = () => {
    // Navigate to RideDetails screen
    navigate.navigate("captaineacceptrideusershowridedetails", {
      orderDetails,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.firstCard}>
        <Text style={styles.text}>Ride Details</Text>
        <Pressable onPress={onNavigateRideDetails}>
          <View style={styles.dotCard}>
            <Entypo name="dots-three-horizontal" size={25} />
          </View>
        </Pressable>
      </View>
      <Text style={styles.locText}>
        Meet your rider at jayabheri silicon tower main gate kothaguda hyderabd
      </Text>
    </View>
  );
};

export default CaptainAcceptRideDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    width: "100%",
    borderRadius: 10,
    elevation: 1,
    gap: 10,
  },
  firstCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: "600",
  },
  dotCard: {
    width: 50,
    height: 25,
    borderRadius: 30,
    backgroundColor: "#ffe2e6",
    justifyContent: "center",
    alignItems: "center",
  },
  locText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
