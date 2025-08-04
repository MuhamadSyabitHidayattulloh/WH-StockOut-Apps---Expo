import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { glassmorphismStyles } from '../styles/glassmorphism';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    department: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = () => {
    // Validate form
    if (!formData.username || !formData.email || !formData.password || !formData.fullName) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    // Simulate registration
    Alert.alert(
      'Success',
      'Registration successful! Please login with your credentials.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ]
    );
  };

  const renderInput = (
    placeholder,
    field,
    icon,
    secureTextEntry = false,
    showPasswordToggle = false
  ) => (
    <View style={{ marginBottom: 20, position: 'relative' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons
          name={icon}
          size={20}
          color="rgba(255, 255, 255, 0.7)"
          style={{ position: 'absolute', left: 15, zIndex: 1 }}
        />
        <TextInput
          style={[
            glassmorphismStyles.glassInput,
            focusedField === field && glassmorphismStyles.glassInputFocused,
            { paddingLeft: 50, paddingRight: showPasswordToggle ? 50 : 20 },
          ]}
          placeholder={placeholder}
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          value={formData[field]}
          onChangeText={(value) => handleInputChange(field, value)}
          onFocus={() => setFocusedField(field)}
          onBlur={() => setFocusedField('')}
          secureTextEntry={secureTextEntry}
          autoCapitalize={field === 'email' ? 'none' : 'words'}
          keyboardType={field === 'email' ? 'email-address' : 'default'}
        />
        {showPasswordToggle && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 15,
              padding: 5,
              zIndex: 1,
            }}
            onPress={() => {
              if (field === 'password') {
                setShowPassword(!showPassword);
              } else {
                setShowConfirmPassword(!showConfirmPassword);
              }
            }}
          >
            <Ionicons
              name={
                (field === 'password' ? showPassword : showConfirmPassword)
                  ? 'eye-outline'
                  : 'eye-off-outline'
              }
              size={20}
              color="rgba(255, 255, 255, 0.7)"
            />
          </TouchableOpacity>
        )}
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

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingTop: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ alignItems: 'center', marginBottom: 40 }}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              left: 0,
              top: 10,
              padding: 10,
              borderRadius: 25,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <View style={glassmorphismStyles.iconContainer}>
            <Ionicons name="person-add-outline" size={30} color="#FFFFFF" />
          </View>
          <Text style={glassmorphismStyles.title}>Create Account</Text>
          <Text style={glassmorphismStyles.subtitle}>
            Join our warehouse management system
          </Text>
        </View>

        {/* Registration Form */}
        <View style={glassmorphismStyles.glassCard}>
          <Text style={[glassmorphismStyles.cardTitle, { textAlign: 'center', marginBottom: 30 }]}>
            Register New Account
          </Text>

          {renderInput('Full Name *', 'fullName', 'person-outline')}
          {renderInput('Username *', 'username', 'at-outline')}
          {renderInput('Email Address *', 'email', 'mail-outline')}
          {renderInput('Department', 'department', 'business-outline')}
          {renderInput(
            'Password *',
            'password',
            'lock-closed-outline',
            !showPassword,
            true
          )}
          {renderInput(
            'Confirm Password *',
            'confirmPassword',
            'lock-closed-outline',
            !showConfirmPassword,
            true
          )}

          <TouchableOpacity
            style={[glassmorphismStyles.glassButton, { marginTop: 10 }]}
            onPress={handleRegister}
            activeOpacity={0.8}
          >
            <Text style={glassmorphismStyles.buttonText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: 20, alignItems: 'center' }}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={[glassmorphismStyles.cardText, { textAlign: 'center' }]}>
              Already have an account?{' '}
              <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>
                Login
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
          By creating an account, you agree to our{'\n'}
          Terms of Service and Privacy Policy
        </Text>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;

