import React from "react";
import { View, ImageBackground, ScrollView, StyleSheet } from "react-native";

import backgroundImg from "../../assets/background.png";

const GesturesLayout = ({ children }) => {
  return (
    <ImageBackground
      source={backgroundImg}
      style={styles.background}
      testID="backgroundImage"
    >
      <ScrollView style={styles.container}>
        {children}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
});

export default GesturesLayout;
