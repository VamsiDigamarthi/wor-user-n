import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";

const SendAndReceiveParcelPicDropCardItem = ({
  title,
  subTitle,
  iconColor,
  iconName,
  bottomBorder,
  onPress,
  dataFromPickLocation,
}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.container, bottomBorder]}>
        <View style={styles.innerCard}>
          <FontAwesome6 name={iconName} size={25} color={iconColor} />

          <View style={styles.locationCard}>
            <Text
              style={styles.firstText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {dataFromPickLocation?.name ? dataFromPickLocation?.name : title}
            </Text>
            <Text
              style={styles.secondText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {dataFromPickLocation?.vicinity
                ? dataFromPickLocation?.vicinity
                : subTitle}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
          }}
        >
          <FontAwesome5 name="microphone" size={25} color="#e02e88" />

          {/* <View style={styles.secondCard}>
            <FontAwesome5 name="plus" size={15} color="#fff" />
          </View> */}
        </View>
      </View>
    </Pressable>
  );
};

export default SendAndReceiveParcelPicDropCardItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  innerCard: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    width: "92%",
  },
  locationCard: {
    width: "89%",
  },
  firstText: {
    fontSize: 14,
    fontWeight: "600",
  },
  secondText: {
    fontSize: 11,
    color: "#808080",
  },
  secondCard: {
    width: 30,
    height: 30,
    backgroundColor: "#e02e88",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
