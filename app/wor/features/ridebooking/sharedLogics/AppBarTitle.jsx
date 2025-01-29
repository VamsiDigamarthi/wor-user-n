import { StyleSheet, Text, View } from "react-native";
import { Octicons } from "@expo/vector-icons";

const AppBarTitle = ({ vicinity, title }) => {
  return (
    <View style={[styles.textinnerCard, vicinity && styles.appTitCenStyles]}>
      <View
        style={[
          { flexDirection: "row", gap: 5, alignItems: "center" },
          vicinity && styles.appTitCenWidth,
        ]}
      >
        {/* <View style={{ flexDirection: "row", gap: 3, alignItems: "center" }}> */}
        {/* <Octicons name="dot" size={20} color="#fd2a2e" /> */}
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.text, vicinity && { fontSize: 13, fontWeight: "500" }]}
        >
          {title || "Title"}
        </Text>
        {/* </View> */}
        {vicinity && (
          <Text numberOfLines={1} style={{ fontSize: 10 }} ellipsizeMode="tail">
            {vicinity}
          </Text>
        )}
      </View>
    </View>
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
  },
});
