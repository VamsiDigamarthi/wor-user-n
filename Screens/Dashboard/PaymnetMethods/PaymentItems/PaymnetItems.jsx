import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const PaymnetItems = ({
  title,
  imageSource,
  iconsText,
  iconName,
  isOpenIconOrCheckBox = true,
  isChecked = false,
  onToggle = () => {},
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
          <Icon name={iconName} size={20} color="#e02e88" />
        )}
        <Text style={{ fontSize: 13, fontWeight: "600" }}>{title}</Text>
      </View>
      {isOpenIconOrCheckBox ? (
        <MaterialIcons name="arrow-forward-ios" color="#e02e88" size={18} />
      ) : (
        <TouchableOpacity
          style={[styles.checkbox, isChecked && styles.checked]}
          onPress={onToggle}
        >
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
    borderRadius: 4,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checked: {
    backgroundColor: "#e02e88",
  },
  checkedMark: {
    width: 12,
    height: 12,
    backgroundColor: "#fff",
    borderRadius: 2,
  },
});
