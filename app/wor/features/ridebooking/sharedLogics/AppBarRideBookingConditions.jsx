import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import WaitingCard from "./WaitingCard";

const AppBarRideBookingConditions = ({ isArrived, otpVerified, rideTide }) => {
  return (
    <View
      style={{
        width: 50,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
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
            <>
              <Ionicons size={24} name="timer" color="#f98600" />
              {/* <WaitingCard /> */}
            </>
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
