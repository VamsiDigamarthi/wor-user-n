import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useState } from "react";
import AuthenticatedStack from "./AuthenticatedStack";
import AuthStack from "./AuthStack";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainNavigation;
