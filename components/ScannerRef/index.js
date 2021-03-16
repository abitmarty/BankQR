import React, { useState, useEffect } from 'react';
import { Keyboard, TouchableOpacity, Alert, Text, View, StyleSheet, Button, Vibration } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';  
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 


const ScannerRef = (props) => {
  const navigation = useNavigation(); 
    return (
        <View>
        <TouchableOpacity onPress={() => Keyboard.dismiss()} >
          <FontAwesome name="close" size={24} color="white" />
        </TouchableOpacity>
        </View>
    )
}

export default ScannerRef;