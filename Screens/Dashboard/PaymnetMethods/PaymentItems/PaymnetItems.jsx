import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { COLORS } from "../../../../Constants/colors";

const PaymnetItems = ({
  title,
  imageSource,
  iconsText,
  iconName,
  isOpenIconOrCheckBox = false,
  isChecked = false,
  onToggle = () => {},
  isMoney = false,
}) => {
  let Icon;
  switch (iconsText) {
    case "MaterialCommunityIcons":
      Icon = MaterialCommunityIcons;
      break;
    case "Paytm":
      Icon = MaterialIcons;
      break;
    case "UPI":
      Icon = MaterialCommunityIcons;
      break;
    case "Ionicons":
      Icon = Ionicons;
      break;
    default:
      Icon = MaterialCommunityIcons;
      break;
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", gap: 7, alignItems: "center" }}>
        {imageSource ? (
          <Image source={imageSource} style={styles.image} />
        ) : (
          <Icon name={iconName} size={20} color="#EA4C89" />
        )}
        <Text style={{ fontSize: 13, fontWeight: "600" }}>{title}</Text>
      </View>
      {isOpenIconOrCheckBox ? (
        <>
          {isMoney ? (
            <Text
              style={{ fontSize: 16, color: "#EA4C89", fontWeight: "bold" }}
            >
              ₹78
            </Text>
          ) : (
            <MaterialIcons name="arrow-forward-ios" color="#EA4C89" size={18} />
          )}
        </>
      ) : (
        <TouchableOpacity
          style={[styles.checkbox, isChecked && styles.checked]}
          onPress={onToggle}
        >
          {/* {isChecked && <View style={styles.outerCard} />} */}
          {isChecked && <View style={styles.checkedMark} />}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PaymnetItems;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    borderColor: "#ffe2e6",
    borderWidth: 1,
    backgroundColor: "#fff",
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: 20, // Adjust size as needed
    height: 20, // Adjust size as needed
    resizeMode: "contain",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#c7c8c9",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    marginRight: 10,
  },
  checked: {
    backgroundColor: "#EA4C89",
  },
  checkedMark: {
    width: 12,
    height: 12,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
});
