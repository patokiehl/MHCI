import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Slider } from 'react-native';

const tracks = [
  { id: 1, name: 'Track 1' },
  { id: 2, name: 'Track 2' },
  { id: 3, name: 'Track 3' },
  { id: 4, name: 'Track 4' },
  { id: 5, name: 'Track 5' },
];

const AudioPlaybackScreen = () => {
  const [activeTrack, setActiveTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (trackId) => {
    setActiveTrack(trackId);
    setIsPlaying(true);
    // Implement actual audio playback logic here
  };

  const pauseTrack = () => {
    setIsPlaying(false);
    // Implement actual audio pause logic here
  };

  return (
    <View style={styles.container}>
      {tracks.map((track) => (
        <View key={track.id} style={styles.track}>
          <Text style={styles.trackName}>{track.name}</Text>
          <Button
            title={isPlaying && activeTrack === track.id ? 'Pause' : 'Play'}
            onPress={() => isPlaying && activeTrack === track.id ? pauseTrack() : playTrack(track.id)}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  track: {
    margin: 10,
    alignItems: 'center',
  },
  trackName: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default AudioPlaybackScreen;
