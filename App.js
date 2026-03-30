import React from 'react';
import { Platform, StyleSheet, View, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CatProvider } from './src/context/CatContext';
import GatitoScreen from './src/screens/GatitoScreen';
import TareasScreen from './src/screens/TareasScreen';
import SeguirTrabajandoScreen from './src/screens/SeguirTrabajandoScreen';

const Stack = createNativeStackNavigator();

const PHONE_W = 390;
const PHONE_H = 844;

function WebPhoneShell({ children }) {
  const { width: winW, height: winH } = useWindowDimensions();
  const frameW = Math.min(PHONE_W, winW - 24);
  const frameH = Math.min(PHONE_H, Math.round(winH * 0.92));

  return (
    <View style={[styles.webOuter, { minHeight: winH }]}>
      <View
        style={[
          styles.webPhone,
          {
            width: frameW,
            height: frameH,
            maxHeight: winH * 0.92,
          },
        ]}
      >
        <View style={styles.webPhoneInner}>{children}</View>
      </View>
    </View>
  );
}

function AppNavigation() {
  return (
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
          <Stack.Screen name="SeguirTrabajando" component={SeguirTrabajandoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CatProvider>
  );
}

export default function App() {
  const body = <AppNavigation />;

  return (
    <SafeAreaProvider>
      {Platform.OS === 'web' ? (
        <WebPhoneShell>{body}</WebPhoneShell>
      ) : (
        body
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  webOuter: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f0f18',
    paddingVertical: 12,
  },
  webPhone: {
    flex: 0,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#16213e',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.5,
    shadowRadius: 32,
    elevation: 24,
  },
  webPhoneInner: {
    flex: 1,
    width: '100%',
    minHeight: 0,
    minWidth: 0,
  },
});
