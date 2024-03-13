import * as Haptics from 'expo-haptics';

const morseCode = {
    'A': '.-',   'B': '-...', 'C': '-.-.', 'D': '-..',
    'E': '.',    'F': '..-.'
};

const playMorseVibrationHaptic = (letter) => {
    const dotsAndDashes = morseCode[letter.toUpperCase()];
    if (!dotsAndDashes) return;

    let totalTime = 0;
    dotsAndDashes.split('').forEach(symbol => {
        setTimeout(() => {
            if (symbol === '.') {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            } else if (symbol === '-') {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            }
        }, totalTime);
        totalTime += symbol === '.' ? 200 : 600; // Adjust timing for dot and dash
    });
};

export { playMorseVibrationHaptic };
