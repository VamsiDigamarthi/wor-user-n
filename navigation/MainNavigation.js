import { NavigationContainer, useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import AuthenticatedStack from "./AuthenticatedStack";
import AuthStack from "./AuthStack";
import { Image, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Notifications from "expo-notifications";

import {
  noToken,
  setIsLogin,
  setToken,
} from "../redux/Features/Auth/LoginSlice";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const dispatch = useDispatch();

  const { token, loading } = useSelector((state) => state.token);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          console.log("token found");
          dispatch(setToken(JSON.parse(token)));
        } else {
          console.log("no token");
          dispatch(noToken(false));
        }
      } catch (error) {
        console.error("Error reading token", error);
      } finally {
        // setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingCard}>
        <Image
          style={styles.loadingImage}
          source={require("../assets/images/logo.png")}
        />
      </View>
    );
  }

  return (
    <NavigationContainer >
      <Stack.Navigator
        initialRouteName={token ? "AuthenticatedStack" : "AuthStack"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="AuthenticatedStack"
          component={AuthenticatedStack}
          // initialParams={{ isLogin }}
          initialRouteName="DrawerNavigator"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          initialRouteName="login"
          // initialParams={{ isLogin }}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({
  loadingCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
