import { View, Text, StyleSheet, Alert, Share } from "react-native";
import React, { memo, useCallback, useMemo } from "react";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import InviteBtn from "./InviteBtn";
import { Linking } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { fonts } from "../../../../fonts/Fonts";

const InviteCard = () => {
  const inviteMessage = useMemo(
    () =>
      "Hey! Check out Women Rider. Use my referral code: GOWOR \n https://play.google.com/store/apps/details?id=com.nuhvin.womenrider&hl=en",
    []
  );

  const shareOnWhatsApp = useCallback(() => {
    const url = `whatsapp://send?text=${encodeURIComponent(inviteMessage)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "WhatsApp is not installed on your device.");
    });
  }, [inviteMessage]);

  const shareInviteLink = useCallback(async () => {
    try {
      await Share.share({ message: inviteMessage });
    } catch (error) {
      console.error(error.message);
    }
  }, [inviteMessage]);

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
    text: "After your friend places their first order, you get 20% off up to 200 on your next order.",
  },
  {
    icon: FontAwesome,
    iconName: "rupee",
    text: "Upon 10 successful referrals, you earn 500.",
  },
];

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
