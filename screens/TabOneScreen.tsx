import React, { useState, useEffect, Component  } from 'react';
import { Button, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';
//import { NavigationScreenProps } from 'react-navigation';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { setStatusBarTranslucent } from 'expo-status-bar';

// interface Props {
//  navigation: any
// }
//class TabOne extends React.Component<Props> {


class TabOne extends React.Component {
  constructor(props : any) {
    super(props);
    this.state = {
      balancest: "",
    }
  }

  load = async() => {
    try {
      let balance = await AsyncStorage.getItem("MyBalance");

      if (balance !== null){
        this.setState({ balancest: balance })
      } else{
        this.setState({ balancest: '0' })
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
        <Text style={styles.title}>{this.state.balancest}</Text>
    </View>
    );
  }
};

export default TabOne;

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
  button: {
    backgroundColor: 'red',
    color: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingVertical: 8,
    paddingHorizontal: 86,
    borderRadius: 5,
    marginTop: 20
  },
});
