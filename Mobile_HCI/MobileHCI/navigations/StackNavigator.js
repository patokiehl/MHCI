import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../Screens/HomeScreen";
import GestureScreen from "../Screens/GestureScreen";
import PanScreen from "../Screens/PanSCreen";
//import VoiceRecognitionScreen from "../Screens/VoiceRecognitionScreen";
import AudioPlaybackScreen from "../Screens/AudioPlaybackScreen";
import TestScreen from "../Screens/testScreen";
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Gestures" component={GestureScreen} />
      <Stack.Screen name="Pan" component={PanScreen} />
      <Stack.Screen name="Audio" component={AudioPlaybackScreen} />
      <Stack.Screen name="Test" component={TestScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
