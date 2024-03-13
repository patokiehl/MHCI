// AudioListScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const AudioListScreen = () => {
  const [recordings, setRecordings] = useState([]);

  const playRecording = async (uri) => {
    const { sound } = await Audio.Sound.createAsync({ uri });
    await sound.playAsync();
  };

  const addRecording = (newUri) => {
    setRecordings([...recordings, newUri]);
  };

  useEffect(() => {
    // This is where you would load recordings from your "database"
    // For this example, we're just using local state
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={recordings}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.paragraph}>{item}</Text>
            <Button title="Play" onPress={() => playRecording(item)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
  },
  row: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  paragraph: {
    marginRight: 15,
  },
});

export default AudioListScreen;
