import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../Screens/HomeScreen";
// import GestureScreen from "../Screens/GestureScreen";
// import PanScreen from "../Screens/PanSCreen";
//import VoiceRecognitionScreen from "../Screens/VoiceRecognitionScreen";
// import AudioPlaybackScreen from "../Screens/AudioPlaybackScreen";
// import TestScreen from "../Screens/testScreen";
import AudioRecordScreen from "../Screens/AudioRecordScreen";
import AudioListScreen from "../Screens/AudioListScreen";
import SongsScreen from "../Screens/SongScreen";
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AudioRecord" component={AudioRecordScreen} />
      <Stack.Screen name="AudioList" component={AudioListScreen} />
      <Stack.Screen name="Songs" component={SongsScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
