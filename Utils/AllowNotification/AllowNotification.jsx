import { Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../Constants/colors";
import CustomBtn from "../CustomBtn/CustomBtn";

const AllowNotification = ({ onModalClose }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.firstCard}>
          <Pressable onPress={onModalClose}>
            <Entypo name="cross" size={20} />
          </Pressable>
        </View>
        <View style={styles.rowContainer}>
          <View
            style={{
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "red",
            }}
          >
            <AntDesign name="notification" size={30} />
          </View>
          <Text style={{ fontSize: 20, fontWeight: "600", width: "86%" }}>
            Allow Notifications and on-ride alerts
          </Text>
        </View>
        <SingleCard
          title="Real-time Captain updates"
          subTite="Get notification about captain's allocation, arrival and more"
        />
        <SingleCard
          title="Offers and News"
          subTite="Be the first to know about our offers and news features"
        />
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          color: COLORS.subHeading,
          lineHeight: 23,
        }}
      >
        To Enable Notification Permissions, Go to settings.Click on Notification
        and turn on the toggle on for Show Notification
      </Text>
      <CustomBtn btnBg="#e02e88" btnColor="#fff" title="Open Settings" />
      <CustomBtn
        btnBg="#fff"
        btnColor="#e02e88"
        title="Maybe, Later"
        onPress={onModalClose}
      />
    </View>
  );
};

const SingleCard = ({ title, subTite }) => {
  return (
    <View style={styles.rowContainer}>
      <View
        style={{
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AntDesign name="notification" size={30} />
      </View>
      <View style={{ width: "90%", gap: 5 }}>
        <Text
          style={{ fontSize: 20, fontWeight: "600", color: COLORS.heading }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            color: COLORS.subHeading,
            lineHeight: 20,
          }}
        >
          {subTite}
        </Text>
      </View>
    </View>
  );
};

export default AllowNotification;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    gap: 20,
  },
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    width: "95%",
    gap: 20,
    // backgroundColor: "red",
    borderBottomColor: COLORS.borderColor,
    borderBottomWidth: 1,
    borderStyle: "dashed",
  },
  firstCard: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  rowContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
