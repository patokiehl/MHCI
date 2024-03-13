import React, {useRef} from 'react';
import {Animated, View, StyleSheet, PanResponder, Text} from 'react-native';
import * as Speech from 'expo-speech';


const PanScreen = ({ navigation }) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
            Speech.speak("button on");
            return true;
        },
        
      onPanResponderMove: (event, gestureState) => {
        pan.x.setValue(gestureState.dx + pan.x._offset);
        pan.y.setValue(gestureState.dy + pan.y._offset);
      },
      
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx > 60) {
            navigation.navigate('Home'); // Swipe right
            console.log("went right");
            Speech.speak("Going Home")
          } else if (gestureState.dx < -60) {
            navigation.navigate('Gestures'); // Swipe left
            console.log("went left");
            Speech.speak("Going Home")
          } else if (gestureState.dy < -60) {
            navigation.navigate('Audio'); // Swipe up
            console.log("went up");
            Speech.speak("Going Home")
          } else if (gestureState.dy > 60) {
            navigation.navigate('Test'); // Swipe down
            console.log("went down");
            Speech.speak("Going Home")
          }
        pan.extractOffset();
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Drag this box!</Text>
      <Animated.View
        style={{
          transform: [{translateX: pan.x}, {translateY: pan.y}],
        }}
        {...panResponder.panHandlers}>
        <View style={styles.draggableButton} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  draggableButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'red',
  },
});

export default PanScreen;