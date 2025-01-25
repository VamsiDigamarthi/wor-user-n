import { Image, StyleSheet, Text, View } from "react-native";
import {
  Feather,
  FontAwesome,
  FontAwesome6,
  Ionicons,
} from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { COLORS } from "../../../../../../../Constants/colors";
import {
  AutoImg,
  GiftImg,
  ScootyImg,
  CabImg,
} from "../../../../../Images/Universal";
import RideHistoryNewItem from "../RideHistoryNewItem";
import StarRating from "../../../../../utiles/StarRating/StarRating";

const RideHistoryDetailsViewFirst = ({ ride }) => {
  // console.log(ride);

  return (
    <>
      {/* <View style={styles.container}>
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
      </View> */}

      <View style={styles.containerNew}>
        <View style={styles.topCard}>
          <Image source={ScootyImg} style={styles.img} />

          <View>
            <Text style={styles.boldText}> {ride?.orderPlaceDate}</Text>
            <Text style={styles.semiBoldText}> {ride?._id}</Text>
            <Text
              style={[
                styles.boldText,
                {
                  color: ride?.status == "cancelled" ? "red" : "green",
                },
              ]}
            >
              {" "}
              {ride?.status}
            </Text>
          </View>
        </View>

        <RideHistoryNewItem orderDetails={ride} />

        <View style={styles.ratingCard}>
          <Text style={styles.boldText}>Your Rating</Text>
          <StarRating rating={4} />
        </View>

        <View style={styles.priceCard}>
          <View style={styles.row}>
            <Text style={styles.semiBoldText}>Total Ride Distance</Text>
            <Text style={styles.semiBoldText}>2.4 KM</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.semiBoldText}>Total Ride Time</Text>
            <Text style={styles.semiBoldText}>{ride?.time || "25 Mins"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.semiBoldText}>Total Fare Price</Text>
            <Text style={styles.semiBoldText}>₹ {ride?.price}</Text>
          </View>
        </View>

        <SendMailCard />
      </View>
    </>
  );
};

export default RideHistoryDetailsViewFirst;

// const SingleLocationCard = ({
//   mainLocation,
//   subLocation,
//   time,
//   iconType,
//   iconName,
//   iconColor,
// }) => {
//   let Icon;
//   switch (iconType) {
//     case "Ionicons":
//       Icon = Ionicons;
//       break;
//     case "FontAwesome":
//       Icon = FontAwesome;
//       break;
//     default:
//       Icon = Ionicons;
//       break;
//   }

//   return (
//     <View style={styles.innerCard}>
//       <View style={{ flexDirection: "row", gap: 2 }}>
//         <View style={{ width: 55, marginTop: 5 }}>
//           <Text style={{ fontSize: 8 }}>{time ?? "02:42:12 PM"}</Text>
//         </View>
//       </View>
//       <View style={styles.iconContainer}>
//         <Icon size={25} name={iconName} color={iconColor} />
//       </View>
//       <View style={{ width: "65%" }}>
//         <Text numberOfLines={1} ellipsizeMode="tail" style={styles.headingText}>
//           {mainLocation}
//         </Text>
//         <Text
//           numberOfLines={1}
//           ellipsizeMode="tail"
//           style={styles.subHeadingText}
//         >
//           {subLocation}
//         </Text>
//       </View>
//     </View>
//   );
// };

// const RideTimeKmPriceCard = ({ ride }) => {
//   return (
//     <View style={styles.pricContainer}>
//       <View
//         style={{
//           gap: 1,
//           width: "33%",
//           alignItems: "center",
//         }}
//       >
//         <Text
//           style={{ fontSize: 12, fontWeight: "600", color: COLORS.heading }}
//         >
//           2.8 KM
//         </Text>
//         <Text style={{ fontSize: 9 }}>Total Ride Distance</Text>
//       </View>
//       <View
//         style={{
//           gap: 1,
//           width: "33%",
//           alignItems: "center",
//         }}
//       >
//         <Text
//           style={{ fontSize: 12, fontWeight: "600", color: COLORS.heading }}
//         >
//           32 Min
//         </Text>
//         <Text style={{ fontSize: 9 }}>Total Ride Time</Text>
//       </View>
//       <View
//         style={{
//           gap: 1,
//           width: "33%",
//           alignItems: "center",
//         }}
//       >
//         <Text
//           style={{ fontSize: 12, fontWeight: "600", color: COLORS.heading }}
//         >
//           ₹{ride?.price}
//         </Text>
//         <Text style={{ fontSize: 9 }}>Total Fair Price</Text>
//       </View>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  // container: {
  //   width: "100%",
  //   backgroundColor: "#fff",
  //   elevation: 1,
  //   borderRadius: 10,
  //   paddingHorizontal: 16,
  //   paddingVertical: 10,
  //   gap: 10,
  // },
  // completedText: {
  //   fontSize: 11,
  //   color: "red",
  // },
  // rowWithGap: {
  //   flexDirection: "row",
  //   gap: 10,
  //   alignItems: "center",
  // },
  // innerParentCard: {
  //   elevation: 2,
  //   borderRadius: 10,
  //   marginVertical: 3,
  //   padding: 5,
  //   backgroundColor: "#fff",
  // },
  // innerCard: {
  //   backgroundColor: "#fff",

  //   flexDirection: "row",
  //   alignItems: "flex-start",
  //   gap: 5,
  //   padding: 5,
  // },
  // iconContainer: {
  //   width: 30,
  // },
  // headingText: {
  //   fontSize: 12,
  //   fontWeight: "500",
  //   color: COLORS.heading,
  // },
  // subHeadingText: {
  //   fontSize: 11,
  //   color: COLORS.subHeading,
  // },
  // pricContainer: {
  //   width: "100%",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   flexDirection: "row",
  // },

  containerNew: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
  },

  topCard: {
    flexDirection: "row",
    gap: 20,
    borderBottomWidth: 1,
    borderStyle: "dashed",
    paddingBottom: 5,
    borderColor: "#E8E8E8",
  },

  img: {
    height: 50,
    width: 50,
  },

  boldText: {
    fontWeight: "bold",
  },
  semiBoldText: {
    fontWeight: "400",
  },

  ratingCard: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    borderStyle: "dashed",
    borderColor: "#E8E8E8",
  },

  priceCard: {
    paddingVertical: 10,
    gap: 15,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    borderStyle: "dashed",
    borderColor: "#E8E8E8",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sendMailCard: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
    paddingVertical: 10,
  },
});

// LOG  {"__v": 0, "_id": "6789de43b2a38945750b755b", "acceptCaptain": "677baea903ee6a2bce9ba2fc", "attempts": 0, "captainCoor": {"lat": 17.4587204, "lng": 78.3705279}, "createdAt": "2025-01-17T04:36:19.522Z", "drop": {"coordinates": [78.47724389999999, 17.406498], "type": "Point"}, "dropAddress": "Hyderabad", "dropVicinity": "Hyderabad", "extraCharge": 0, "favorite": false, "futureTime": "1970-01-01T00:00:00.000Z", "giveVehicleNumber": true, "head": "6749a9027b55da22a2c3c379", "howManyMans": 0, "isArrived": true, "mensProblem": false, "onNaviagtionChange": false, "orderOtp": 1437, "orderOtpVerified": true, "orderPlaceDate": "17-1-2025", "orderPlaceTime": "10:06:18 am", "pickup": {"coordinates": [78.3705148, 17.4586952], "type": "Point"}, "pickupAddress": "HCL Technologies, G -1, near Google Office, Kothaguda, Hyderabad, Telangana 500084, India", "price": 89, "ratings": [], "receivedAmount": false, "rejectedCaptaine": [], "saved": false, "sendReceiverData": [], "status": "completed", "time": "", "updatedAt": "2025-01-17T04:38:41.202Z", "useScheduleActualTime": null, "userAuthenticationImage": null, "vehicleType": "scooty"}

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
