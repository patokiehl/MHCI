// import * as Speech from 'expo-speech';

// class SpeechManager {
//     constructor() {
//         Speech.speak("Initializing speech..."); // Example initialization speech

//         // Set up global event listeners for speech
//         Speech.speechEventSubscription = Speech.addListener(
//             'didFinish',
//             this.handleSpeechFinish
//         );

//         // Add more listeners as needed
//     // }

//     speak(text) {
//         Speech.speak(text);
//     }

//     handleSpeechFinish = ({ utteranceId }) => {
//         console.log(`Finished speaking ${utteranceId}`);
//     }

//     // Make sure to clean up listeners when they are no longer needed
//     cleanup() {
//         Speech.speechEventSubscription.remove();
//     }
// }

// const speechManager = new SpeechManager();
// export default speechManager;
