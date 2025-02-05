import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AppBarTitle = ({
  vicinity,
  title,
  borderStyles = true,
  width = "94%",
}) => {
  const navigation = useNavigation();

  const handleBackOrNavigateSelectDropScreen = () => {
    !borderStyles &&
      navigation.navigate("SelectDropLocation", {
        title,
        passParams: true,
      });
  };

  return (
    <TouchableOpacity
      onPress={handleBackOrNavigateSelectDropScreen}
      style={[
        !borderStyles && styles.main,
        styles.textinnerCard,
        vicinity && styles.appTitCenStyles,
        { width },
      ]}
    >
      <View
        style={[
          { flexDirection: "row", gap: 5, alignItems: "center" },
          vicinity && styles.appTitCenWidth,
        ]}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[
            styles.text,
            !borderStyles && { textAlign: "center", width: "100%" },
            vicinity && {
              fontSize: 13,
              fontWeight: "500",
            },
          ]}
        >
          {title || "Title"}
        </Text>
        {/* </View> */}
        {vicinity && (
          <Text
            numberOfLines={1}
            style={[
              !borderStyles && { textAlign: "center", width: "100%" },
              { fontSize: 10, textAlign: "center" },
            ]}
            ellipsizeMode="tail"
          >
            {vicinity}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default AppBarTitle;

const styles = StyleSheet.create({
  textinnerCard: {
    flexDirection: "row",
    gap: 10,
    width: "95%",
    marginLeft: 5,
    alignItems: "center",
    // paddingLeft: 10,
    backgroundColor: "#fff",
  },
  text: {
    color: "#000",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  appTitCenStyles: {
    // backgroundColor: "red",
    width: "90%",
    marginBottom: 12,
  },
  appTitCenWidth: {
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 2,
    // backgroundColor: "blue",
  },
  main: {
    // backgroundColor: "red",
    borderWidth: 1,
    borderColor: "#f2f3f6",
    // elevation: 4,
    padding: 8,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
