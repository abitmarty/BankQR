import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import { Audio } from 'expo-av';
import styles from './styles';

const HapticSound = (props) => {
  const [sound, setSound] = React.useState();
  const [selectedSound, setselectedSound] = React.useState("");

  const changeSoundValue = (itemValue, itemIndex) => {
    setselectedSound(itemValue)
  }

  function selectSoundSource() {
    switch (selectedSound) {
      case 'applepay':
          return require('../../assets/sounds/applepay.mp3');
      case 'googlepay':
          return require('../../assets/sounds/googlepay.mp3');
      case '':
          console.log('No sound selected.')
          break;  
    }
  }

  async function playSound() {
    console.log('Loading Sound', selectedSound);
    const { sound } = await Audio.Sound.createAsync(
      selectSoundSource()
      // require('../../assets/sounds/googlepay.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={playSound} style={styles.button}>
          <Text style={styles.buttontext}>Play demo</Text>
        </TouchableOpacity>

        <Picker
          selectedValue={selectedSound}
          style={[styles.picker, { height: 50, width: 200 }]}
          onValueChange={
            changeSoundValue
          }>
          <Picker.Item label="Choose a sound..." value="" color="black"/>
          <Picker.Item label="Apple pay" value="applepay" color="black"/>
          <Picker.Item label="Google pay" value="googlepay" color="black"/>
          
        </Picker>
    </View>
  );
};

export default HapticSound;
