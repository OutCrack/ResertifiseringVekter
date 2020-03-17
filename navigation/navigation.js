import React from "react";
import { Platform, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MainScreen from "../screens/MainScreen";
import PracticeScreen from "../screens/PracticeScreen";
import ExamFinishedScreen from "../screens/examFinishedScreen";

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen
          name="Practice"
          component={PracticeScreen}
          options={{
            title: "Prøveeksamen",
            headerRight: () => (
              <Button
                onPress={() => alert("This is a button!")}
                title="Lever Prøven"
                disabled={true}
                // color="#fff"
              />
            )
          }}
        />
        <Stack.Screen name="ExamFinished" component={ExamFinishedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
