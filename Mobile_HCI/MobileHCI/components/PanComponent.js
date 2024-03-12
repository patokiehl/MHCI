import React, { useRef } from 'react';
import { Animated, View, StyleSheet, PanResponder } from 'react-native';
import * as Speech from 'expo-speech';

// Accept navigation or custom callback props
const PanComponent = ({ onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const resetPosition = () => {
    Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false
    }).start();
};

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => {
        Speech.speak("button on");
        return true;
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx > 60) {
          onSwipeRight?.();
        } else if (gestureState.dx < -60) {
          onSwipeLeft?.();
        } else if (gestureState.dy < -60) {
          onSwipeUp?.();
        } else if (gestureState.dy > 60) {
          onSwipeDown?.();
        }
        pan.flattenOffset();
        resetPosition();
        Speech.speak("Gesture complete");
      },
    })
  ).current;

  

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: pan.getTranslateTransform(),
        }}
        {...panResponder.panHandlers}
      >
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
  draggableButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'red',
  },
});

export default PanComponent;
