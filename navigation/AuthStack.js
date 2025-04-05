import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Login from "../Screens/Auth/Login/Login";
// import SignUp from "../Screens/Auth/SignUp/SignUp";
// import Otp from "../Screens/Auth/Otp/Otp";
import AadharVerification from "../Screens/Auth/AadharVerification/AadharVerification";
import DocumentCheck from "../Screens/Auth/DocumentCheck/DocumentCheck";
import MPin from "../Screens/Auth/MPin/MPin";
import LoginScreen from "../app/wor/features/auth/Screens/LoginScreen";
import OtpScreen from "../app/wor/features/auth/Screens/OtpScreen";
import SignupScreen from "../app/wor/features/auth/Screens/SignupScreen";
import ChatBot from "../app/wor/features/DrawerScreens/RideHistory/Screens/ChatBot";
// import FQs from "../app/wor/features/auth/Components/F&Qa";
import FandQsScreen from "../app/wor/features/auth/Screens/FandQsScreen";

const Stack = createNativeStackNavigator();

const AuthStack = ({ initialRouteName = "login" }) => {
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name="login"
        // component={Login}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="otp"
        // component={Otp}
        component={OtpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="signup"
        // component={SignUp}
        component={SignupScreen}
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

      <Stack.Screen
        name="ChatBot"
        component={ChatBot}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="FQs"
        component={FandQsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
