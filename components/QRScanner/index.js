import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Vibration, AsyncStorage } from 'react-native';
import styles from './styles';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';


const QRScanner = (props) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const navigation = useNavigation(); 
    const [vibrationUs, setVibrationUs]= useState();
    const [balanceUs, setBalanceUs]= useState();
    const [vibrationFunction, setVibrationFunction]= useState();
    const [sound, setSound] = useState();
    const [selectedSound, setselectedSound] = useState("");
    let dataGb = 0;

    const save = async() => {
      try {
        await AsyncStorage.setItem("MyBalance", (parseInt(balanceUs) - dataGb).toString())
      }catch (err){
        alert(err)
      }
    }

    const load = async() => {
      try {
        let vibration = await AsyncStorage.getItem("MyVibration");
        let balance = await AsyncStorage.getItem("MyBalance");
        let vibrationFunct = await AsyncStorage.getItem("MyVibrationFunction");
        let soundSource = await AsyncStorage.getItem("MySoundSource");
  
        if (vibration !== null){
          setVibrationUs(parseInt(vibration));
        } else{ 
          setVibrationUs(parseInt(0));
        }
        if (balance !== null){
          setBalanceUs(parseInt(balance));
        } else {
          setBalanceUs(parseInt(0));
        }
        if (vibrationFunct !== null || vibrationFunct == ""){
          setVibrationFunction(vibrationFunct);
        } else {
          setVibrationFunction("vibrationUs");
        }
        if (soundSource !== null){
          setselectedSound(soundSource);
        } else {
          setselectedSound("");
        }

      }catch(err){
        alert(err)
      }
    }

    useEffect(() => {
      load();
    })

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
      // console.log('Loading Sound', selectedSound);
      const { sound } = await Audio.Sound.createAsync(
        selectSoundSource()
      );
      setSound(sound);
  
      // console.log('Playing Sound');
      await sound.playAsync(); }
  
    // React.useEffect(() => {
    //   return sound
    //     ? () => {
    //         console.log('Unloading Sound');
    //         sound.unloadAsync(); }
    //     : undefined;
    // }, [sound]);
   
   useEffect(() => {
       (async () => {
         const { status } = await BarCodeScanner.requestPermissionsAsync();
         setHasPermission(status === 'granted');
       })();
     }, []);
    
     async function handleBarCodeScanned({ type, data }) {
      setScanned(true);
      await playSound();
      alert(`Payment of €${data} extracted from balance ${balanceUs} successful!`);
      dataGb = parseInt(data);
      Vibration.vibrate(eval(vibrationFunction))
      save();
      setVibrationUs(parseInt(0));
      setBalanceUs(parseInt(0));
      navigation.replace('Root')
    };
  
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    
    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={[StyleSheet.absoluteFillObject]}
            />
        </View>
    )
}

export default QRScanner;