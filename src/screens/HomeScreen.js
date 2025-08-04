import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { glassmorphismStyles } from '../styles/glassmorphism';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation, onLogout }) => {
  const [username, setUsername] = useState('');

  useFocusEffect(
    useCallback(() => {
      const getUserFromAsyncStorage = async () => {
        try {
          const value = await AsyncStorage.getItem('userDataLogin');
          if (value !== null) {
            const userData = JSON.parse(value);
            setUsername(userData.USERNAME || 'User');
          }
        } catch (error) {
          console.log('Error getting user data:', error);
        }
      };
      getUserFromAsyncStorage();
    }, [])
  );

  const menuItems = [
    {
      title: 'Stock Out Part WH',
      subtitle: 'Manage warehouse stock out operations',
      icon: 'cube-outline',
      navigateTo: 'WOInstruction',
      color: '#00CED1',
    },
    {
      title: 'Stock Out with Instruction',
      subtitle: 'Stock out with detailed instructions',
      icon: 'document-text-outline',
      navigateTo: 'WInstruction',
      color: '#FF69B4',
    },
    {
      title: 'Shopping List',
      subtitle: 'Manage shopping and procurement',
      icon: 'list-outline',
      navigateTo: 'ShoppingList',
      color: '#9370DB',
    },
    {
      title: 'Stock Out CIGMA',
      subtitle: 'CIGMA system integration',
      icon: 'settings-outline',
      navigateTo: 'Stockout',
      color: '#8A2BE2',
    },
  ];

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('isLoggedIn');
              await AsyncStorage.removeItem('userDataLogin');
              onLogout();
            } catch (error) {
              console.log('Error during logout:', error);
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            marginRight: 15,
            padding: 8,
            borderRadius: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: 'transparent',
      },
      headerTransparent: true,
      headerTintColor: '#FFFFFF',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 18,
      },
    });
  }, [navigation]);

  const renderMenuItem = (item, index) => (
    <TouchableOpacity
      key={index}
      style={[
        glassmorphismStyles.glassCard,
        {
          marginHorizontal: 5,
          marginVertical: 8,
          flexDirection: 'row',
          alignItems: 'center',
          minHeight: 80,
        },
      ]}
      onPress={() => navigation.navigate(item.navigateTo)}
      activeOpacity={0.8}
    >
      <View
        style={[
          glassmorphismStyles.iconContainer,
          {
            backgroundColor: `${item.color}30`,
            borderColor: `${item.color}50`,
            marginRight: 15,
            marginBottom: 0,
            width: 50,
            height: 50,
            borderRadius: 25,
          },
        ]}
      >
        <Ionicons name={item.icon} size={24} color={item.color} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={glassmorphismStyles.cardTitle}>{item.title}</Text>
        <Text style={[glassmorphismStyles.cardText, { fontSize: 12, opacity: 0.8 }]}>
          {item.subtitle}
        </Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={20} color="rgba(255, 255, 255, 0.6)" />
    </TouchableOpacity>
  );

  return (
    <View style={glassmorphismStyles.container}>
      <LinearGradient
        colors={glassmorphismStyles.gradientColors.secondary}
        style={glassmorphismStyles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 120, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View style={{ padding: 20, alignItems: 'center', marginBottom: 20 }}>
          <View style={glassmorphismStyles.iconContainer}>
            <Ionicons name="person-outline" size={30} color="#FFFFFF" />
          </View>
          <Text style={glassmorphismStyles.title}>Welcome Back</Text>
          <Text style={glassmorphismStyles.subtitle}>{username}</Text>
        </View>

        {/* Menu Items */}
        <View style={{ paddingHorizontal: 15 }}>
          <Text
            style={[
              glassmorphismStyles.cardTitle,
              { marginLeft: 5, marginBottom: 15, fontSize: 18 },
            ]}
          >
            Quick Actions
          </Text>
          {menuItems.map((item, index) => renderMenuItem(item, index))}
        </View>

        {/* Stats Section */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text
            style={[
              glassmorphismStyles.cardTitle,
              { marginBottom: 15, fontSize: 18 },
            ]}
          >
            Today's Overview
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View
              style={[
                glassmorphismStyles.glassCard,
                {
                  flex: 1,
                  marginRight: 10,
                  alignItems: 'center',
                  paddingVertical: 20,
                },
              ]}
            >
              <Ionicons name="cube-outline" size={30} color="#00CED1" />
              <Text style={[glassmorphismStyles.cardTitle, { marginTop: 10, fontSize: 16 }]}>
                Stock Out
              </Text>
              <Text style={glassmorphismStyles.cardText}>24 Items</Text>
            </View>
            <View
              style={[
                glassmorphismStyles.glassCard,
                {
                  flex: 1,
                  marginLeft: 10,
                  alignItems: 'center',
                  paddingVertical: 20,
                },
              ]}
            >
              <Ionicons name="checkmark-circle-outline" size={30} color="#FF69B4" />
              <Text style={[glassmorphismStyles.cardTitle, { marginTop: 10, fontSize: 16 }]}>
                Completed
              </Text>
              <Text style={glassmorphismStyles.cardText}>18 Tasks</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={{ alignItems: 'center', marginTop: 40, paddingHorizontal: 20 }}>
          <Text
            style={[
              glassmorphismStyles.cardText,
              { fontSize: 12, opacity: 0.7, textAlign: 'center' },
            ]}
          >
            © PED - Denso Indonesia 2025{'\n'}
            Warehouse Management System v2.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

