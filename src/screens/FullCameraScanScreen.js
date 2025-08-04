import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { glassmorphismStyles } from '../styles/glassmorphism';

const { width, height } = Dimensions.get('window');

const FullCameraScanScreen = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const { scanRead } = route.params || {};

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const playScanSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/beep.mp3')
      );
      await sound.playAsync();
    } catch (error) {
      console.log('Failed to load scan sound', error);
    }
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    if (scanned) return;
    
    setScanned(true);
    await playScanSound();
    
    if (scanRead) {
      navigation.goBack();
      scanRead(data);
    } else {
      Alert.alert(
        'QR Code Scanned',
        `Type: ${type}\nData: ${data}`,
        [
          {
            text: 'Scan Again',
            onPress: () => setScanned(false),
          },
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={glassmorphismStyles.gradientColors.secondary}
          style={glassmorphismStyles.gradientBackground}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <View style={glassmorphismStyles.glassCard}>
          <Text style={glassmorphismStyles.cardTitle}>Requesting Camera Permission</Text>
        </View>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={glassmorphismStyles.gradientColors.secondary}
          style={glassmorphismStyles.gradientBackground}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <View style={glassmorphismStyles.glassCard}>
          <Text style={glassmorphismStyles.cardTitle}>Camera Permission Denied</Text>
          <Text style={glassmorphismStyles.cardText}>
            Please enable camera permission in your device settings to use the scanner.
          </Text>
          <TouchableOpacity
            style={[glassmorphismStyles.glassButton, { marginTop: 20 }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={glassmorphismStyles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        flashMode={flashOn ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: [
            BarCodeScanner.Constants.BarCodeType.qr,
            BarCodeScanner.Constants.BarCodeType.ean13,
            BarCodeScanner.Constants.BarCodeType.ean8,
            BarCodeScanner.Constants.BarCodeType.code128,
            BarCodeScanner.Constants.BarCodeType.code39,
            BarCodeScanner.Constants.BarCodeType.datamatrix,
          ],
        }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Scan QR Code</Text>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setFlashOn(!flashOn)}
          >
            <Ionicons 
              name={flashOn ? "flash-outline" : "flash-off-outline"} 
              size={24} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>
        </View>

        {/* Scanning Area */}
        <View style={styles.scanArea}>
          <View style={styles.scanFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructions}>
          <View style={[glassmorphismStyles.glassCard, { alignItems: 'center' }]}>
            <Text style={glassmorphismStyles.cardTitle}>
              Position QR code within the frame
            </Text>
            <Text style={glassmorphismStyles.cardText}>
              The scanner will automatically detect and read the code
            </Text>
            {scanned && (
              <TouchableOpacity
                style={[glassmorphismStyles.glassButton, { marginTop: 15 }]}
                onPress={() => setScanned(false)}
              >
                <Text style={glassmorphismStyles.buttonText}>Scan Again</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  headerButton: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scanArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#00CED1',
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  instructions: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
  },
});

export default FullCameraScanScreen;

