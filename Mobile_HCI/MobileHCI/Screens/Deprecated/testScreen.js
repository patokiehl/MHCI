import React from "react";
import { View, StyleSheet } from "react-native";
import PanGestureComponent from "../../components/PanComponents/PanGestureComponent";
import HomeLayout from "../../components/Layout/HomeLayout";

const TestScreen = ({ navigation }) => {
  return (
    <HomeLayout navigation={navigation}>
    <View style={styles.containerPan}>
      <PanGestureComponent
        onSwipeRight={() => navigation.navigate('Home')}
        onSwipeLeft={() => navigation.navigate('Gestures')}
        onSwipeUp={() => navigation.navigate('Audio')}
        onSwipeDown={() => navigation.navigate('Test')}
      />
    </View>
    </HomeLayout>
  );
};

const styles = StyleSheet.create({
  containerPan: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TestScreen;
