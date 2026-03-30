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

if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const root = document.getElementById('root');
  if (root) {
    root.style.flex = '1';
    root.style.display = 'flex';
    root.style.flexDirection = 'column';
    root.style.minHeight = '100vh';
    root.style.width = '100%';
  }
  document.body.style.margin = '0';
  document.body.style.minHeight = '100vh';
  document.documentElement.style.height = '100%';
}

const PHONE_W = 390;
const PHONE_H = 844;

function WebPhoneShell({ children }) {
  const { width: rawW, height: rawH } = useWindowDimensions();
  // En web el primer render a veces viene en 0 y el marco colapsa a una línea.
  const winW = Math.max(rawW || 800, 320);
  const winH = Math.max(rawH || 900, 500);

  // Mantener proporción EXACTA del celular para que el fondo no se vea "agrandado".
  const availableW = Math.max(1, winW - 24);
  const availableH = Math.max(1, winH - 24);
  const scale = Math.min(availableW / PHONE_W, availableH / PHONE_H, 1);
  const frameW = Math.round(PHONE_W * scale);
  const frameH = Math.round(PHONE_H * scale);

  return (
    <View style={styles.webOuter}>
      <View
        style={[
          styles.webPhone,
          {
            width: frameW,
            height: frameH,
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
      <NavigationContainer
        style={Platform.OS === 'web' ? styles.navFill : undefined}
      >
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName="Gatito"
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: '#16213e',
              ...(Platform.OS === 'web' ? { flex: 1 } : {}),
            },
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
        <View style={styles.webRoot}>
          <WebPhoneShell>{body}</WebPhoneShell>
        </View>
      ) : (
        body
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  webRoot: {
    ...Platform.select({
      web: {
        flex: 1,
        minHeight: '100vh',
        width: '100%',
      },
      default: { flex: 1 },
    }),
  },
  webOuter: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f0f18',
    paddingVertical: 16,
    paddingHorizontal: 12,
    ...Platform.select({
      web: {
        flex: 1,
        width: '100%',
        minHeight: '100vh',
      },
      default: {
        width: '100%',
      },
    }),
  },
  webPhone: {
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#16213e',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.55,
    shadowRadius: 40,
    elevation: 28,
  },
  webPhoneInner: {
    flex: 1,
    width: '100%',
    height: '100%',
    minHeight: 0,
    minWidth: 0,
  },
  navFill: {
    flex: 1,
    height: '100%',
    minHeight: 0,
    width: '100%',
  },
});
