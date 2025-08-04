import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { glassmorphismStyles } from '../styles/glassmorphism';

const WInstructionScreen = ({ navigation }) => {
  return (
    <View style={glassmorphismStyles.container}>
      <LinearGradient
        colors={glassmorphismStyles.gradientColors.secondary}
        style={glassmorphismStyles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={{ flex: 1, justifyContent: 'center', padding: 20, paddingTop: 120 }}>
        <View style={glassmorphismStyles.glassCard}>
          <View style={{ alignItems: 'center', marginBottom: 30 }}>
            <View style={glassmorphismStyles.iconContainer}>
              <Ionicons name="document-text-outline" size={40} color="#FFFFFF" />
            </View>
            <Text style={glassmorphismStyles.cardTitle}>Stock Out with Instruction</Text>
            <Text style={glassmorphismStyles.cardText}>
              Detailed stock out operations with step-by-step instructions
            </Text>
          </View>

          <TouchableOpacity
            style={glassmorphismStyles.glassButton}
            onPress={() => {
              // Navigate to camera or barcode scanner
              navigation.navigate('FullCameraScan');
            }}
          >
            <Text style={glassmorphismStyles.buttonText}>Start Process</Text>
          </TouchableOpacity>

          <View style={{ marginTop: 30 }}>
            <Text style={[glassmorphismStyles.cardText, { fontSize: 12, textAlign: 'center' }]}>
              This feature will be implemented with the original functionality
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WInstructionScreen;

