// SongsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';

import PanGestureComponent from "../components/PanComponents/PanGestureComponent";
import HomeLayout from '../components/Layout/HomeLayout';
import { playMorseVibrationHaptic } from "../components/MorseCode/MorseCodePlayerComponent"

const songsData = [
  {
    title: "Merk - Gang ",
    uri: require('../assets/songs/song4.mp3'),
  },
  {
    title: "Kingsman - country roads",
    uri: require('../assets/songs/song1.mp3'), 
  },
  {
    title: "Shake the room",
    uri: require('../assets/songs/song2.mp3'), 
  },
  {
    title: "Phoon too much",
    uri: require('../assets/songs/song3.mp3'), 
  },
  {
    title: "undertale euro",
    uri: require('../assets/songs/song5.mp3'), 
  },
  {
    title: "Free oakland",
    uri: require('../assets/songs/song6.mp3'), 
  },
];

const SongsScreen = ({ navigation }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
    const [playMode, setPlayMode] = useState(false);

    useEffect(() => {
        Speech.speak("song screen");
        playMorseVibrationHaptic('D');
    }, []);


    const playSong = async (song) => {
        if (currentSong) {
            await currentSong.sound.setVolumeAsync(1.0);
            await currentSong.sound.stopAsync();
        }

        const { sound } = await Audio.Sound.createAsync(song.uri);
        setCurrentSong({ ...song, sound });
        await sound.playAsync();
        setIsPlaying(true);
        setPlayMode(true); 
    };

    const stopPlaying = async () => {
        if (currentSong && isPlaying) {
            await currentSong.sound.stopAsync();
            setIsPlaying(false);
            setPlayMode(false);
        }
    };
    const selectSongByGesture = (index) => {
        const song = songsData[index];
        if (song) {
            playSong(song);
        }
    };

    const handleGesture = (gesture) => {
        if (playMode) {
            switch (gesture) {
                case 'swipeLeft':
                    //implement skip feature
                    break;
                case 'swipeRight':
                    //implement skip feature
                    break;
                case 'swipeDown':
                    stopPlaying();
                    Speech.speak("out of play mode");
                    break;
                case 'doubleTap':
                    if (isPlaying) {
                        currentSong.sound.pauseAsync();
                    }
                    break;
                case 'tripleTap':
                    if (isPlaying) {
                        currentSong.sound.playAsync();
                    }
                        break;
            }
        } else {
            switch (gesture) {
                case 'swipeLeft':
                    selectSongByGesture(0);
                    break;
                case 'swipeRight':
                    selectSongByGesture(1);
                    break;
                case 'swipeUp':
                    selectSongByGesture(2);
                    break;
                case 'swipeDown':
                    stopPlaying();
                    navigation.navigate('Home');
                    break;
                case 'doubleTap':
                    selectSongByGesture(3);
                    break;
                case 'tripleTap':
                    selectSongByGesture(4);
                    break;
                case 'longPress':
                    selectSongByGesture(5);
                    break;
            }
        }
    };

    const handleSwipeLeft = () => handleGesture('swipeLeft');
    const handleSwipeRight = () => handleGesture('swipeRight');
    const handleSwipeUp = () => handleGesture('swipeUp');
    const handleSwipeDown = () => handleGesture('swipeDown');
    const handleDoubleTap = () => handleGesture('doubleTap');
    const handleTripleTap = () => handleGesture('tripleTap');
    const handleLongPress = () => handleGesture('longPress');

    
    return (
        <HomeLayout navigation={navigation}>
            <View style={styles.container}>
            <PanGestureComponent
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                  onSwipeUp={handleSwipeUp}
                  onSwipeDown={handleSwipeDown}
                  onDoubleTap={handleDoubleTap}
                  onTripleTap={handleTripleTap}
                  onLongPress={handleLongPress}
                />
                <View style={styles.songsContainer}>
                    <View style={styles.songItem}>
                        <Text style={styles.songTitle}>1: {songsData[0].title} (Swipe Left)</Text>
                    </View>
                    <View style={styles.songItem}>
                        <Text style={styles.songTitle}>2: {songsData[1].title} (Swipe Right)</Text>
                    </View>
                    <View style={styles.songItem}>
                        <Text style={styles.songTitle}>3: {songsData[2].title} (Swipe Up)</Text>
                    </View>
                    <View style={styles.songItem}>
                        <Text style={styles.songTitle}>4: {songsData[3].title} (Double Tap)</Text>
                    </View>
                    <View style={styles.songItem}>
                        <Text style={styles.songTitle}>5: {songsData[4].title} (Triple Tap)</Text>
                    </View>
                    <View style={styles.songItem}>
                        <Text style={styles.songTitle}>6: {songsData[5].title} (Long Press)</Text>
                    </View>
                </View>
            </View>
    </HomeLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    songsContainer: {
        marginTop: -100,
    },
    songItem: {
        margin: 10,
    },
    songTitle: {
        fontSize: 16,
    },
});

export default SongsScreen;