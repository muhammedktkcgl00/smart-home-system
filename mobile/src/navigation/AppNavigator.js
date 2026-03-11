import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/home/WelcomeScreen";
import HomeOverviewScreen from "../screens/home/HomeOverviewScreen";
import SetSpaceNameScreen from "../screens/home/SetSpaceNameScreen";
import ScheduleCustomDateScreen from "../screens/home/ScheduleCustomDateScreen";
import ScheduleSummaryScreen from "../screens/home/ScheduleSummaryScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="HomeOverview" component={HomeOverviewScreen} />
      <Stack.Screen name="SetSpaceName" component={SetSpaceNameScreen} />
      <Stack.Screen
        name="ScheduleCustomDate"
        component={ScheduleCustomDateScreen}
      />
      <Stack.Screen
        name="ScheduleSummary"
        component={ScheduleSummaryScreen}
      />
    </Stack.Navigator>
  );
}