import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Touchable, AsyncStorage  } from 'react-native';
//import AsyncStorage from '../node_modules/@react-native-async-storage';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { setStatusBarTranslucent } from 'expo-status-bar';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';

// TODO: remove refs (fixed em)

class AdminScreen extends Component {
  constructor(props : any) {
    super(props);
    //this.balanceRef = React.createRef();
    //this.vibrationRef = React.createRef();
    this.state = {
      balance: "",
      balanceNew: "",
      vibration: "",
      vibrationNew: ""
    }
  }

  save = async() => {
    try {
      await AsyncStorage.setItem("MyBalance", this.state.balanceNew)
      await AsyncStorage.setItem("MyVibration", this.state.vibrationNew)
      console.warn("saved");
      ("Saved :)")
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

      if (balance !== null){
        this.setState({balance: balance});
      }

      if (vibration !== null){
        this.setState({vibration: vibration})
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
        <Text style={styles.title}>Balance</Text>
        <TextInput defaultValue={this.state.balance} keyboardType="numeric" style={styles.input} onChangeText={(text) => this.setState({balanceNew: text}) }/>

        <Text style={styles.title}>Vibration in ms</Text>
        <TextInput defaultValue={this.state.vibration} keyboardType="numeric" style={styles.input} onChangeText={(text) => this.setState({vibrationNew: text}) }/>

        <TouchableOpacity onPress={() => this.save()} style={styles.button}>
          <Text style={{ color: 'white' }}>Save settings</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
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

  },
  button: {
    backgroundColor: Colors.light.tint,
    color: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingVertical: 8,
    paddingHorizontal: 86,
    borderRadius: 5,
    marginTop: 20
  }
});
