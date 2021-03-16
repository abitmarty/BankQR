import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Touchable, AsyncStorage  } from 'react-native';
//import AsyncStorage from '../node_modules/@react-native-async-storage';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { setStatusBarTranslucent } from 'expo-status-bar';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import HapticSound from '../components/HapticSound';

class AdminScreen extends Component {
  constructor(props : any) {
    super(props);
    //this.balanceRef = React.createRef();
    //this.vibrationRef = React.createRef();
    this.state = {
      balance: "",
      balanceNew: "",
      vibration: "",
      vibrationNew: "",
      vibrationFunc: "",
      vibrationFuncNew: ""
    }
  }

  save = async() => {
    let saveBalance = true;
    let saveVibration = true;
    let saveVibFunc = true;
    if (this.state.balanceNew == ""){
      saveBalance = false;
    }
    if (this.state.vibrationNew == ""){
      saveVibration = false;
    }
    if(this.state.vibrationFuncNew == ""){
      saveVibFunc = false;
    }
    try {
      if (saveBalance){
        await AsyncStorage.setItem("MyBalance", this.state.balanceNew)
      }
      if (saveVibration){
        await AsyncStorage.setItem("MyVibration", this.state.vibrationNew)
      }
      if(saveVibFunc){
        await AsyncStorage.setItem("MyVibrationFunction", this.state.vibrationFuncNew)
      }
      console.warn("saved");
    }catch (err){
      alert(err)
    }
    //this.balanceRef.current.clear();
    //this.vibrationRef.current.clear();
  }

  load = async() => {
    try {
      let balance = await AsyncStorage.getItem("MyBalance");
      let vibration = await AsyncStorage.getItem("MyVibration");
      let vibrationFunc = await AsyncStorage.getItem("MyVibrationFunction");

      if (balance !== null){
        this.setState({balance: balance});
      }

      if (vibration !== null){
        this.setState({vibration: vibration})
      }

      if (vibrationFunc !== null){
        this.setState({vibrationFunc: vibrationFunc})
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
        <Text style={[styles.title, styles.balance]}>Balance</Text>
        <TextInput defaultValue={this.state.balance} keyboardType="numeric" style={styles.input} onChangeText={(text) => this.setState({balanceNew: text}) }/>

        <Text style={styles.title}>Vibration in ms</Text>
        <TextInput defaultValue={this.state.vibration} keyboardType="numeric" style={styles.input} onChangeText={(text) => this.setState({vibrationNew: text}) }/>

        <Text style={styles.title}>Vibration function</Text>
        <Text style={styles.subTitle}>Vibration ms = vibrationUs, Amount = dataGb</Text>
        <TextInput defaultValue={this.state.vibrationFunc} style={styles.input} onChangeText={(text) => this.setState({vibrationFuncNew: text}) }/>

        <Text style={styles.title}>Select a sound</Text>
        <HapticSound />

        <TouchableOpacity onPress={() => this.save()} style={styles.button}>
          <Text style={styles.buttontext}>Save settings</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default AdminScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  balance: {
    marginTop: 15,
  },
  subTitle: {
    fontSize: 12,
    fontWeight: 'normal',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.tint,
    alignSelf: 'stretch',
    marginHorizontal: 52,
    marginVertical: 10,
    height: 44,
    borderRadius: 5,
    paddingLeft: 8,
  },
  button: {
    backgroundColor: Colors.light.tint,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingVertical: 8,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttontext: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  }
});
