import { StyleSheet, Text, View } from "react-native";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { COLORS } from "../../../../../../../Constants/colors";

const RideBillCard = () => {
  return (
    <View style={styles.container}>
      <Text>Bill Details</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#EA4C89",
          borderStyle: "dashed",
          paddingVertical: 2,
        }}
      >
        <Text
          style={{ fontSize: 15, fontWeight: "600", color: COLORS.heading }}
        >
          Total Fare Price
        </Text>
        <Text style={{ color: "#EA4C89", fontSize: 15, fontWeight: "600" }}>
          ₹50
        </Text>
      </View>
      <SinglePrice title="Ride Charge" price="₹78" />
      <SinglePrice title="Booking Free & Conveniences Charges" price="₹78" />
      <SinglePrice title="Discount" price="₹78" />
      <SendMailCard />
    </View>
  );
};

export default RideBillCard;

const SinglePrice = ({ title, price }) => {
  return (
    <View style={styles.singleContainer}>
      <Text
        style={{
          fontSize: 13,
          fontWeight: "600",
          width: "90%",
          //   backgroundColor: "red",
        }}
      >
        {title}
      </Text>
      <Text style={{ fontSize: 12, color: COLORS.subHeading }}>{price}</Text>
    </View>
  );
};

const SendMailCard = () => {
  return (
    <View style={styles.sendMailCard}>
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        <Feather
          name="mail"
          size={20}
          color="#6277e3"
          style={{ marginTop: 2 }}
        />
        <Text style={{ color: "#6277e3", fontSize: 14, fontWeight: "600" }}>
          Send Via Email
        </Text>
      </View>
      <FontAwesome6
        name="share-from-square"
        size={17}
        color={COLORS.subHeading}
        style={{ marginTop: 3 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 10,
  },
  singleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sendMailCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: COLORS.borderColor,
    paddingVertical: 5,
  },
});
