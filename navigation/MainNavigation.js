import { NavigationContainer } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import AuthenticatedStack from "./AuthenticatedStack";
import AuthStack from "./AuthStack";
import { Text } from "react-native";

const MainNavigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error reading token", error);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainNavigation;
