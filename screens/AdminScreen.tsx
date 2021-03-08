import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Touchable, AsyncStorage  } from 'react-native';
//import AsyncStorage from '../node_modules/@react-native-async-storage';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { setStatusBarTranslucent } from 'expo-status-bar';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';

class AdminScreen extends Component {
  constructor(props : any) {
    super(props);
    this.balanceRef = React.createRef();
    this.state = {
      balance: "",
      balanceNew: ""
    }
  }

  save = async() => {
    try {
      await AsyncStorage.setItem("MyBalance", this.state.balanceNew)
    }catch (err){
      alert(err)
    }
    this.balanceRef.current.clear();
  }

  remove = async() => {
    try {
      await AsyncStorage.removeItem("MyBalance")
    }catch (err){
      alert(err)
    }finally {
      this.setState({balance: "0"});
    }
    this.balanceRef.current.clear();
  }

  load = async() => {
    try {
      let balance = await AsyncStorage.getItem("MyBalance");

      if (balance !== null){
        this.setState({balance: balance});
      }
    }catch(err){
      alert(err)
    }
  }

   componentDidMount(){
    this.load();
  }

  componentDidUpdate(){
    this.load();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Balance</Text>
        <Text>{this.state.balance}</Text>

        <TextInput keyboardType="numeric" ref={this.balanceRef} style={styles.input} onChangeText={(text) => this.setState({balanceNew: text}) }/>

        <TouchableOpacity onPress={() => this.save()} style={styles.button}>
          <Text style={{ color: 'white' }}>Save settings</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.remove()} style={styles.button}>
          <Text style={{ color: 'white' }}>Remove settings</Text>
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
    marginVertical: 20,
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
