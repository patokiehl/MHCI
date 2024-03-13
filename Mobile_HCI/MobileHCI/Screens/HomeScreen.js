import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import * as Speech from 'expo-speech';

import PanGestureComponent from "../components/PanComponents/PanGestureComponent";
import { playMorseVibrationHaptic } from "../components/MorseCode/MorseCodePlayerComponent"
import { playMorseVibration } from "../components/MorseCode/MorseCodeVibration"
import HomeLayout from "../components/Layout/HomeLayout";

// haptics
// gestures
// text to speech
// voice notes
// audio play back

const HomeScreen = ({ navigation }) => {
  const handlePress = (screenName, buttonLabel) => {
    navigation.navigate(screenName);
    //Speech.speak(`You have selected button ${buttonLabel}`);
    //playMorseVibrationHaptic(buttonLabel);
    //playMorseVibration(buttonLabel)
};

Speech.speak("you are on the app");
  

  return (
    <HomeLayout navigation={navigation}>
      <View style={styles.container}>
        {/* Containers for the buttons on the left and right */}
        <Text>This is a simple app with the idea being that once you are comfortable with the features then you will no longer 
          have to look at the screen, to begin with i reccomed using the buttons to navigate around, however soon you will find it more 
          comfortable to navigate using the swipe and touch features, there is a voice that will tell you whenever you have changed screen.

        </Text>
        <View style={styles.buttonsContainer}>
          <View style={styles.leftButtonsContainer}>
            <TouchableOpacity
              onPress={() => handlePress('AudioRecord', 'A')}
              style={[styles.button, styles.leftButton]}
            >
              <Text style={styles.buttonText}>Voice Notes (swipe Left) </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePress('AudioList', 'C')} 
              style={[styles.button, styles.rightButton]}
            >
              <Text style={styles.buttonText}>Stored Audio (swipe up)</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerPan}>
          <PanGestureComponent
              onSwipeRight={() => navigation.navigate('Songs')}
              onSwipeLeft={() => navigation.navigate('AudioList')}
              onSwipeUp={() => navigation.navigate('AudioRecord')}
              onSwipeDown={() => navigation.navigate('Home')}
              />
          </View>
          
          <View style={styles.rightButtonsContainer}>
            <TouchableOpacity
              onPress={() => handlePress('Songs', 'B')}
              style={[styles.button, styles.rightButton]}
            >
              <Text style={styles.buttonText}>Songs(swipe right)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePress('DailyNote', 'D')} 
              style={[styles.button, styles.rightButton]}
            >
              <Text style={styles.buttonText}>Daily Note (double tap)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </HomeLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  containerPan: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'stretch',
  },
  
  leftButtonsContainer: {
    flex: 0.45,
    marginRight: 30,
    marginLeft: -15,
  },
  
  rightButtonsContainer: {
    flex: 0.45, 
    marginLeft: 30,
    marginRight: -15,
  },
  
  resetButtonContainer: {
    alignItems: 'center',
    marginTop: 0,
  },
  
  button: {
    borderRadius: 25,
    marginTop: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  
  sensorButton: {
    backgroundColor: '#A6E1FA',
    width: '80%',
  },
  
  leftButton: {
    backgroundColor: '#6ECB63',
    width: '100%',
    paddingVertical: 35,
  },
  
  rightButton: {
    backgroundColor: '#6ECB63',
    width: '100%',
    paddingVertical: 35,
  },
  
  resetButton: {
    backgroundColor: '#FF6B6B',
    width: '80%',
  },
  
  buttonText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },  
  });
  
export default HomeScreen;
