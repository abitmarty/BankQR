import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Vibration, AsyncStorage } from 'react-native';
import styles from './styles';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';


const QRScanner = (props) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const navigation = useNavigation(); 
    const [vibrationUs, setVibrationUs]= useState();
    const [balanceUs, setBalanceUs]= useState();
    let dataGb = 0;

    // const save = async() => {
    //   try {
    //     await AsyncStorage.setItem("MyBalance", (parseInt(balanceUs) - dataGb).toString())
    //   }catch (err){
    //     alert(err)
    //   }
    // }

    // const load = async() => {
    //   try {
    //     let vibration = await AsyncStorage.getItem("MyVibration");
    //     let balance = await AsyncStorage.getItem("MyBalance");
  
    //     if (vibration !== null){
    //       setVibrationUs(parseInt(vibration));
    //     } else{
    //       setVibrationUs(parseInt(0));
    //     }
    //     if (balance !== null){
    //       setBalanceUs(parseInt(balance));
    //     } else{
    //       setBalanceUs(parseInt(0));
    //     }
    //   }catch(err){
    //     alert(err)
    //   }
    // }

    // useEffect(() => {
    //   load();
    // })
    
    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);
    
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      //Vibration.vibrate(1 * vibrationUs)
      //alert(`Payment of €${data} extracted from balance ${balanceUs} successful!`);
      //dataGb = parseInt(data);
      //save();
      //setVibrationUs(parseInt(0));
      //setBalanceUs(parseInt(0));
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
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    )
}

export default QRScanner;