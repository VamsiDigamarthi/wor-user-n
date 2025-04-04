import { Image, StyleSheet, Text, View } from "react-native";
import { noficationHelmet } from "../../../../Images/Notification";
import { fonts } from "../../../../fonts/Fonts";

const NotificationItem = ({ data }) => {
  console.log(data);

  function getDayDifferenceFromNow(dateString) {
    const givenDate = new Date(dateString);
    const today = new Date();

    // Remove time part for accurate day difference
    const given = new Date(
      givenDate.getFullYear(),
      givenDate.getMonth(),
      givenDate.getDate()
    );
    const now = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const diffTime = now - given;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  }

  const imageSrc = data.image ? { uri: data.image } : noficationHelmet;

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={imageSrc} />
      <View style={styles.notificationCard}>
        <Text style={styles.refer}>{data?.title || "N/A"}</Text>
        <Text style={styles.forgot}>{data?.body || "N/A"}</Text>
        <Text style={styles.days}>
          {getDayDifferenceFromNow(data?.createdAt)}
        </Text>
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
    resizeMode: "contain",
  },
  notificationCard: {
    width: "92%",
    // height: "100%",
    gap: 2,
  },
  refer: {
    fontSize: 14,
    // fontWeight: "bold",
    fontFamily: fonts.robotoSemiBold,
  },
  forgot: {
    fontSize: 11,
    color: "#808080",
    fontFamily: fonts.robotoRegular,
  },
  days: {
    fontSize: 13,
    fontFamily: fonts.robotoRegular,

    // color: "#808080",
  },
});
