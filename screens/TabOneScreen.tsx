import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { setStatusBarTranslucent } from 'expo-status-bar';

export default function TabOneScreen() { 
  const [balance, setBalance] = useState();

  const load = async() => {
    try {
      let balance = await AsyncStorage.getItem("MyBalance");

      if (balance !== null){
        setBalance(balance)
      }
    }catch(err){
      alert(err)
    }
  }

  useEffect(() => {
    load();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>${balance}</Text>
    </View>
  );
}



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
});
