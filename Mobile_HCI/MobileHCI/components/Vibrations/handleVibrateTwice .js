import Vibration from 'react-native';

const  handleVibrateTwice  = () => {

    // Vibrate once
    Vibration.vibrate();

    // Wait for 200 milliseconds and then vibrate again
    setTimeout(() => {
      Vibration.vibrate();
    }, 200);
}
export default handleVibrateTwice 