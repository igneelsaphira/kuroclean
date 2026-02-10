import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useCat } from '../context/CatContext';

export default function AseoScreen() {
  const { tareas, marcarTarea, progresoAseo, tareasHechas, totalTareas, reiniciarDia } = useCat();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>Progreso de hoy</Text>
        <View style={styles.barBg}>
          <View style={[styles.barFill, { width: `${progresoAseo}%` }]} />
        </View>
        <Text style={styles.subtitle}>
          {tareasHechas} / {totalTareas} tareas
        </Text>
        <Text style={styles.hint}>¡Cada tarea completada hace más feliz a tu gatito!</Text>
      </View>

      <Text style={styles.sectionTitle}>Tareas de aseo</Text>
      {tareas.map((t) => (
        <TouchableOpacity
          key={t.id}
          style={[styles.task, t.hecha && styles.taskDone]}
          onPress={() => marcarTarea(t.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.taskIcon}>{t.icono}</Text>
          <Text style={[styles.taskText, t.hecha && styles.taskTextDone]}>{t.nombre}</Text>
          <View style={[styles.check, t.hecha && styles.checkDone]}>
            <Text style={styles.checkText}>{t.hecha ? '✓' : ''}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.resetBtn} onPress={reiniciarDia}>
        <Text style={styles.resetBtnText}>Reiniciar día</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#16213e' },
  content: { padding: 20, paddingBottom: 40 },
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2D5A3D',
  },
  title: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  barBg: {
    height: 12,
    backgroundColor: '#0f3460',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  barFill: {
    height: '100%',
    backgroundColor: '#2D5A3D',
    borderRadius: 6,
  },
  subtitle: { color: '#a0a0a0', fontSize: 14 },
  hint: { color: '#7bed9f', fontSize: 12, marginTop: 8 },
  sectionTitle: { color: '#fff', fontSize: 16, fontWeight: '600', marginBottom: 12 },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2D5A3D',
  },
  taskDone: { borderColor: '#7bed9f', backgroundColor: '#1a2e1a' },
  taskIcon: { fontSize: 28, marginRight: 14 },
  taskText: { flex: 1, color: '#fff', fontSize: 16 },
  taskTextDone: { color: '#7bed9f', textDecorationLine: 'line-through' },
  check: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#2D5A3D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkDone: { backgroundColor: '#2D5A3D', borderColor: '#7bed9f' },
  checkText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  resetBtn: {
    marginTop: 24,
    padding: 14,
    backgroundColor: '#0f3460',
    borderRadius: 12,
    alignItems: 'center',
  },
  resetBtnText: { color: '#7bed9f', fontSize: 16, fontWeight: '600' },
});
