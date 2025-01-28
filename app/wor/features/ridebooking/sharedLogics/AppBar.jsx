import { Pressable, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../../Constants/colors";
import { HamborgIcon } from "../../../Icons/Icons";
import { DrawerActions } from "@react-navigation/native";

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
}) => {
  const navigation = useNavigation();

  const onOpenDrawer = () => {
    console.log("open drawer");
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View
      style={[styles.superContainer, isPositionAppbar && styles.postionAppBar]}
    >
      <View style={[styles.mainContainer]}>
        <View style={[styles.btnContainer]}>
          {isDrawerIcon ? (
            <Pressable onPress={onOpenDrawer}>
              <HamborgIcon size={20} color="#000" />
            </Pressable>
          ) : (
            <TouchableOpacity
              style={[styles.btn]}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={30} color="#000" />
            </TouchableOpacity>
          )}
        </View>

        <View style={[styles.textContainer]}>
          <View
            style={[styles.textinnerCard, vicinity && styles.appTitCenStyles]}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[styles.midContainer, vicinity && styles.appTitCenWidth]}
            >
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.text,
                  vicinity && { fontSize: 13, fontWeight: "500" },
                  { textAlign: "center" },
                ]}
              >
                {title || "Title"}
              </Text>
              {vicinity && (
                <Text
                  numberOfLines={1}
                  style={{ fontSize: 10, textAlign: "center", width: "100%" }}
                  ellipsizeMode="tail"
                >
                  {vicinity}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* this ui related "select destination" & "Ride Accept Screen" screen and show "support" icons screen */}
          {isTimer ? (
            <Pressable onPress={timerFunction}>
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
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                      {rideTide?.durationInMinutes}
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                      Mins
                    </Text>
                  </>
                ) : (
                  <>
                    {isArrived ? (
                      <>
                        <Ionicons size={24} name="timer" color="#f98600" />
                        <Text style={{ fontSize: 12, color: "gray" }}>Now</Text>
                      </>
                    ) : (
                      <>
                        <Text style={{ fontSize: 16, fontWeight: "600" }}>
                          ETA
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: "600" }}>
                          {rideTide?.durationInMinutes}
                        </Text>
                      </>
                    )}
                  </>
                )}
              </View>
            </Pressable>
          ) : (
            <>
              {rightText && (
                <Pressable
                  onPress={() => navigation.navigate(navigationText)}
                  style={styles.rightIconCard}
                >
                  <MaterialIcons
                    name="support-agent"
                    size={15}
                    color="#e02e88"
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "500",
                      color: COLORS.subHeading,
                    }}
                  >
                    {rightText}
                  </Text>
                </Pressable>
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default Appbar;

const styles = StyleSheet.create({
  superContainer: {
    height: 95,
    backgroundColor: "#fff",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
    elevation: 4,
  },
  postionAppBar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 85,
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
  },

  btnContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "12%",
    height: "100%",
    marginBottom: 5,
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
    width: "100%",
    height: "100%",
    alignItems: "center",
    gap: 8,
    paddingRight: 50,
    position: "relative",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    // paddingLeft: 30,
    // textAlign: "center",
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
});
