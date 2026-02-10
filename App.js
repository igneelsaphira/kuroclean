import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CatProvider } from './src/context/CatContext';
import GatitoScreen from './src/screens/GatitoScreen';
import TareasScreen from './src/screens/TareasScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <CatProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator
            initialRouteName="Gatito"
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#16213e' },
            }}
          >
            <Stack.Screen name="Gatito" component={GatitoScreen} />
            <Stack.Screen name="Tareas" component={TareasScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </CatProvider>
    </SafeAreaProvider>
  );
}
