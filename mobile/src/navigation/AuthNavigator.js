import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import SplashScreen from "../screens/auth/SplashScreen"
import LoginScreen from "../screens/auth/LoginScreen"
import ResetPasswordScreen from "../screens/auth/ResetPasswordScreen"

const Stack = createNativeStackNavigator()

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  )
}