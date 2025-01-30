import { Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

const AddHomePlaceBtn = ({
  title = "Home",
  subTitle = "Add Home Place",
  iconsName,
  iconType,
  onPress,
}) => {
  let Icon;
  switch (iconType) {
    case "Entypo":
      Icon = Entypo;
      break;
    case "MaterialIcons":
      Icon = MaterialIcons;
      break;
    default:
      Icon = Entypo;
  }

  return (
    <Pressable onPress={onPress} style={styles.iconsBtn}>
      <View
        style={{
          width: 40,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon size={25} color="#0597ff" name={iconsName} />
      </View>
      <View style={{ width: "80%", justifyContent: "center" }}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>{title}</Text>
        <Text style={{ fontSize: 11, color: "gray" }}>{subTitle}</Text>
      </View>
    </Pressable>
  );
};

export default AddHomePlaceBtn;

const styles = StyleSheet.create({
  iconsBtn: {
    width: "100%",
    // height: 30,
    backgroundColor: "#fff",
    elevation: 1,
    borderRadius: 10,
    flexDirection: "row",
    gap: 4,
    paddingVertical: 5,
  },
});
