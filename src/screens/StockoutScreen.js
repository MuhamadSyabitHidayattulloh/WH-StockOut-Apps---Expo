import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { glassmorphismStyles } from '../styles/glassmorphism';

const StockoutScreen = ({ navigation }) => {
  const menuOptions = [
    {
      title: 'WITH INSTRUCTION',
      subtitle: 'Stock out dengan instruksi detail',
      icon: 'document-text-outline',
      navigateTo: 'WInstruction',
      color: '#00CED1',
      image: require('../assets/images/superai-image-1730191295191.webp'),
    },
    {
      title: 'WITHOUT INSTRUCTION',
      subtitle: 'Stock out tanpa instruksi',
      icon: 'cube-outline',
      navigateTo: 'WOInstruction',
      color: '#FF69B4',
      image: require('../assets/images/superai-image-1729328832170.webp'),
    },
  ];

  const renderMenuOption = (option, index) => (
    <TouchableOpacity
      key={index}
      style={[glassmorphismStyles.glassCard, { marginBottom: 20 }]}
      onPress={() => navigation.navigate(option.navigateTo)}
      activeOpacity={0.8}
    >
      {/* Image Section */}
      <View style={{
        height: 150,
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      }}>
        <Image
          source={option.image}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}
        />
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={[
            glassmorphismStyles.iconContainer,
            {
              backgroundColor: `${option.color}30`,
              borderColor: `${option.color}50`,
            }
          ]}>
            <Ionicons name={option.icon} size={30} color={option.color} />
          </View>
        </View>
      </View>

      {/* Content Section */}
      <View style={{ alignItems: 'center' }}>
        <Text style={[glassmorphismStyles.cardTitle, { textAlign: 'center' }]}>
          {option.title}
        </Text>
        <Text style={[glassmorphismStyles.cardText, { textAlign: 'center', marginBottom: 15 }]}>
          {option.subtitle}
        </Text>
        
        <View style={[
          glassmorphismStyles.glassButton,
          {
            backgroundColor: `${option.color}30`,
            borderColor: `${option.color}50`,
            paddingVertical: 10,
            paddingHorizontal: 20,
          }
        ]}>
          <Text style={glassmorphismStyles.buttonText}>Select</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={glassmorphismStyles.container}>
      <LinearGradient
        colors={glassmorphismStyles.gradientColors.primary}
        style={glassmorphismStyles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingTop: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ alignItems: 'center', marginBottom: 30 }}>
          <View style={glassmorphismStyles.iconContainer}>
            <Ionicons name="options-outline" size={30} color="#FFFFFF" />
          </View>
          <Text style={glassmorphismStyles.title}>Stock Out Options</Text>
          <Text style={glassmorphismStyles.subtitle}>
            Choose your stock out method
          </Text>
        </View>

        {/* Menu Options */}
        {menuOptions.map((option, index) => renderMenuOption(option, index))}

        {/* Info Section */}
        <View style={[glassmorphismStyles.glassCard, { marginTop: 20 }]}>
          <View style={{ alignItems: 'center', marginBottom: 15 }}>
            <Ionicons name="information-circle-outline" size={30} color="#00CED1" />
          </View>
          <Text style={[glassmorphismStyles.cardTitle, { textAlign: 'center' }]}>
            Information
          </Text>
          <Text style={[glassmorphismStyles.cardText, { textAlign: 'center', lineHeight: 20 }]}>
            • WITH INSTRUCTION: Untuk stock out dengan panduan detail dan shopping list{'\n'}
            • WITHOUT INSTRUCTION: Untuk stock out langsung dengan scan kanban
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default StockoutScreen;

