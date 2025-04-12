import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../../../../Constants/colors";
import { imageUrl } from "../../../../../Constants/url";
import { useNavigation } from "@react-navigation/native";
import { PhoneIcon, SupportIcons, BackIcon } from "../../../Icons/Icons";
import Toast from "react-native-toast-message";

const ChatHead = ({ captainDetails, isWorSupport }) => {
  console.log(captainDetails);

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.innerCard}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon color={"#757575"} size={24} />
        </TouchableOpacity>
        <Pressable onPress={() => navigation.goBack()}>
          <View
            style={{
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              backgroundColor: "#EA4C89",
            }}
          >
            <SupportIcons size={20} color="#fff" />
          </View>
        </Pressable>
        <View style={styles.nameCard}>
          <Text
            style={{
              width: "70%",
              fontSize: 17,
              fontWeight: "600",
              color: COLORS.heading,
            }}
          >
            {captainDetails?.name}
          </Text>
          <Text>
            {captainDetails?.services[0]?.rcNumber?.toUpperCase() || ""}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
        onPress={() =>
          Toast.show({
            text1: "This Feature is currently unavailable",
            type: "info",
          })
        }
      >
        <PhoneIcon size={25} color="#EA4C89" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatHead;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 30,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingBottom: 10,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 2,
  },
  innerCard: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    width: "86%",
  },
  nameCard: {
    width: "80%",
  },
});

// {"_id": "67d0060e5690f688f361492c", "activeService": "scooty", "email": "", "languages": ["Telugu", "hindi"], "mobile": "8978106223", "name": "Narasimha", "profilePic": "uploads/1744451673295.jpg", "services": [{"_id": "67d006105690f688f3614937", "color": "SPK FL RED", "entireServicesVerifies": "initial", "fatherName": "V BHASKAR RAO LATE", "fitUpTo": "2031-01-18", "fitnessCer": null, "fuelType": "PETROL", "insuranceImg": null, "insuranceVerification": "initial", "makerDescription": "TVS MOTOR COMPANY LTD", "makerModel": "TVS SPORT CVTI BSIII", "ownerName": "V MAHESH KUMAR MAHESH KUMAR   VAIDYA ", "permanentAddress": "S-9 BLOCK-1, RBR COMPLEX, MIYAPUR, RANGAREDDY, RANGA REDDY, SERILINGAMPALLY, 500049", "presentAddress": "S-9 BLOCK-1, RBR COMPLEX, MIYAPUR, RANGAREDDY, RANGA REDDY, SERILINGAMPALLY, 500049", "rcBackImage": "uploads\\1741686374511.jpg", "rcFrontImage": "uploads\\1741686374489.jpg", "rcNumber": "Ts07ev4530", "rcVerificationStatuc": "verified", "registeredAt": "RTA RANGAREDDY", "registrationDate": "2016-01-19T00:00:00.000Z", "serviceType": "scooty", "vehicleBackImage": "uploads\\1741686402284.jpg", "vehicleFrontImage": "uploads\\1741686402167.jpg", "vehicleHelmetImage": "uploads\\1741686402544.jpg", "vehicleImageVerification": "verified", "vehicleLeftImage": "uploads\\1741686402437.jpg", "vehicleNumberPlate": "uploads\\1741686402453.jpg", "vehicleRightImage": "uploads\\1741686402355.jpg"}]}
