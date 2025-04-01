import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../../../../../../Constants/colors";
import { ScootyImg } from "../../../../../Images/Universal";
import StarRating from "../../../../../utiles/StarRating/StarRating";
import { fonts } from "../../../../../fonts/Fonts";
import { rideDeleteRequest } from "../../service/rideHistory.serv";
import { useDispatch, useSelector } from "react-redux";
import { deletRideItme } from "../../rideHistory.slice";
import { useNavigation } from "@react-navigation/native";
import PickDropCard from "../PickDropCard";
import { API } from "../../../../../../../Constants/url";
import { showMessage } from "react-native-flash-message";
import Toast from "react-native-toast-message";

const RideHistoryDetailsViewFirst = ({ ride }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.token);
  const { profile } = useSelector((state) => state.profileSlice);

  const { rideHistory } = useSelector((state) => state.rideHistory);
  const handleRideDeleteRequest = async () => {
    const data = await rideDeleteRequest({ token, orderId: ride._id });

    if (!data) return;
    navigation.goBack();
    const filterRides = rideHistory?.filter((each) => each._id !== ride._id);
    dispatch(deletRideItme(filterRides));
  };

  const sendInvoiceToMail = async (rideId) => {
    if (!rideId) {
      Toast.show({
        text1: "Something went wrong, Try again later",
        type: "error",
        position: "bottom",
      });

      return;
    }

    if (!profile.email) {
      Toast.show({
        text1: "Please check your email in Your profile section",
        type: "error",
        position: "bottom",
      });

      return;
    }

    try {
      const response = await API.post(`/contact/get-invoice`, {
        orderId: rideId,
        email: profile?.email,
      });

      Toast.show({
        text1: "Invoice sent to Mail",
        type: "success",
        position: "bottom",
      });
    } catch (error) {
      // console.log(error?.message);

      Toast.show({
        text1: "Somthing Went Wrong, Please check your Mail or Try again Later",
        type: "error",
        position: "bottom",
      });
    }
  };

  return (
    <>
      <View style={styles.containerNew}>
        <View style={styles.topCard}>
          <Image source={ScootyImg} style={styles.img} />

          <View style={{ gap: 4 }}>
            <Text style={styles.boldText}>{ride?.orderPlaceDate}</Text>
            <Text style={styles.semiBoldText}>Id : {ride?._id}</Text>

            <View
              style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
            >
              <Text
                style={[
                  styles.boldText,
                  {
                    color: ride?.status == "cancelled" ? "red" : "green",
                  },
                ]}
              >
                {ride?.status}
              </Text>

              <View
                style={{
                  backgroundColor: "red",
                  alignItems: "center",
                  justifyContent: "center",
                  // padding: 2,
                  height: 30,
                  width: 30,
                  borderRadius: 30,
                }}
              >
                <Pressable onPress={handleRideDeleteRequest}>
                  <MaterialIcons name="delete-outline" size={24} color="#fff" />
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        <PickDropCard
          dropPlaceName={ride?.dropAddress}
          dropVicinity={ride?.dropVicinity}
          pickPlaceName={ride?.pickupAddress}
          pickVicinity={ride?.pickupVicinity}
        />

        {ride?.status !== "cancelled" && (
          <View style={styles.ratingCard}>
            <Text style={styles.boldText}>Your Rating</Text>
            <StarRating
              initialRating={ride?.ratings?.rating}
              isFunCallable={false}
            />
          </View>
        )}

        {ride?.status !== "cancelled" && (
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
        )}

        {ride?.status !== "cancelled" && (
          <SendMailCard onclick={() => sendInvoiceToMail(ride?._id)} />
        )}
      </View>
    </>
  );
};

export default RideHistoryDetailsViewFirst;

const styles = StyleSheet.create({
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
    // fontWeight: "bold",
    fontFamily: fonts.robotoSemiBold,
  },
  semiBoldText: {
    // fontWeight: "400",
    fontFamily: fonts.robotoRegular,
  },

  ratingCard: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    borderStyle: "dashed",
    borderColor: "#E8E8E8",
    gap: 4,
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

const SendMailCard = ({ onclick }) => {
  return (
    <TouchableOpacity style={styles.sendMailCard} onPress={onclick}>
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
    </TouchableOpacity>
  );
};
