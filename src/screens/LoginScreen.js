import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import axios from 'axios';
import { glassmorphismStyles } from '../styles/glassmorphism';
import { loginApi, mockApiCall } from '../utils/api';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginAnimation, setLoginAnimation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const refUsername = useRef(null);
  const refPassword = useRef(null);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      const userData = await AsyncStorage.getItem('userDataLogin');
      if (isLoggedIn === 'true' && userData) {
        const user = JSON.parse(userData);
        onLogin(user.USERNAME || 'User');
      }
    } catch (error) {
      console.log('Error checking login:', error);
    }
  };

  const setAsyncData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  const playLoginSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/login.mp3')
      );
      await sound.playAsync();
    } catch (error) {
      console.log('Failed to load the sound', error);
    }
  };

  const showLoginAnimation = () => {
    return new Promise((resolve) => {
      setLoginAnimation(true);
      playLoginSound();
      setTimeout(() => {
        setLoginAnimation(false);
        resolve();
      }, 1500);
    });
  };

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    try {
      const data = {
        USERNAME: username,
        PASSWORD: password,
      };

      // Try real API first, fallback to mock if fails
      let response;
      try {
        response = await axios.post(loginApi, data);
      } catch (apiError) {
        console.log('API call failed, using mock response:', apiError.message);
        // Use mock API for demo
        response = await mockApiCall(loginApi, data);
      }

      const user = response.data.data;
      await setAsyncData('isLoggedIn', 'true');
      await setAsyncData('userDataLogin', user);
      await showLoginAnimation();
      onLogin(user.USERNAME || username);
    } catch (error) {
      Alert.alert('Error', 'Username or password incorrect');
      refUsername.current?.clear();
      refPassword.current?.clear();
      refUsername.current?.focus();
    }
  };

  return (
    <View style={glassmorphismStyles.container}>
      <LinearGradient
        colors={glassmorphismStyles.gradientColors.primary}
        style={glassmorphismStyles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        {/* Welcome Section */}
        <View style={{ alignItems: 'center', marginBottom: 50 }}>
          <View style={glassmorphismStyles.iconContainer}>
            <Ionicons name="cube-outline" size={30} color="#FFFFFF" />
          </View>
          <Text style={glassmorphismStyles.title}>WH Stockout</Text>
          <Text style={glassmorphismStyles.subtitle}>
            Warehouse Management System
          </Text>
        </View>

        {/* Login Form */}
        <View style={glassmorphismStyles.glassCard}>
          <Text style={[glassmorphismStyles.cardTitle, { textAlign: 'center', marginBottom: 30 }]}>
            Welcome Back
          </Text>
          
          <View style={{ marginBottom: 20 }}>
            <TextInput
              ref={refUsername}
              style={[
                glassmorphismStyles.glassInput,
                usernameFocused && glassmorphismStyles.glassInputFocused
              ]}
              placeholder="NPK / Username"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={username}
              onChangeText={setUsername}
              onFocus={() => setUsernameFocused(true)}
              onBlur={() => setUsernameFocused(false)}
              autoCapitalize="none"
            />
          </View>

          <View style={{ marginBottom: 30, position: 'relative' }}>
            <TextInput
              ref={refPassword}
              style={[
                glassmorphismStyles.glassInput,
                passwordFocused && glassmorphismStyles.glassInputFocused,
                { paddingRight: 50 }
              ]}
              placeholder="Password"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 15,
                top: 15,
                padding: 5,
              }}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color="rgba(255, 255, 255, 0.7)"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={glassmorphismStyles.glassButton}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={glassmorphismStyles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: 20, alignItems: 'center' }}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={[glassmorphismStyles.cardText, { textAlign: 'center' }]}>
              Don't have an account?{' '}
              <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>
                Register
              </Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text style={[
          glassmorphismStyles.cardText,
          { 
            textAlign: 'center', 
            marginTop: 30, 
            fontSize: 12, 
            opacity: 0.7 
          }
        ]}>
          © PED - Denso Indonesia 2025
        </Text>
      </View>

      {/* Login Animation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={loginAnimation}
        onRequestClose={() => setLoginAnimation(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }}
        >
          <View style={[glassmorphismStyles.glassCard, { alignItems: 'center' }]}>
            <Ionicons name="checkmark-circle-outline" size={80} color="#00CED1" />
            <Text style={[glassmorphismStyles.cardTitle, { marginTop: 20 }]}>
              Login Successful!
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginScreen;

