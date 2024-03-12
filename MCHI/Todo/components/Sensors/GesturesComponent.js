import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
    TapGestureHandler,
    PinchGestureHandler,
    PanGestureHandler,
    RotationGestureHandler,
    LongPressGestureHandler,
    FlingGestureHandler,
    State,
} from 'react-native-gesture-handler';

class GestureComponent extends React.Component {
  onSingleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log('Single tap gesture');
    }
  };

  onDoubleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log('Double tap gesture');
    }
  };

  onPinch = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log('Pinch gesture');
    }
  };

  onPan = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log('Pan gesture');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TapGestureHandler
          onHandlerStateChange={this.onSingleTap}
          numberOfTaps={1}>
          <View style={styles.box}>
            <Text>Tap here</Text>
          </View>
        </TapGestureHandler>

        <TapGestureHandler
          onHandlerStateChange={this.onDoubleTap}
          numberOfTaps={2}>
          <View style={styles.box}>
            <Text>Double Tap here</Text>
          </View>
        </TapGestureHandler>

        <PinchGestureHandler onHandlerStateChange={this.onPinch}>
          <View style={styles.box}>
            <Text>Pinch here</Text>
          </View>
        </PinchGestureHandler>

        <PanGestureHandler onHandlerStateChange={this.onPan}>
          <View style={styles.box}>
            <Text>Pan here</Text>
          </View>
        </PanGestureHandler>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    margin: 10,
  },
});

export default GestureComponent;
