import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

import HomeLayout from "../components/Layout/HomeLayout";

const HomeScreen = ({ navigation }) => {
  const handlePress = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <HomeLayout navigation={navigation}>
      <View style={styles.container}>
        {/* Container for the 'Test the light sensor' button */}
        <View style={styles.sensorButtonContainer}>
          <TouchableOpacity
            onPress={() => handlePress('Voice')}
            style={[styles.button, styles.sensorButton]}
          >
            <Text style={styles.buttonText}>swipe to activate Voice control</Text>
          </TouchableOpacity>
        </View>

        {/* Containers for the buttons on the left and right */}
        <View style={styles.buttonsContainer}>
          <View style={styles.leftButtonsContainer}>
            <TouchableOpacity
              onPress={() => handlePress('GyroScope input')}
              style={[styles.button, styles.leftButton]}
            >
              <Text style={styles.buttonText}>GyroScope input</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePress('Gestures')} 
              style={[styles.button, styles.rightButton]}
            >
              <Text style={styles.buttonText}>Gestures</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePress('Motion')} 
              style={[styles.button, styles.rightButton]}
            >
              <Text style={styles.buttonText}>Motion</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.rightButtonsContainer}>
            <TouchableOpacity
              onPress={() => handlePress('Voice')}
              style={[styles.button, styles.rightButton]}
            >
              <Text style={styles.buttonText}>Speech to Text</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePress('Haptics')} 
              style={[styles.button, styles.rightButton]}
            >
              <Text style={styles.buttonText}>Haptics</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePress('Vibrations')} 
              style={[styles.button, styles.rightButton]}
            >
              <Text style={styles.buttonText}>Vibrations</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Container for the 'Reset The data' button */}
        <View style={styles.resetButtonContainer}>
          <TouchableOpacity
            onPress={() => handlePress('ToDo App')}
            style={[styles.button, styles.resetButton]}
          >
            <Text style={styles.buttonText}>Todo App</Text>
          </TouchableOpacity>
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
    sensorButtonContainer: {
      alignItems: 'center',
      marginTop: -30,
      marginBottom: 30
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
  
export default HomeScreen;
