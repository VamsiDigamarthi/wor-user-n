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

const ChatHead = ({ captainDetails, isWorSupport }) => {
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
          {isWorSupport ? (
            <Text
              style={{ fontSize: 17, fontWeight: "600", color: COLORS.heading }}
            >
              Wor Support
            </Text>
          ) : (
            <>
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
              <Text>{captainDetails?.vehicleNumber}</Text>
            </>
          )}
        </View>
      </View>
      {!isWorSupport && (
        <View
          style={{
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <PhoneIcon size={25} color="#EA4C89" />
        </View>
      )}
    </View>
  );
};

export default ChatHead;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 60,
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
