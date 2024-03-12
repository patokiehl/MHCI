import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

import GesturesLayout from "../Layout/GesturesLayout";

const GesturesScreen = ({ navigation }) => {
  const handlePress = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <GesturesLayout navigation={navigation}>
      <View style={styles.container}>


        {/* Containers for the buttons on the left and right */}
        <View style={styles.buttonsContainer}>
          <View style={styles.leftButtonsContainer}>
            <TouchableOpacity
              onPress={() => handlePress('GyroScope input')}
              style={[styles.button, styles.leftButton]}
            >
              <Text style={styles.buttonText}>Pinch me</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePress('Gesture handling')} 
              style={[styles.button, styles.rightButton]}
            >
              <Text style={styles.buttonText}>Force me</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePress('Motion')} 
              style={[styles.button, styles.rightButton]}
            >
              <Text style={styles.buttonText}>Tap me</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.rightButtonsContainer}>
            <TouchableOpacity
              onPress={() => handlePress('Voice Input')}
              style={[styles.button, styles.rightButton]}
            >
              <Text style={styles.buttonText}>Pan me</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePress('Haptics')} 
              style={[styles.button, styles.rightButton]}
            >
              <Text style={styles.buttonText}>Fling me</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePress('Vibrations')} 
              style={[styles.button, styles.rightButton]}
            >
              <Text style={styles.buttonText}>Long press me</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Container for the 'Home button */}
        <View style={styles.resetButtonContainer}>
          <TouchableOpacity
            onPress={() => handlePress('Home')}
            style={[styles.button, styles.resetButton]}
          >
            <Text style={styles.buttonText}>home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GesturesLayout>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 20,
    },
    buttonsContainer: {
      flex: 1, // Make the container take the available space
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      alignItems: 'stretch', // Stretch the child components to fill the container
    },
    leftButtonsContainer: {
      flex: 1, // Take half of the horizontal space
      marginRight: 30,
      marginLeft: -15,
    },
    rightButtonsContainer: {
      flex: 1, // Take the other half of the horizontal space
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
      paddingVertical: 20, // Increase vertical padding to make the button taller
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20, // Increase space between buttons
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
      fontSize: 18,
      fontWeight: "bold",
    },
  });
  
export default GesturesScreen;
