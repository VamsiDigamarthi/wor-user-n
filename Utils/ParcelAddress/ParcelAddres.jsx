import { StyleSheet, Text, View } from "react-native";
import { AntDesign, EvilIcons, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../Constants/colors";
import CustomBtn from "../CustomBtn/CustomBtn";

const ParcelAddres = () => {
  return (
    <View style={styles.conntainer}>
      <SingleParcelAddres
        title="Name"
        value="Dharani"
        iconName="person-outline"
      />
      <SingleParcelAddres
        title="Mobile Number"
        value="987654345678"
        iconName="call-outline"
      />
      <SingleParcelAddres
        title="Land Mark"
        value="Google Office"
        iconType="AntDesign"
        iconName="pushpino"
      />
      <SingleParcelAddres
        title="Land Mark"
        value="Address Line 1"
        iconType="EvilIcons"
        iconName="location"
        thirdLine="Address Line 2"
      />
      <BtnCard />
    </View>
  );
};

export default ParcelAddres;

const SingleParcelAddres = ({
  iconType,
  title,
  value,
  iconName,
  thirdLine = "",
}) => {
  let Icon;
  switch (iconType) {
    case "Ionicons":
      Icon = Ionicons;
      break;
    case "AntDesign":
      Icon = AntDesign;
      break;
    case "EvilIcons":
      Icon = EvilIcons;
      break;
    default:
      Icon = Ionicons;
  }

  return (
    <View style={styles.innerCard}>
      <View
        style={{
          width: 40,
          height: 40,
          //   backgroundColor: "red",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name={iconName} size={25} color="#e02e88" />
      </View>
      <View>
        <Text style={{ fontSize: 11, color: COLORS.subHeading }}>{title}</Text>
        <Text
          style={{ fontSize: 14, color: COLORS.heading }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {value}
        </Text>
        {thirdLine && (
          <Text
            style={{ fontSize: 14, color: COLORS.heading }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {thirdLine}
          </Text>
        )}
      </View>
    </View>
  );
};

const BtnCard = () => (
  <View style={styles.btnCard}>
    <CustomBtn title="Delete" btnBg="#fff" btnColor="#e02e88" width="40%" />
    <CustomBtn title="Delete" btnBg="#e02e88" btnColor="#fff" width="40%" />
  </View>
);

const styles = StyleSheet.create({
  conntainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    gap: 5,
  },
  innerCard: {
    flexDirection: "row",
    gap: 10,
    borderBottomColor: COLORS.borderColor,
    borderBottomWidth: 1,
    borderStyle: "dashed",
    paddingVertical: 4,
  },
  btnCard: {
    width: "100%",
    gap: 10,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flexDirection: "row",
    marginTop: 10,
  },
});
