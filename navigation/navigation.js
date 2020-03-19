import React from "react";
import { Platform, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import PracticeScreen from "../screens/PracticeScreen";
import ExamFinishedModal from "../screens/examFinishedScreen";

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

const MainStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Practice"
        component={PracticeScreen}
        options={{
          title: "Prøveeksamen"
        }}
      />
    </Stack.Navigator>
  );
};

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Modal"
          component={ExamFinishedModal}
          options={{ headerLeft: null }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
