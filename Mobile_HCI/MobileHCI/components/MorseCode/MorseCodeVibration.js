import { Vibration } from 'react-native';

const morseCode = {
    'A': '.-',   'B': '-...', 'C': '-.-.', 'D': '-..',
    'E': '.',    'F': '..-.'
};

const dotDuration = 300;  // Duration of a dot vibration
const dashDuration = 900; // Duration of a dash vibration
const pauseDuration = 300; // Pause duration between dots and dashes

const playMorseVibration = (letter) => {
    const dotsAndDashes = morseCode[letter.toUpperCase()];
    if (!dotsAndDashes) return;

    //console.log(`Playing Morse for ${letter}: ${dotsAndDashes}`);

    let totalTime = 0;
    dotsAndDashes.split('').forEach(symbol => {
        setTimeout(() => {
            //console.log(`Vibrating for ${symbol === '.' ? 'dot' : 'dash'}`);
            Vibration.vibrate(symbol === '.' ? dotDuration : dashDuration);
        }, totalTime);

        totalTime += (symbol === '.' ? dotDuration : dashDuration) + pauseDuration;
    });
};

export { playMorseVibration };
