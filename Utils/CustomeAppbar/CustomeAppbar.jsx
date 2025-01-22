import { Pressable, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../Constants/colors";

const CustomeAppbar = ({
  title,
  navigationText,
  rightText,
  isTimer = false,
  appTitCenStyles,
  appTitCenWidth,
  vicinity,
  timerFunction,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.superContainer}>
      <View style={[styles.mainContainer]}>
        <View style={[styles.btnContainer]}>
          <TouchableOpacity
            style={[styles.btn]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={30} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={[styles.textContainer]}>
          <View style={[styles.textinnerCard, vicinity && appTitCenStyles]}>
            <View
              style={[
                { flexDirection: "row", gap: 5, alignItems: "center" },
                vicinity && appTitCenWidth,
              ]}
            >
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.text,
                  vicinity && { fontSize: 10, fontWeight: "500" },
                ]}
              >
                {title || "Title"}
              </Text>
              {vicinity && (
                <Text
                  numberOfLines={1}
                  style={{ fontSize: 10 }}
                  ellipsizeMode="tail"
                >
                  {vicinity}
                </Text>
              )}
            </View>
          </View>
          {isTimer ? (
            <Pressable onPress={timerFunction}>
              <View
                style={{
                  width: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons size={24} name="timer" color="#f98600" />
                <Text style={{ fontSize: 12, color: "gray" }}>Now</Text>
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

export default CustomeAppbar;

const styles = StyleSheet.create({
  superContainer: {
    height: 85,
    backgroundColor: "#fff",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
    elevation: 4,
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
  },
  textinnerCard: {
    flexDirection: "row",
    gap: 10,
    width: "70%",
    marginLeft: 5,
    alignItems: "center",
    paddingLeft: 10,
  },
  text: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
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
  },
});
