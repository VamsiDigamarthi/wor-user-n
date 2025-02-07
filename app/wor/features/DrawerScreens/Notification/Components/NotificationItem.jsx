import { Image, StyleSheet, Text, View } from "react-native";
import { noficationHelmet } from "../../../../Images/Notification";
import { fonts } from "../../../../fonts/Fonts";

const NotificationItem = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={noficationHelmet} />
      <View style={styles.notificationCard}>
        <Text style={styles.refer}>Refer Now and Earn Money</Text>
        <Text style={styles.forgot}>
          Don't forgot to share your referal code to earn
        </Text>
        <Text style={styles.days}>4 Days Ago</Text>
      </View>
    </View>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    gap: 10,
    padding: 15,
    // marginHorizontal: 10,
    borderRadius: 15,
    // borderBottomWidth: 1,
    // borderColor: "#808080",
  },
  img: {
    height: 50,
    width: 50,
  },
  notificationCard: {
    width: "92%",
    // height: "100%",
    gap: 2,
  },
  refer: {
    fontSize: 14,
    // fontWeight: "bold",
    fontFamily:fonts.robotoSemiBold
  },
  forgot: {
    fontSize: 11,
    color: "#808080",
    fontFamily:fonts.robotoRegular
  },
  days: {
    fontSize: 13,
    fontFamily:fonts.robotoRegular

    // color: "#808080",
  },
});
