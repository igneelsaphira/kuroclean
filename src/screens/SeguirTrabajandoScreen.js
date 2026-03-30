import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { TITULO_PAGINA, INTRO, PENDIENTES } from '../data/seguirTrabajando';

export default function SeguirTrabajandoScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingTop: insets.top + 8 }]}>
      <TouchableOpacity
        style={[styles.backBtn, { top: insets.top + 8 }]}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{TITULO_PAGINA}</Text>
        <Text style={styles.intro}>{INTRO}</Text>

        <Text style={styles.subtitulo}>Pendientes e ideas</Text>
        {PENDIENTES.map((linea, i) => (
          <View key={i} style={styles.itemRow}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.itemText}>{linea}</Text>
          </View>
        ))}

        <Text style={styles.hint}>
          Archivo: src/data/seguirTrabajando.js
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#16213e',
    paddingHorizontal: 20,
  },
  backBtn: {
    position: 'absolute',
    left: 20,
    zIndex: 10,
    padding: 8,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 48, paddingLeft: 44, paddingRight: 8 },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 14,
    marginTop: 36,
  },
  intro: {
    color: 'rgba(190, 210, 255, 0.9)',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
  subtitulo: {
    color: 'rgba(150, 210, 255, 0.95)',
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingRight: 8,
  },
  bullet: {
    color: 'rgba(150, 210, 255, 0.85)',
    fontSize: 16,
    marginRight: 8,
    lineHeight: 22,
  },
  itemText: {
    flex: 1,
    color: 'rgba(230, 235, 255, 0.92)',
    fontSize: 15,
    lineHeight: 22,
  },
  hint: {
    marginTop: 28,
    color: 'rgba(140, 160, 200, 0.7)',
    fontSize: 13,
    fontStyle: 'italic',
  },
});
