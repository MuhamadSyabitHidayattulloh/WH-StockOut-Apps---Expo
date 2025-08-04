import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';

// Screens
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import StockoutScreen from '../screens/StockoutScreen';
import WInstructionScreen from '../screens/WInstructionScreen';
import WOInstructionScreen from '../screens/WOInstructionScreen';
import ShoppingListScreen from '../screens/ShoppingListScreen';
import FullCameraScanScreen from '../screens/FullCameraScanScreen';

const Stack = createNativeStackNavigator();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: 'transparent',
            },
            headerTransparent: true,
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Home"
            options={{
              headerBackVisible: false,
              title: `WH Stockout Apps - ${userName}`,
            }}
          >
            {props => (
              <HomeScreen {...props} onLogout={() => setIsLoggedIn(false)} />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Stockout"
            component={StockoutScreen}
            options={{ title: `Stock Out Part WH - ${userName}` }}
          />
          <Stack.Screen
            name="WInstruction"
            options={{ title: `Stock Out With Instruction - ${userName}` }}
          >
            {props => (
              <WInstructionScreen
                {...props}
                onLogout={() => setIsLoggedIn(false)}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="WOInstruction"
            component={WOInstructionScreen}
            options={{ title: `Stock Out CIGMA - ${userName}` }}
          />
          <Stack.Screen
            name="ShoppingList"
            component={ShoppingListScreen}
            options={{ title: `Shopping List - ${userName}` }}
          />
          <Stack.Screen
            name="FullCameraScan"
            component={FullCameraScanScreen}
            options={{ 
              title: 'Camera Scanner',
              headerShown: false 
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login">
            {props => (
              <LoginScreen
                {...props}
                onLogin={name => {
                  setUserName(name || 'User');
                  setIsLoggedIn(true);
                }}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;

