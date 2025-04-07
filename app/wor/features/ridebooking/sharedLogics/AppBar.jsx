import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { HamborgIcon } from "../../../Icons/Icons";
import { DrawerActions } from "@react-navigation/native";
import AppBarRideBookingConditions from "./AppBarRideBookingConditions";
import SupportIcons from "./SupportIcons";
import AppBarTitle from "./AppBarTitle";
import { useSelector } from "react-redux";
import { fonts } from "../../../fonts/Fonts";
import ChatBotIcons from "./ChatBotIcons";

const Appbar = ({
  title,
  navigationText,
  rightText,
  isTimer = false,
  vicinity,
  timerFunction = () => {},
  isPositionAppbar = false,
  isDrawerIcon = false,
  // ride accept screen props
  isArrived = false,
  otpVerified = false,
  rideTide = "",
  ride3mTimes = "",
  isRideBookingScree = false,
  // border styles
  borderStyles = { borderStyles },
  chatBotText,
}) => {
  const navigation = useNavigation();
  const { formateTime } = useSelector((state) => state.allRideDetails);

  return (
    <View
      style={[styles.superContainer, isPositionAppbar && styles.postionAppBar]}
    >
      <View style={[styles.mainContainer]}>
        <View style={[styles.btnContainer]}>
          {isDrawerIcon ? (
            <Pressable
              style={styles.menu}
              onPress={() => navigation.openDrawer()}
            >
              <HamborgIcon size={25} color="#000" />
            </Pressable>
          ) : (
            <Pressable style={[styles.btn]} onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={25} color="#000" />
            </Pressable>
          )}
        </View>

        <View style={[styles.textContainer]}>
          {/* { width: rightText ? "86%" : "70%" } */}
          <AppBarTitle
            borderStyles={borderStyles}
            title={title}
            vicinity={vicinity}
            width={rightText ? "70%" : "96%"}
          />
          {isTimer && (
            <Pressable onPress={timerFunction} style={styles.timerCard}>
              <Ionicons size={24} name="timer" color="#f98600" />
              <Text
                style={{
                  fontSize: 10,
                  color: "gray",
                  fontFamily: fonts.robotoRegular,
                }}
              >
                {formateTime ? formateTime : "Now"}
              </Text>
            </Pressable>
          )}

          {isRideBookingScree && (
            <AppBarRideBookingConditions
              isArrived={isArrived}
              otpVerified={otpVerified}
              rideTide={rideTide}
            />
          )}
          {rightText && (
            <SupportIcons
              navigationText={navigationText}
              rightText={rightText}
            />
          )}
          {chatBotText && <ChatBotIcons chatBotText={chatBotText} />}
        </View>
      </View>
    </View>
  );
};

export default Appbar;

const styles = StyleSheet.create({
  superContainer: {
    height: Platform.OS === "ios" ? 95 : 85,

    backgroundColor: "#fff",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
    // elevation: 4,
  },
  postionAppBar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: Platform.OS === "ios" ? 100 : 85,

    // backgroundColor: "red",
    zIndex: 999,
  },
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#FFE2E6",
    borderRadius: 6,
    height: 50,
    zIndex: 30,
    backgroundColor: "#fff",
    width: "100%",
    // backgroundColor:"yellow"
  },

  btnContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: "12%",
    height: "100%",
    marginBottom: 5,
    // backgroundColor:"red"
  },

  btn: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  textContainer: {
    flexDirection: "row",
    borderColor: "#FFE2E6",
    width: "88%",
    height: "100%",
    alignItems: "center",
    gap: 8,
    paddingRight: 50,
    position: "relative",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    // paddingLeft: 30,
    // textAlign: "center",
    // backgroundColor: "red",
    marginTop: 3,
  },
  textinnerCard: {
    flexDirection: "row",
    gap: 10,
    width: "70%",
    marginLeft: 5,
    alignItems: "center",
    paddingLeft: 10,

    // backgroundColor: "red",
  },
  text: {
    color: "#000",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    // backgroundColor: "red",
  },
  icon: {
    marginTop: 2,
  },
  rightIconCard: {
    height: "60%",
    borderColor: "#ffe2e6",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 7,
  },

  appTitCenStyles: {
    // backgroundColor: "red",
    width: "80%",
    marginBottom: 12,
  },
  appTitCenWidth: {
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 2,
    elevation: 4,
  },

  midContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    // borderWidth: 1,
    borderRadius: 20,
    padding: 10,

    // backgroundColor: "red",
  },
  timerCard: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    // backgroundColor: "red",
  },
  menu: {
    // backgroundColor:"red",
    marginBottom: 7,
    marginRight: 6,
  },
});
