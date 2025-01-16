import { StyleSheet, Text, TextInput, View } from "react-native";
import { Feather, Entypo, FontAwesome6 } from "@expo/vector-icons";
import { COLORS } from "../../../../../Constants/colors";

const ParAddressInputItem = ({
  iconType,
  iconName,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  isValid = false,
  maxLength = undefined,
}) => {
  let Icon;
  switch (iconType) {
    case "Feather":
      Icon = Feather;
      break;
    case "Entypo":
      Icon = Entypo;
      break;
    case "FontAwesome6":
      Icon = FontAwesome6;
      break;
    default:
      Icon = Feather;
  }
  return (
    <View style={[styles.singleInput]}>
      <View
        style={{
          width: 30,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon
          name={iconName}
          size={20}
          color={isValid ? "#fc0303" : "#e02e88"}
        />
      </View>
      <View
        style={[styles.innerCard, isValid && { borderBottomColor: "#fc0303" }]}
      >
        <TextInput
          style={{ flex: 1, border: "none" }}
          placeholder={`Enter ${placeholder}`}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          maxLength={maxLength}
        />
      </View>
    </View>
  );
};

export default ParAddressInputItem;

const styles = StyleSheet.create({
  singleInput: {
    flexDirection: "row",
    gap: 2,
  },
  innerCard: {
    borderBottomWidth: 1,
    borderBottomColor: "#e8e6e6",
    //   borderStyle: "dashed",
    width: "89%",
    // backgroundColor: "red",
  },
});
