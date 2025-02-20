import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../Constants/colors";

const SafetyThird = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 14, fontWeight: "600", color: COLORS.heading }}>
        What we Offer
      </Text>
      <SingleCard
        title="24X7 Proactive Safety Checks"
        text="We send notifications and follow up calls in case of:"
        threeText={true}
      />
      <SingleCard
        title="SOS button"
        text="A button that calls our Central Emergency Response Team who then guide you to onground help."
      />
      <SingleCard
        title="Late night ride completion check"
        text="We call you post ride completion for feedback, each time you ride between 10pm - 5am"
      />
      <SingleCard
        title="Trip insurance"
        text="From start to finish, all trips are insured by leading insurance players."
      />
    </View>
  );
};

export default SafetyThird;

export const SingleCard = ({ title, text, threeText = false }) => {
  return (
    <View style={styles.singleCard}>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          width: "100%",
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: "#f2f0f0",
            borderRadius: 20,
            borderWidth: 1,
            borderColor: COLORS.borderColor,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="chatbubbles-outline" size={20} color="#EA4C89" />
        </View>
        <Text
          //   numberOfLines={1}
          //   ellipsizeMode="tail"
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: COLORS.heading,
            width: "86%",
            // backgroundColor: "red",
          }}
        >
          {title}
        </Text>
      </View>
      <Text style={{ fontSize: 13, color: COLORS.subHeading }}>{text}</Text>
      {threeText && (
        <>
          <Text style={{ fontSize: 13, color: COLORS.subHeading }}>
            -DROP at Different Location
          </Text>
          <Text style={{ fontSize: 13, color: COLORS.subHeading }}>
            -DROP at Different Location
          </Text>
          <Text style={{ fontSize: 13, color: COLORS.subHeading }}>
            -DROP at Different Location
          </Text>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderRadius: 10,
    padding: 15,
    gap: 10,
  },
  singleCard: {
    width: "100%",
    gap: 5,
    borderBottomColor: COLORS.borderColor,
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
});
