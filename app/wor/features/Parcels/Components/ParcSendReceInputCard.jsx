import { Pressable, StyleSheet, Text, View } from "react-native";
import { MicIcon, SearchIcons, UserIcons } from "../../../Icons/Icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { setIsParcScreen } from "../../ridebooking/sharedLogics/rideDetailsSlice";
import { fonts } from "../../../fonts/Fonts";

const ParcSendReceInputCard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isSendOrReceiveParcel } = useSelector(
    (state) => state.allRideDetails
  );

  const onNavigateToSelectDropLocationScreen = ({ isMic = false }) => {
    dispatch(setIsParcScreen(true));
    navigation.navigate("SelectDropLocation", {
      isMic,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.addDetails}>
        <UserIcons size={22} color="#e02e88" />
        <Text style={styles.sendRecieveText}>
          Add {isSendOrReceiveParcel === "send" ? "Recevier" : "Sender"} Details
        </Text>
      </View>
      <View style={styles.inputCard}>
        <Pressable
          style={styles.input}
          onPress={onNavigateToSelectDropLocationScreen}
        >
          <SearchIcons size={25} color="gray" />
          <Text style={styles.searchText}>
            Search {isSendOrReceiveParcel === "send" ? "Recevier" : "Sender"}{" "}
            Location
          </Text>
        </Pressable>
        <Pressable
          style={styles.micIcons}
          onPress={() => onNavigateToSelectDropLocationScreen({ isMic: true })}
        >
          <MicIcon size={22} color="#e02e88" />
        </Pressable>
      </View>
    </View>
  );
};

export default ParcSendReceInputCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    elevation: 1,
    backgroundColor: "#fff",
    borderRadius: 13,

    paddingVertical: 20,
    gap: 20,
  },
  addDetails: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
    alignItems: "center",
  },
  inputCard: {
    flexDirection: "row",
    gap: 3,
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 10,
    // backgroundColor: "#efefef",
  },
  input: {
    width: "85%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    // backgroundColor: "red",
  },
  micIcons: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
    width: 42.3,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },

  sendRecieveText:{ fontSize: 16, fontFamily:fonts.robotoMedium },
  searchText:{ fontSize: 16, fontFamily:fonts.robotoMedium, color: "#222222" }
});
