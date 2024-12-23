import { View, Text, StyleSheet } from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import InviteBtn from "./InviteBtn";
import { Linking, Share } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const shareOnWhatsApp = () => {
  const message = "Hey! Check out Women Rider. Use my referral code: GOWOR";
  const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
  Linking.openURL(url).catch(() => {
    Alert.alert("Error", "WhatsApp is not installed on your device.");
  });
};

const shareInviteLink = async () => {
  try {
    await Share.share({
      message: "Hey! Check out Women Rider. Use my referral code: GOWOR",
    });
  } catch (error) {
    console.error(error.message);
  }
};

export default function InviteCard() {
  return (
    <LinearGradient
      colors={["#fff", "#fff5f9"]} // Gradient colors
      start={{ x: 0, y: 0 }} // Gradient start point (top-left)
      end={{ x: 0, y: 1 }} // Gradient end point (bottom-right)
      style={styles.card} // Apply styles
    >
      <Text style={styles.title}>How It Works</Text>

      <View style={[styles.textCard]}>
        <Fontisto name="share-a" size={24} color="black" style={styles.icon} />
        <Text style={styles.text}>
          Share the referral link with your friend.
        </Text>
      </View>

      <View style={styles.textCard}>
        <FontAwesome
          name="shopping-bag"
          size={24}
          color="black"
          style={styles.icon}
        />
        <Text style={styles.text}>
          After your friend places their first order, you get 20% off up to 200
          on your next order
        </Text>
      </View>

      <View style={styles.textCard}>
        <FontAwesome name="rupee" size={24} color="black" style={styles.icon} />
        <Text style={styles.text}>
          Upon 10 successful referrals, you earn 500
        </Text>
      </View>

      <InviteBtn
        text="Invite Via Whatsapp"
        icon={<FontAwesome name="whatsapp" size={24} color="green" />}
        onclick={shareOnWhatsApp}
      />
      <InviteBtn
        text="Share Invite Link"
        icon={<FontAwesome5 name="share-square" size={24} color="black" />}
        onclick={shareInviteLink}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    gap: 10,
    borderRadius: 30,
    position: "relative",
    bottom: 70,
    width: "95%",
    left: 8,
  },

  title: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },

  textCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    gap: 12,
  },

  icon: {
    width: 30, // Fixed width for consistent spacing
    textAlign: "center", // Centers the icon horizontally within the width
  },

  text: {
    flex: 1, // Occupies remaining horizontal space
    fontSize: 14,
    lineHeight: 20,
  },
});
