import { StyleSheet, Text, View } from "react-native";
import { InfoIcons } from "../../../../Icons/Icons";

export const TickCard = ({ text }) => (
  <View style={styles.rowCard}>
    <View
      style={{
        width: 20,
        height: 40,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginTop: 5,
      }}
    >
      <InfoIcons size={20} color="gray" />
    </View>
    <Text style={{ flex: 1, color: "#111111", fontSize: 15, lineHeight: 21 }}>
      {text}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  rowCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    alignItems: "flex-start",
  },
});
