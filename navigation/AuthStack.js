import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Screens/Auth/Login/Login";
import SignUp from "../Screens/Auth/SignUp/SignUp";
import Otp from "../Screens/Auth/Otp/Otp";
import AadharVerification from "../Screens/Auth/AadharVerification/AadharVerification";
import DocumentCheck from "../Screens/Auth/DocumentCheck/DocumentCheck";
import MPin from "../Screens/Auth/MPin/MPin";

const Stack = createNativeStackNavigator();

const AuthStack = ({ initialRouteName = "login" }) => {
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="otp"
        component={Otp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="signup"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="documentCheck"
        component={DocumentCheck}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="aadharverification"
        component={AadharVerification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MPin"
        component={MPin}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
