// AudioRecordScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';

import PanGestureComponent from '../components/PanComponents/PanGestureComponent';
import HomeLayout from '../components/Layout/HomeLayout';
import speechManager from '../components/SpeechManager';
import { playMorseVibrationHaptic } from "../components/MorseCode/MorseCodePlayerComponent"

import {saveRecordingToDatabase } from '../database/audioRecordingsDB'

const AudioRecordScreen = ({ navigation, route }) => {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const flashingOpacity = useRef(new Animated.Value(0)).current; // For flashing effect

  useEffect(() => {
    Speech.speak("Audio Recording Screen");
    playMorseVibrationHaptic('B');
    (async () => {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        interruptionModeIOS: Audio.interruptionModeIOS = 1,  // Example value
        staysActiveInBackground: true,
    });
    })();
  }, []);

  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(flashingOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
          }),
          Animated.timing(flashingOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
          })
        ])
      ).start();
    } else {
      flashingOpacity.setValue(0);
    }
  }, [isRecording, flashingOpacity]);


  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') return;

      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    setIsRecording(false);
    try {
        const status = await recording.getStatusAsync();
        const duration = status.durationMillis; 
        await recording.stopAndUnloadAsync();
        await saveRecordingToDatabase(recording, duration);

        setRecording(null);
        Speech.speak("Recording saved successfully");
    } catch (error) {
        console.error('Error in stopRecording:', error);
    }
};


  return (
    <HomeLayout navigation={navigation}>
      <View style={styles.container}>
      <Text>Long press the button to start recording, You will feel a vibration and you will see a flashing red bar at the top of your screen.
        and double tap to stop recording</Text>
        <PanGestureComponent
          onLongPress={startRecording}
          onDoubleTap={stopRecording}
          onSwipeDown={() => navigation.navigate('Home')}
        />
         {isRecording && (
          <Animated.View
            style={[styles.flashingBar, { opacity: flashingOpacity }]}
          />
        )}
      </View>
    </HomeLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
 flashingBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 5,
    backgroundColor: 'red',
  },
});

export default AudioRecordScreen;
