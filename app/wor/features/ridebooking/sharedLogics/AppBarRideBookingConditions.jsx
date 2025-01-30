import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import WaitingCard from "./WaitingCard";
// import WaitingCard from "./WaitingCard";

const AppBarRideBookingConditions = ({ isArrived, otpVerified, rideTide }) => {
  return (
    <View
      style={{
        width: 50,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        // backgroundColor: "yellow",
      }}
    >
      {otpVerified ? (
        <>
          <Text style={{ fontSize: 14, fontWeight: "600" }}>
            {rideTide?.durationInMinutes}
          </Text>
          <Text style={{ fontSize: 11, fontWeight: "600" }}>Mins</Text>
        </>
      ) : (
        <>
          {isArrived ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "red",
                marginTop: 6,
              }}
            >
              <Ionicons size={24} name="timer" color="#f98600" />
              <WaitingCard />
            </View>
          ) : (
            <>
              <Text style={{ fontSize: 11, fontWeight: "600" }}>ETA</Text>
              <Text style={{ fontSize: 14, fontWeight: "600" }}>
                {rideTide?.durationInMinutes}
              </Text>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default AppBarRideBookingConditions;

const styles = StyleSheet.create({});
