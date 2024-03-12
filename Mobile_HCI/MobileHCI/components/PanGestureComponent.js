import React, { useState, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { PanGestureHandler, TapGestureHandler, LongPressGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Speech from 'expo-speech';

const PanGestureComponent = ({ onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const doubleTapRef = useRef();
  const tripleTapRef = useRef();
  const [tapCount, setTapCount] = useState(0);

  const resetPosition = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false
    }).start();
  };

  const handlePanGesture = Animated.event(
    [{ nativeEvent: { translationX: pan.x, translationY: pan.y } }],
    { useNativeDriver: false }
  );

  const handleSingleTap = () => {
    console.log("Single tap detected");
    // Single tap specific logic
  };

  const handleDoubleTap = () => {
    console.log("Double tap detected");
    // Double tap specific logic
  };

  const handleTripleTap = () => {
    Speech.speak("Triple tap detected");
    console.log("triple tap detected");
    // Triple tap specific logic
  };

  const handleLongPress = () => {
    console.log("Long press detected");
    // Long press specific logic
  };

  const onSingleTapEvent = (event) => {
    if (event.nativeEvent.state === State.END) {
      setTimeout(() => {
        if (tapCount === 1) {
          handleSingleTap();
        }
        setTapCount(0);
      }, 300); // Wait for possible subsequent taps
      setTapCount(tapCount + 1);
    }
  };

  const onDoubleTapEvent = (event) => {
    if (event.nativeEvent.state === State.END) {
      handleDoubleTap();
    }
  };

  const onTripleTapEvent = (event) => {
    if (event.nativeEvent.state === State.END) {
      handleTripleTap();
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <View style={styles.container}>
      <PanGestureHandler
        onGestureEvent={handlePanGesture}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.END) {
            if (nativeEvent.translationX > 60) {
              onSwipeRight?.();
            } else if (nativeEvent.translationX < -60) {
              onSwipeLeft?.();
            } else if (nativeEvent.translationY < -60) {
              onSwipeUp?.();
            } else if (nativeEvent.translationY > 60) {
              onSwipeDown?.();
            }
            resetPosition();
            Speech.speak("PanGestureHandler Gesture complete");
          }
        }}
      >
        <Animated.View style={{ transform: pan.getTranslateTransform() }}>
          <LongPressGestureHandler
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.ACTIVE) {
                handleLongPress();
              }
            }}
            minDurationMs={800}
          >
            <TapGestureHandler
              ref={doubleTapRef}
              numberOfTaps={2}
              onHandlerStateChange={onDoubleTapEvent}
              waitFor={tripleTapRef}
            >
              <TapGestureHandler
                ref={tripleTapRef}
                numberOfTaps={3}
                onHandlerStateChange={onTripleTapEvent}
              >
                <TapGestureHandler
                  onHandlerStateChange={onSingleTapEvent}
                  waitFor={[doubleTapRef, tripleTapRef]}
                >
                  <View style={styles.draggableButton} />
                </TapGestureHandler>
              </TapGestureHandler>
            </TapGestureHandler>
          </LongPressGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </View>
    </GestureHandlerRootView>
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

export default PanGestureComponent;
