import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Alert, Text, View, StyleSheet, Button, Vibration } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';  
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


const ScannerRef = (props) => {
  const navigation = useNavigation(); 
    return (
        <View>
        <TouchableOpacity onPress={() => navigation.navigate('Scanner')} >
          <Ionicons name="scan-outline" size={24} color="white" />
        </TouchableOpacity>
        </View>
    )
}

export default ScannerRef;