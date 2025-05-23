import { useNavigation } from "@react-navigation/native";
import { Linking } from "react-native";

export const useCustomerDrawerHook = () => {
  const navigation = useNavigation();
  const openLink = () => {
    const url = "https://nuhvin.com"; // Replace with your desired URL
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const handleItemPress = (itemName) => {
    navigation.navigate(itemName); // Navigate to the corresponding screen
  };
  const worUserAppOpen = () => {
    const url =
      "https://play.google.com/store/apps/details?id=com.nuhvin.worcaptain"; // Replace with your desired URL
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return {
    openLink,
    handleItemPress,
    worUserAppOpen,
  };
};
