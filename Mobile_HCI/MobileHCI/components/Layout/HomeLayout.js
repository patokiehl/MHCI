import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";

import backgroundImg from "../../assets/background.png";

const HomeLayout = ({ children }) => {
  return (
    <ImageBackground
      source={backgroundImg}
      style={styles.background}
      testID="backgroundImage"
    >
      <View style={styles.container}>
        {children}
      </View>
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
    justifyContent: 'center', // Center children vertically
    alignItems: 'center', // Center children horizontally
  },
});

export default HomeLayout;
