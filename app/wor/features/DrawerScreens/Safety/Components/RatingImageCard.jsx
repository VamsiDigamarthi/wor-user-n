import { View, Text, StyleSheet, Image } from "react-native";
import { RatingLady } from "../../../../Images/Rating";
import { fonts } from "../../../../fonts/Fonts";

export default function RatingImageCard({ title, text }) {
  return (
    <View style={styles.card}>
      <Image source={RatingLady} style={styles.img} />
      <Text style={styles.mainText}>{title}</Text>
      <Text style={styles.subText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    elevation: 1,
    borderRadius: 20,
    backgroundColor: "#fff",
    gap: 5,
    padding: 10,
    shadowColor: "#000",  // Color of the shadow
    shadowOffset: { width: 0, height: 2 }, // Offset of the shadow (x, y)
    shadowOpacity: 0.1,  // Opacity of the shadow
    shadowRadius: 5, 
    marginBottom:10
  },
  img: {
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    resizeMode: "cover",
    width: "100%",
  },
  mainText: {
    textAlign: "center",
    fontFamily:fonts.robotoBold,
    // fontWeight: "bold",
    fontSize: 16,
  },
  subText: {
    fontSize: 14,
    // fontWeight: "400",
    fontFamily:fonts.robotoRegular,
    textAlign: "justify",
    lineHeight:20
  },
});
