import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BookIcon, ForwardArrowIcon } from "../../../Icons/Icons";
import {fonts} from "../../../fonts/Fonts"
const SettingIconCard = ({
  title,
  navigationText,
  isFunc,
  parentReturnFun,
}) => {
  const navigation = useNavigation();
  const handleNavigationScreen = () => {
    navigationText && navigation.navigate(navigationText);
  };
  return (
    <View style={styles.container}>
      <BookIcon style={{ marginTop: 7 }} size={25} color="black" />
      <Pressable
        onPress={isFunc ? () => parentReturnFun(title) : handleNavigationScreen}
        style={styles.textCard}
      >
        <Text style={styles.text}>{title}</Text>
        <ForwardArrowIcon size={18} color="black" />
      </Pressable>
    </View>
  );
};

export default SettingIconCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  textCard: {
    width: "90%",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
    borderBottomColor: "#d7d9d7",
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  text: {
    fontSize: 16,
    // fontWeight: "600",
    fontFamily:fonts.robotoSemiBold
  },
});
