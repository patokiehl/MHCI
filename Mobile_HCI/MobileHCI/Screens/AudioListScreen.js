// ListenToRecordingsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech'

import { connectToDatabase, fetchRecordings } from '../database/audioRecordingsDB';
import PanGestureComponent from '../components/PanComponents/PanGestureComponent'; 
import { playMorseVibrationHaptic } from "../components/MorseCode/MorseCodePlayerComponent"
import HomeLayout from '../components/Layout/HomeLayout';


Speech.speak("Audio Listening page");
connectToDatabase();

const formatDuration = (durationMillis) => {
  const minutes = Math.floor(durationMillis / 60000);
  const seconds = Math.round((durationMillis % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const ListenToRecordingsScreen = ({navigation}) => {
  const [recordings, setRecordings] = useState([]);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    Speech.speak("Audio Listening page");
    playMorseVibrationHaptic('C');
    fetchRecordings().then((data) => {
      const limit_data = data.slice(-6);
      setRecordings(limit_data);
      const count = limit_data.length;
      Speech.speak(`You have ${count} recordings.`);
    }).catch(console.error);
  }, []);

  const playSound = async (uri) => {
    const { sound } = await Audio.Sound.createAsync({ uri });
    setSound(sound);

    await sound.playAsync();
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const handleGesture = (gesture) => {
    if (gesture === 'swipeDown') {
        navigation.navigate("Home");
        return;
    }

    const recordingIndexMap = {
        swipeLeft: 0,
        swipeRight: 1,
        swipeUp: 2,
        doubleTap: 3,
        tripleTap: 4,  
        longPress: 5
    };

    const recordingIndex = recordingIndexMap[gesture];
    if (recordingIndex !== undefined && recordings.length > recordingIndex) {
        playSound(recordings[recordingIndex].uri);
    }
};

const getGestureText = (index) => {
  const gestures = ['(Swipe Left)', '(Swipe Right)', '(Swipe Up)', '(Double Tap)', '(Triple Tap)', '(Long Press)'];
  return gestures[index] || '';
};



return (
  <HomeLayout navigation={navigation}>
  <View style={styles.container}>
      <View style={styles.recordingsContainer}>
          {recordings.map((recording, index) => (
              <View key={index} style={styles.recordingItem}>
                  <Text style={styles.recordingTitle}>{index + 1}: {recording.title} {getGestureText(index)}</Text>
              </View>
          ))}
      </View>
      <PanGestureComponent
          onSwipeLeft={() => handleGesture('swipeLeft')}
          onSwipeRight={() => handleGesture('swipeRight')}
          onSwipeUp={() => handleGesture('swipeUp')}
          onSwipeDown={() => handleGesture('swipeDown')}
          onDoubleTap={() => handleGesture('doubleTap')}
          onTripleTap={() => handleGesture('tripleTap')}
          onLongPress={() => handleGesture('longPress')}
      />
  </View>
  </HomeLayout>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListenToRecordingsScreen;
