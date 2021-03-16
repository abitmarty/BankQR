import React, { useState, useEffect, Component } from 'react';
import { Text, View, StyleSheet, Button, AsyncStorage } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { Audio } from 'expo-av';
import styles from './styles';


class HapticSound extends Component {
  constructor(props : any) {
    super(props);
    this.state = {
      selectedSound: "",
      sound: ""
    }
  }

  changeSoundValue = (itemValue, itemIndex) => {
    this.setState({selectedSound: itemValue}, () => this.save());
    //this.save();
  }

  playSound = async() => {
    //console.log('Loading Sound', this.state.selectedSound);
    const { sound } = await Audio.Sound.createAsync(
      this.selectSoundSource()
      // require('../../assets/sounds/googlepay.mp3')
    );
    this.setState({sound: sound})

    //console.log('Playing Sound');
    await sound.playAsync();
  }

  selectSoundSource() {
    //console.log("Playing: " + this.state.selectedSound);
    switch (this.state.selectedSound) {
      case 'applepay':
          return require('../../assets/sounds/applepay.mp3');
      case 'googlepay':
          return require('../../assets/sounds/googlepay.mp3');
      case '':
          //console.log('No sound selected.')
          break;  
    }
  }

  save = async() => {
    //console.log("In save: " + this.state.selectedSound);
    try {
      await AsyncStorage.setItem("MySoundSource", this.state.selectedSound)
      //console.log("Saved: " + this.state.selectedSound);
    }catch (err){
      alert(err)
      console.warn("Saving sound went wrong.");
    }
  }

  load = async() => {
    try {
      let soundSource = await AsyncStorage.getItem("MySoundSource");
      //console.log("Load: " + soundSource);
      if (soundSource !== null){
        this.setState({selectedSound: soundSource})
      }
    }catch(err){
      alert(err)
    }
  }

  componentDidMount(){
    this.load();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.playSound} style={styles.button}>
          <Text style={styles.buttontext}>Play demo</Text>
        </TouchableOpacity>

        <Picker
          selectedValue={this.state.selectedSound}
          style={[styles.picker, { height: 50, width: 200 }]}
          onValueChange={
            this.changeSoundValue
          }>
          <Picker.Item label="Choose a sound..." value="" color="black"/>
          <Picker.Item label="Apple pay" value="applepay" color="black"/>
          <Picker.Item label="Google pay" value="googlepay" color="black"/>
          
        </Picker>
    </View>
    );
  }
}

export default HapticSound;
