import { StyleSheet, Text, View } from "react-native";
import { FontAwesome6, FontAwesome5 } from "@expo/vector-icons";
import { COLORS } from "../../../../Constants/colors";

const CaptainRideCompletePriceCard = ({
  orderDetails,
  travellingTimeAndDistnace,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ride Details</Text>
      <View style={styles.singleComCard}>
        <SingleCard
          title={orderDetails?.pickupAddress ?? "No Pick Up Address"}
          iconName="location-dot"
          iconColor="#31ff68"
        />
        <SingleCard
          title={orderDetails?.dropAddress ?? "No Drop Up Address"}
          iconName="location-arrow"
          iconColor="#e02e88"
        />
      </View>
      <View style={styles.timeKmCard}>
        <View style={{ alignItems: "center", gap: 2 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            {travellingTimeAndDistnace?.distance ?? "2.8 KM"}
          </Text>
          <Text style={styles.subTetx}>Total Ride Distance</Text>
        </View>
        <View style={{ width: 1, height: 40, backgroundColor: "#808080" }} />
        <View style={{ alignItems: "center", gap: 2 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            {`${travellingTimeAndDistnace?.durationInMinutes} Mins` ??
              "32 Mins"}
          </Text>
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
    // borderWidth: 1,
    borderColor: "#ffe2e6",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 1,
    borderColor: "#ffe2e6",
    gap: 10,
    shadowColor: "gray",
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
    // borderWidth: 1,
    borderColor: "#ffe2e6",
    flexDirection: "row",
    // justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
    overflow: "hidden",
    width: "97%",
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
  singleComCard: {
    elevation: 1,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
  },
});
