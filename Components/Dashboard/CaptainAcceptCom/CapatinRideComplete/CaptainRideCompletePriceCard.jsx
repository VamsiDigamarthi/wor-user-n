import { StyleSheet, Text, View } from "react-native";
import { FontAwesome6, FontAwesome5 } from "@expo/vector-icons";

const CaptainRideCompletePriceCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ride Details</Text>
      <SingleCard
        title="Nuhvin Global Service"
        iconName="location-dot"
        iconColor="#31ff68"
      />
      <SingleCard
        title="Nuhvin Global Service"
        iconName="location-arrow"
        iconColor="#e02e88"
      />
      <View style={styles.timeKmCard}>
        <View style={{ alignItems: "center", gap: 2 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>2.8 KM</Text>
          <Text style={styles.subTetx}>Total Ride Distance</Text>
        </View>
        <View style={{ width: 1, height: 40, backgroundColor: "#808080" }} />
        <View style={{ alignItems: "center", gap: 2 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>32 Mns</Text>
          <Text style={styles.subTetx}>Total Ride Time</Text>
        </View>
      </View>
    </View>
  );
};

export default CaptainRideCompletePriceCard;

const SingleCard = ({ title, iconName, iconColor }) => {
  let Icon;
  switch (iconName) {
    case "location-dot":
      Icon = FontAwesome6;
      break;
    case "location-arrow":
      Icon = FontAwesome5;
      break;

    default:
      Icon = FontAwesome6;
  }
  return (
    <View style={styles.innerCard}>
      <Icon name={iconName} color={iconColor} size={25} />
      <Text numberOfLines={1}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // padding: 20,
    borderWidth: 1,
    borderColor: "#ffe2e6",
    backgroundColor: "#fff",
    borderRadius: 10,
    gap: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: "600",
    padding: 5,
    paddingLeft: 10,
    paddingTop: 10,
  },
  innerCard: {
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ffe2e6",
    flexDirection: "row",
    // justifyContent: "space-between",
    gap: 20,
    alignItems: "center",
  },
  timeKmCard: {
    width: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subTetx: {
    fontSize: 10,
  },
});
