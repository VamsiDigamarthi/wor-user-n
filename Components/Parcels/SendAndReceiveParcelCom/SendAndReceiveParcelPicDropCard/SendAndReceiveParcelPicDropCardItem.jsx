import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SendAndReceiveParcelPicDropCardItem = ({
  title,
  subTitle,
  iconColor,
  iconName,
  bottomBorder,
  onPress,
  dataFromPickLocation,
}) => {
  const navigation = useNavigation();
  const onHandlePressMicBtn = () => {
    navigation.navigate("ParcelPickLocation", {
      typeOfLocation: title === "Collect From:" ? "Pick Up" : "Drop",
      isMicClick: true,
    });
  };

  return (
    <View style={[styles.container, bottomBorder]}>
      <Pressable onPress={onPress}>
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
      </Pressable>
      <Pressable onPress={onHandlePressMicBtn}>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
          }}
        >
          <FontAwesome5 name="microphone" size={25} color="#EA4C89" />
        </View>
      </Pressable>
    </View>
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
    backgroundColor: "#EA4C89",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
