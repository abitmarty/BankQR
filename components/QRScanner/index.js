import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Vibration } from 'react-native';
import styles from './styles';
import { BarCodeScanner } from 'expo-barcode-scanner';


const QRScanner = (props) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    const ONE_SECOND_IN_MS = 1000;

    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);
    
      const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        Vibration.vibrate(1 * ONE_SECOND_IN_MS)
        alert(`Payment of €${data} has been payed!`);
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