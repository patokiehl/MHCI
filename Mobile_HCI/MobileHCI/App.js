import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigations/StackNavigator";

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'new NativeEventEmitter()', // Ignore specific warnings by their text
  'Exponent.speakingStarted',
  'Exponent.speakingWillSayNextString',
  'Exponent.speakingDone',
]);



export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
