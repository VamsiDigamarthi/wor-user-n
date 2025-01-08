import { StyleSheet, Text, View } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../Constants/colors";
import RideHistoryCaptainProfileCard from "./RideHistoryCaptainProfileCard";

const RideHistoryDetailsViewFirst = ({ ride }) => {
  let color;
  switch (ride?.status) {
    case "cancelled":
      color = "red";
      break;
    case "completed":
      color = "#1dad07";
      break;
    default:
      color = "red";
  }
  return (
    <View style={styles.container}>
      <View style={styles.rowWithGap}>
        <Text style={{ color: COLORS.heading, fontSize: 14 }}>
          Ride Details
        </Text>
        <Text style={[styles.completedText, { color: color }]}>
          {ride?.status}
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <Text style={{ color: COLORS.heading, fontSize: 12 }}>
          Journey On :
        </Text>
        <Text style={{ color: COLORS.subHeading, fontSize: 12 }}>
          {ride?.orderPlaceDate}, {ride?.orderPlaceTime}
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <Text style={{ color: COLORS.heading, fontSize: 12 }}>Ride ID :</Text>
        <Text style={{ color: COLORS.subHeading, fontSize: 12 }}>
          {ride?._id}
        </Text>
      </View>
      <View style={styles.innerParentCard}>
        <SingleLocationCard
          mainLocation={ride.pickupAddress}
          subLocation={ride.pickupVicinity ?? "No Location "}
          iconType="Ionicons"
          iconName="location"
          iconColor="#54db1f"
          time={ride?.orderPlaceTime}
        />
        <SingleLocationCard
          mainLocation={ride.dropAddress}
          subLocation={ride.dropVicinity ?? "No Location "}
          iconType="FontAwesome"
          iconName="location-arrow"
          iconColor="#e02e88"
        />
      </View>
      <View style={{ height: 3 }} />
      <RideTimeKmPriceCard ride={ride} />
      <View style={{ height: 3 }} />
      {!ride?.status === "cancelled" && <RideHistoryCaptainProfileCard />}
    </View>
  );
};

export default RideHistoryDetailsViewFirst;

const SingleLocationCard = ({
  mainLocation,
  subLocation,
  time,
  iconType,
  iconName,
  iconColor,
}) => {
  let Icon;
  switch (iconType) {
    case "Ionicons":
      Icon = Ionicons;
      break;
    case "FontAwesome":
      Icon = FontAwesome;
      break;
    default:
      Icon = Ionicons;
      break;
  }

  return (
    <View style={styles.innerCard}>
      <View style={{ flexDirection: "row", gap: 2 }}>
        <View style={{ width: 55, marginTop: 5 }}>
          <Text style={{ fontSize: 8 }}>{time ?? "02:42:12 PM"}</Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <Icon size={25} name={iconName} color={iconColor} />
      </View>
      <View style={{ width: "65%" }}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.headingText}>
          {mainLocation}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.subHeadingText}
        >
          {subLocation}
        </Text>
      </View>
    </View>
  );
};

const RideTimeKmPriceCard = ({ ride }) => {
  return (
    <View style={styles.pricContainer}>
      <View
        style={{
          gap: 1,
          width: "33%",
          alignItems: "center",
        }}
      >
        <Text
          style={{ fontSize: 12, fontWeight: "600", color: COLORS.heading }}
        >
          2.8 KM
        </Text>
        <Text style={{ fontSize: 9 }}>Total Ride Distance</Text>
      </View>
      <View
        style={{
          gap: 1,
          width: "33%",
          alignItems: "center",
        }}
      >
        <Text
          style={{ fontSize: 12, fontWeight: "600", color: COLORS.heading }}
        >
          32 Min
        </Text>
        <Text style={{ fontSize: 9 }}>Total Ride Time</Text>
      </View>
      <View
        style={{
          gap: 1,
          width: "33%",
          alignItems: "center",
        }}
      >
        <Text
          style={{ fontSize: 12, fontWeight: "600", color: COLORS.heading }}
        >
          ₹{ride?.price}
        </Text>
        <Text style={{ fontSize: 9 }}>Total Fair Price</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    elevation: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
  },
  completedText: {
    fontSize: 11,
    color: "red",
  },
  rowWithGap: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  innerParentCard: {
    elevation: 2,
    borderRadius: 10,
    marginVertical: 3,
    padding: 5,
    backgroundColor: "#fff",
  },
  innerCard: {
    backgroundColor: "#fff",

    flexDirection: "row",
    alignItems: "flex-start",
    gap: 5,
    padding: 5,
  },
  iconContainer: {
    width: 30,
  },
  headingText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.heading,
  },
  subHeadingText: {
    fontSize: 11,
    color: COLORS.subHeading,
  },
  pricContainer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});
