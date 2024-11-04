import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useEffect, useState } from "react";
import AuthenticatedStack from "./AuthenticatedStack";
import AuthStack from "./AuthStack";
import { useDispatch, useSelector } from "react-redux";
import { loadToken } from "../redux/Features/Auth/LoginSlice";
import { Text } from "react-native";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const dispatch = useDispatch();
  const { token, loading } = useSelector((state) => state.token);
  console.log("token", token);
  useEffect(() => {
    dispatch(loadToken());
  }, [dispatch]);

  if (loading) {
    return <Text>Loading</Text>;
  }

  return (
    <NavigationContainer>
      {token ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainNavigation;
