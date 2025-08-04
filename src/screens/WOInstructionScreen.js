import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
  Vibration,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Audio } from 'expo-av';
import moment from 'moment';
import { glassmorphismStyles } from '../styles/glassmorphism';
import { GenerateOneWayKanban } from '../utils/GenerateOneWayKanban';
import { mockApiCall, whStockoutApi } from '../utils/api';

const { width } = Dimensions.get('window');

const WOInstructionScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDuplicateKanban, setModalDuplicateKanban] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [wrongQR, setWrongQR] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const getUserFromAsyncStorage = async () => {
        try {
          const value = await AsyncStorage.getItem('userDataLogin');
          if (value !== null) {
            const userData = JSON.parse(value);
            setUsername(userData.USERNAME);
            setUserId(userData.USERID || userData.USERNAME);
          }
        } catch (error) {
          console.log('Error getting user data:', error);
        }
      };
      getUserFromAsyncStorage();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      const getAsyncStorageData = async () => {
        try {
          const value = await AsyncStorage.getItem('stockOutData');
          if (value !== null) {
            setData(JSON.parse(value));
          } else {
            setData([]);
          }
        } catch (error) {
          console.log('Error getting stock out data:', error);
        }
      };
      getAsyncStorageData();
    }, [])
  );

  const playDuplicateSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/invalid-selection.mp3')
      );
      await sound.playAsync();
    } catch (error) {
      console.log('Failed to load duplicate sound', error);
    }
  };

  const playFailedSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/error-10.mp3')
      );
      await sound.playAsync();
    } catch (error) {
      console.log('Failed to load failed sound', error);
    }
  };

  const generateSlipNumber = () => {
    const prefix = 'F';
    const date = new Date();
    const dateStr =
      date.getFullYear().toString().slice(-1) +
      date.getDate().toString().padStart(2, '0') +
      (date.getMonth() + 1).toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');
    return prefix + dateStr + random;
  };

  const generateProcessId = () => {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `ST${year}${month}${date}${hours}${minutes}${seconds}`;
  };

  const handleScanIntent = async (scannedData) => {
    if (scannedData.length === 30) {
      try {
        const oneWayKanbanQR = new GenerateOneWayKanban(scannedData);
        const currentData = JSON.parse(await AsyncStorage.getItem('stockOutData')) || [];

        if (currentData.some(item => item.imgData === scannedData)) {
          showModalDuplicateKanban();
          return;
        }

        const newData = {
          imgData: scannedData,
          timeScan: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          NPK: userId,
          partNumber: oneWayKanbanQR.getPartNumber(),
          qty: oneWayKanbanQR.getQtyPerKanban(),
          processId: generateProcessId(),
        };

        const updatedData = [newData, ...currentData];
        await AsyncStorage.setItem('stockOutData', JSON.stringify(updatedData));
        setData(updatedData);
      } catch (error) {
        console.log('Error processing scan:', error);
        showWrongQR();
      }
    } else {
      showWrongQR();
    }
  };

  const showModalDuplicateKanban = () => {
    setModalDuplicateKanban(true);
    playDuplicateSound();
    Vibration.vibrate(1000);
  };

  const showWrongQR = () => {
    playFailedSound();
    Vibration.vibrate(1000);
    setWrongQR(true);
    setTimeout(() => {
      setWrongQR(false);
    }, 2000);
  };

  const handleSubmitData = async () => {
    if (data.length > 0) {
      setLoading(true);
      const slip = generateSlipNumber();
      
      try {
        // Using mock API for demo
        await mockApiCall(whStockoutApi, {
          data: data,
          slip: slip,
        });
        
        await AsyncStorage.removeItem('stockOutData');
        setData([]);
        setLoading(false);
        Alert.alert('Success', 'Stock out data submitted successfully!');
      } catch (error) {
        setLoading(false);
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } else {
      Alert.alert('Warning', 'Data tidak boleh kosong!');
    }
  };

  const resetData = async () => {
    if (password === '0000') {
      await AsyncStorage.removeItem('stockOutData');
      setData([]);
      setModalVisible(false);
      setPassword('');
      Alert.alert('Success', 'Reset Success');
    } else {
      setModalVisible(false);
      Alert.alert('Error', 'Wrong Password');
    }
  };

  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      <View style={[styles.tableCell, { width: '10%' }]}>
        <Text style={styles.headerText}>No</Text>
      </View>
      <View style={[styles.tableCell, { width: '50%' }]}>
        <Text style={styles.headerText}>Part Number</Text>
      </View>
      <View style={[styles.tableCell, { width: '20%' }]}>
        <Text style={styles.headerText}>Qty</Text>
      </View>
      <View style={[styles.tableCell, { width: '20%' }]}>
        <Text style={styles.headerText}>User</Text>
      </View>
    </View>
  );

  const renderTableRow = (item, index) => (
    <View key={index} style={styles.tableRow}>
      <View style={[styles.tableCell, { width: '10%' }]}>
        <Text style={styles.bodyText}>{index + 1}</Text>
      </View>
      <View style={[styles.tableCell, { width: '50%' }]}>
        <Text style={styles.bodyText}>{item.partNumber}</Text>
      </View>
      <View style={[styles.tableCell, { width: '20%' }]}>
        <Text style={styles.bodyText}>{item.qty}</Text>
      </View>
      <View style={[styles.tableCell, { width: '20%' }]}>
        <Text style={styles.bodyText}>{item.NPK}</Text>
      </View>
    </View>
  );

  return (
    <View style={glassmorphismStyles.container}>
      <LinearGradient
        colors={glassmorphismStyles.gradientColors.accent}
        style={glassmorphismStyles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <ScrollView style={{ flex: 1, paddingTop: 120 }} contentContainerStyle={{ padding: 20 }}>
        {/* Header */}
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <View style={glassmorphismStyles.iconContainer}>
            <Ionicons name="cube-outline" size={30} color="#FFFFFF" />
          </View>
          <Text style={glassmorphismStyles.title}>Stock Out Part WH</Text>
          <Text style={glassmorphismStyles.subtitle}>
            Scan Kanban untuk Stockout
          </Text>
        </View>

        {/* Count */}
        <View style={{ alignItems: 'flex-end', marginBottom: 15 }}>
          <View style={[glassmorphismStyles.glassCard, { paddingVertical: 10, paddingHorizontal: 15 }]}>
            <Text style={glassmorphismStyles.cardText}>Count: {data.length}</Text>
          </View>
        </View>

        {/* Table */}
        <View style={glassmorphismStyles.glassCard}>
          {renderTableHeader()}
          <ScrollView style={{ maxHeight: 300 }}>
            {data.map((item, index) => renderTableRow(item, index))}
          </ScrollView>
        </View>

        {/* Action Buttons */}
        <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 10 }}>
          <TouchableOpacity
            style={[glassmorphismStyles.glassButton, { flex: 1, marginRight: 10 }]}
            onPress={() => navigation.navigate('FullCameraScan', { scanRead: handleScanIntent })}
          >
            <Text style={glassmorphismStyles.buttonText}>Scan by Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[glassmorphismStyles.glassButton, { flex: 1, marginLeft: 10, backgroundColor: 'rgba(76, 175, 80, 0.3)' }]}
            onPress={handleSubmitData}
          >
            <Text style={glassmorphismStyles.buttonText}>Selesai Belanja</Text>
          </TouchableOpacity>
        </View>

        {/* Reset Button */}
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <TouchableOpacity
            style={[glassmorphismStyles.glassButton, { width: '50%', backgroundColor: 'rgba(244, 67, 54, 0.3)' }]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={glassmorphismStyles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Reset Password Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={glassmorphismStyles.glassCard}>
            <Text style={glassmorphismStyles.cardTitle}>Masukkan Password</Text>
            <TextInput
              style={[glassmorphismStyles.glassInput, { marginVertical: 20 }]}
              placeholder="Password"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                style={[glassmorphismStyles.glassButton, { flex: 1, marginRight: 10 }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={glassmorphismStyles.buttonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[glassmorphismStyles.glassButton, { flex: 1, marginLeft: 10 }]}
                onPress={resetData}
              >
                <Text style={glassmorphismStyles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Duplicate Kanban Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalDuplicateKanban}
        onRequestClose={() => setModalDuplicateKanban(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={glassmorphismStyles.glassCard}>
            <Ionicons name="warning-outline" size={80} color="#FF6B6B" />
            <Text style={[glassmorphismStyles.cardTitle, { marginTop: 20, textAlign: 'center' }]}>
              DUPLICATE KANBAN
            </Text>
            <Text style={[glassmorphismStyles.cardText, { textAlign: 'center', marginBottom: 20 }]}>
              Kanban ini sudah pernah di-scan sebelumnya
            </Text>
            <TouchableOpacity
              style={glassmorphismStyles.glassButton}
              onPress={() => setModalDuplicateKanban(false)}
            >
              <Text style={glassmorphismStyles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Wrong QR Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={wrongQR}
        onRequestClose={() => setWrongQR(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={glassmorphismStyles.glassCard}>
            <Ionicons name="close-circle-outline" size={80} color="#FF6B6B" />
            <Text style={[glassmorphismStyles.cardTitle, { marginTop: 20, textAlign: 'center' }]}>
              QR Code Salah
            </Text>
            <Text style={[glassmorphismStyles.cardText, { textAlign: 'center' }]}>
              Format QR code tidak sesuai
            </Text>
          </View>
        </View>
      </Modal>

      {/* Loading Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={loading}
        onRequestClose={() => setLoading(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={glassmorphismStyles.glassCard}>
            <Ionicons name="sync-outline" size={80} color="#00CED1" />
            <Text style={[glassmorphismStyles.cardTitle, { marginTop: 20, textAlign: 'center' }]}>
              Processing...
            </Text>
            <Text style={[glassmorphismStyles.cardText, { textAlign: 'center' }]}>
              Mengirim data stock out
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = {
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    marginBottom: 5,
    padding: 10,
  },
  tableCell: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  bodyText: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
  },
};

export default WOInstructionScreen;

