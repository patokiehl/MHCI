import React, { useState, useRef } from "react";
import { View, TouchableOpacity, Text, StyleSheet, PanResponder, Animated, Dimensions } from "react-native";
import * as Speech from 'expo-speech';

import HomeLayout from "../components/Layout/HomeLayout";

const GestureScreen = ({ navigation }) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      //onPanResponderGrant() =>
      
      onPanResponderMove: (event, gestureState) => {
        pan.x.setValue(gestureState.dx + pan.x._offset);
        pan.y.setValue(gestureState.dy + pan.y._offset);
      },
      
      onPanResponderRelease: (e, gestureState) => {
        pan.flattenOffset();
        // Determine the swipe gestures
        if (gestureState.dx > 20) {
          navigation.navigate('Home'); // Swipe right
        } else if (gestureState.dx < -20) {
          navigation.navigate('Home'); // Swipe left
        } else if (gestureState.dy < -30) {
          navigation.navigate('Home'); // Swipe up
        } else if (gestureState.dy > 30) {
          navigation.navigate('Home'); // Swipe down
        }

        pan.flattenOffset();
      }
    })
  ).current;

  // Handle button press
  const handlePress = () => {
    // Wake the button or handle a tap
    Speech.speak("Button activated");
    // Reset button position to the center of the screen
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();
  };

  const window = Dimensions.get('window')
  console.log(window.height);
  console.log(window.width);
  return (
    <HomeLayout navigation={navigation}>
      <View style={styles.container}>

        {/* Draggable button */}
        <Animated.View 
          style={[styles.draggableButton, {
            // Override the position for the initial render
            top: window.height / 2 - 160, // half of the screen height minus half of the button height
            left: window.width / 2 - 100, // half of the screen width minus half of the button width
            transform: pan.getTranslateTransform(), // allows the button to be dragged
          }]}
          {...panResponder.panHandlers}
        >
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.buttonText}>Drag or Tap</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </HomeLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // This will make sure the container takes the whole screen
    justifyContent: 'center', // This will center the child horizontally
    alignItems: 'center', // This will center the child vertically
  },
  draggableButton: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  },
});

export default GestureScreen;
