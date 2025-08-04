import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { glassmorphismStyles } from '../styles/glassmorphism';

const ShoppingListScreen = ({ navigation }) => {
  return (
    <View style={glassmorphismStyles.container}>
      <LinearGradient
        colors={glassmorphismStyles.gradientColors.primary}
        style={glassmorphismStyles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={{ flex: 1, justifyContent: 'center', padding: 20, paddingTop: 120 }}>
        <View style={glassmorphismStyles.glassCard}>
          <View style={{ alignItems: 'center', marginBottom: 30 }}>
            <View style={glassmorphismStyles.iconContainer}>
              <Ionicons name="list-outline" size={40} color="#FFFFFF" />
            </View>
            <Text style={glassmorphismStyles.cardTitle}>Shopping List</Text>
            <Text style={glassmorphismStyles.cardText}>
              Manage procurement and shopping lists for warehouse operations
            </Text>
          </View>

          <TouchableOpacity
            style={glassmorphismStyles.glassButton}
            onPress={() => {
              // Navigate to shopping list functionality
              console.log('Shopping list functionality');
            }}
          >
            <Text style={glassmorphismStyles.buttonText}>View Shopping List</Text>
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

export default ShoppingListScreen;

