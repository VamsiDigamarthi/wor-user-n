import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "../../../../fonts/Fonts";
import { ScootyImg, AutoImg, CabImg } from "../../../../Images/Universal";

const RideHistoryItem = ({
  status = "debit",
  type = "car",
  isFavoriteOrRideHistory = true,
  amount = "",
  date = "",
}) => {
  const navigation = useNavigation();

  return (
    <Pressable style={styles.mainCont}>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          width: "80%",
        }}
      >
        <Image
          source={type == "car" ? CabImg : type == "auto" ? AutoImg : ScootyImg}
          style={styles.Image}
        />
        <View style={styles.midContainer}>
          <Text
            style={styles.dropAddress}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Kphb Metro
          </Text>
          <Text style={styles.subAddr} numberOfLines={1} ellipsizeMode="tail">
            UPI
          </Text>
          <Text style={styles.time}>{new Date(date).toDateString()}</Text>
        </View>
      </View>

      <View style={styles.rightContainer}>
        <Text
          style={[
            styles.status,
            { color: status == "debit" ? "red" : "#1dad07" },
          ]}
        >
          {amount && status == "debit" ? `- ${amount}` : `+ ${amount}`}
        </Text>
      </View>
    </Pressable>
  );
};

export default RideHistoryItem;

const styles = StyleSheet.create({
  mainCont: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#Ebebeb",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
  },
  Image: {
    height: 50,
    width: 50,
    resizeMode: "contain",
  },
  midContainer: {
    flex: 1, // Takes up available space
    justifyContent: "space-between", // Ensures equal spacing between children
  },
  dropAddress: {
    // fontWeight: "bold",
    fontFamily: fonts.robotoBold,
    fontSize: 14,
    width: "100%", // Ensures all text aligns equally
    textAlign: "left",
  },
  subAddr: {
    fontSize: 12,
    color: "#757575",
    width: "100%", // Consistent width with other elements
    textAlign: "left",
    fontFamily: fonts.robotoRegular,
  },
  time: {
    fontSize: 12,
    color: "#757575",
    width: "100%",
    textAlign: "left",
    fontFamily: fonts.robotoRegular,
  },
  rightContainer: {
    width: "20%",
    // height: "100%",
    alignItems: "flex-end",
    gap: 10,
    justifyContent: "space-between", // Centers status text
  },
  status: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#4CAF50",
  },

  // mainContainer: {
  //   width: "100%",
  //   elevation: 1,
  //   borderRadius: 5,
  //   backgroundColor: "#fff",
  //   paddingHorizontal: 15,
  //   paddingVertical: 10,
  //   gap: 10,
  // },
  // rowWithGap: {
  //   flexDirection: "row",
  //   gap: 10,
  //   alignItems: "center",
  // },
  // rideDetailsText: {
  //   fontSize: 14,
  //   fontWeight: "600",
  // },
  // completedText: {
  //   fontSize: 11,
  //   color: "red",
  // },
  // iconContainer: {
  //   width: 30,
  // },
  // textContainer: {
  //   width: "77%",
  //   overflow: "hidden",
  // },
  // headingText: {
  //   fontSize: 15,
  //   fontWeight: "500",
  //   color: COLORS.heading,
  // },
  // subHeadingText: {
  //   fontSize: 11,
  //   color: COLORS.subHeading,
  // },
  // arrowContainer: {
  //   width: 30,
  //   height: 30,
  //   // backgroundColor: "#f2f2f0",
  //   borderRadius: 5,
  //   //
  //   // borderColor: "#d1d1cb",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
});

// LOG  {"__v": 0, "_id": "6780c78e03ee6a2bce9bf645", "attempts": 0, "createdAt": "2025-01-10T07:09:02.622Z", "drop": {"coordinates": [78.3676349, 17.4638327], "type": "Point"}, "dropAddress": "Croma - Kondapur", "dropVicinity": "opposite Bus Stop, Plot No 4, Survey No 19, Nagarjuna Ikon Serilingampally, opposite Bus Stop, Kondapur", "favorite": false, "futureTime": "1970-01-01T00:00:00.000Z", "giveVehicleNumber": true, "head": "6749a9027b55da22a2c3c379", "howManyMans": 0, "isArrived": false, "mensProblem": false, "onNaviagtionChange": false, "orderOtp": 8041, "orderOtpVerified": false, "orderPlaceDate": "10-1-2025", "orderPlaceTime": "12:39:01 pm", "pickup": {"coordinates": [78.3705333, 17.4587354], "type": "Point"}, "pickupAddress": "Sprint Business Centre, 6th Floor, Jayabheri Silicon Towers, Kothaguda, Hyderabad, Telangana 500084, India", "price": 5, "ratings": [], "receivedAmount": false, "rejectedCaptaine": [], "saved": false, "sendReceiverData": [], "status": "cancelled", "time": "", "updatedAt": "2025-01-10T07:09:05.925Z", "useScheduleActualTime": null, "userAuthenticationImage": null, "vehicleType": "scooty"}

/*
<Pressable style={styles.mainCont} onPress={onNavigateToRideDetailScreen}>
       <View style={styles.mainContainer}>
        <View style={styles.rowWithGap}>
          <Text style={styles.rideDetailsText}>Ride Details</Text>
          <Text style={[styles.completedText, { color: color }]}>
            {ride?.status}
          </Text>
        </View>
        <View style={styles.rowWithGap}>
          <View style={styles.iconContainer}>
            <FontAwesome size={25} name="location-arrow" color="#e02e88" />
          </View>
          <View style={styles.textContainer}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.headingText}
            >
              {ride?.dropAddress}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.subHeadingText}
            >
              {ride?.dropVicinity}
            </Text>
          </View>

          <View style={styles.arrowContainer}>
            <MaterialIcons
              name={isFavoriteOrRideHistory ? "arrow-forward-ios" : "favorite"}
              size={20}
              color="#e02e88"
            />
          </View>
        </View>
      </View> 
</Pressable>*/
