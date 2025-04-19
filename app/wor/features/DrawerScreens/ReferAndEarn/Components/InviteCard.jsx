import { View, Text, StyleSheet, Alert, Share, Platform } from "react-native";
import React, { memo, useCallback, useMemo } from "react";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import InviteBtn from "./InviteBtn";
import { Linking } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { fonts } from "../../../../fonts/Fonts";
import * as Clipboard from "expo-clipboard";

const InviteCard = ({ refCode }) => {
  // App store links
  const PLAY_STORE_LINK =
    "https://play.google.com/store/apps/details?id=com.nuhvin.womenrider";
  const APP_STORE_LINK = "https://apps.apple.com/us/app/your-app/id1234567890";

  // Create the direct install link with referral code
  const createInstallLink = () => {
    return Platform.select({
      ios: `${APP_STORE_LINK}?referral=${refCode}`,
      android: `${PLAY_STORE_LINK}&referrer=${refCode}`,
      default: PLAY_STORE_LINK,
    });
  };

  // Share via WhatsApp
  const shareOnWhatsApp = async () => {
    const installLink = createInstallLink();
    const message = `Hey! Join me on Women Rider - the safest ride-sharing app for women! ✨

Use my referral code: *${refCode}* when you sign up and we both get benefits!

🔗 Download app: ${installLink}`;

    try {
      await Linking.openURL(
        `whatsapp://send?text=${encodeURIComponent(message)}`
      );
    } catch (error) {
      Alert.alert("Error", "WhatsApp is not installed on your device.");
    }
  };

  // General share
  const shareInviteLink = async () => {
    try {
      await Share.share({
        title: "Join Women Rider with my referral",
        message: `Use my referral code ${refCode} when you sign up on Women Rider!\n\nInstall app: ${createInstallLink()}`,
        url: createInstallLink(),
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share invite link");
    }
  };

  // Copy referral link to clipboard
  const copyReferralLink = async () => {
    await Clipboard.setStringAsync(
      `${createInstallLink()} (Use code: ${refCode})`
    );
    Alert.alert("Copied!", "Referral link copied to clipboard");
  };

  return (
    <LinearGradient
      colors={["#fff", "#fff5f9"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.card}
    >
      <Text style={styles.title}>How It Works</Text>

      {howItWorksData.map((item, index) => (
        <View key={index} style={styles.textCard}>
          <item.icon
            name={item.iconName}
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.text}>{item.text}</Text>
        </View>
      ))}

      <InviteBtn
        text="Invite Via WhatsApp"
        icon={<FontAwesome name="whatsapp" size={24} color="green" />}
        onclick={shareOnWhatsApp}
      />

      <InviteBtn
        text="Share Referral Link"
        icon={<FontAwesome5 name="share-square" size={24} color="black" />}
        onclick={shareInviteLink}
      />

      <InviteBtn
        text="Copy Referral Link"
        icon={<FontAwesome5 name="copy" size={24} color="gray" />}
        onclick={copyReferralLink}
      />
    </LinearGradient>
  );
};

export default memo(InviteCard); // Prevent unnecessary re-renders

const howItWorksData = [
  {
    icon: Fontisto,
    iconName: "share-a",
    text: "Share the referral link with your friend.",
  },
  {
    icon: FontAwesome,
    iconName: "shopping-bag",
    text: "After your friend completes 3 orders Your referal count will increase by one.",
  },
  {
    icon: FontAwesome,
    iconName: "rupee",
    text: "Upon 10 successful referrals, you earn 100.",
  },
];

const styles = StyleSheet.create({
  card: {
    backgroundColor: "red",
    padding: 20,
    // gap: 10,
    borderRadius: 30,
    position: "relative",
    bottom: 90,
    width: "95%",
    left: 8,
    height: 380,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: fonts.robotoSemiBold,
  },
  textCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    gap: 12,
  },
  icon: {
    width: 30,
    textAlign: "center",
  },
  text: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fonts.robotoRegular,
  },
});
