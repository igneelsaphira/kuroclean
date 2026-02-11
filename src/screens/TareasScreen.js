import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, Image } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useCat } from '../context/CatContext';

const PESTAÑAS = [
  { key: 'diaria', label: 'Diaria', tareasKey: 'tareasDiaria', reiniciar: 'reiniciarDia', fondo: require('../../assets/tab-diaria.png') },
  { key: 'semanal', label: 'Semanal', tareasKey: 'tareasSemanal', reiniciar: 'reiniciarSemana', fondo: require('../../assets/tab-semanal.png') },
  { key: 'mensual', label: 'Mensual', tareasKey: 'tareasMensual', reiniciar: 'reiniciarMes', fondo: require('../../assets/tab-mensual.png') },
  { key: 'anual', label: 'Anual', tareasKey: 'tareasAnual', reiniciar: 'reiniciarAño', fondo: require('../../assets/tab-anual.png') },
];

const TEMAS = {
  diaria: {
    taskBg: 'rgba(90, 55, 130, 0.45)',
    taskBorder: 'rgba(140, 90, 180, 0.6)',
    taskDoneBg: 'rgba(70, 45, 110, 0.5)',
    taskDoneBorder: 'rgba(180, 140, 220, 0.7)',
    taskTextDone: 'rgba(200, 170, 255, 0.95)',
    checkBorder: 'rgba(140, 90, 180, 0.7)',
    checkDoneBg: 'rgba(120, 80, 160, 0.6)',
    checkDoneBorder: 'rgba(180, 140, 220, 0.9)',
    resetBg: 'rgba(70, 45, 110, 0.5)',
    resetBorder: 'rgba(140, 90, 180, 0.5)',
    resetText: 'rgba(220, 190, 255, 0.95)',
    tabBg: 'rgba(90, 55, 130, 0.4)',
    tabBorder: 'rgba(140, 90, 180, 0.5)',
    tabActiveBg: 'rgba(100, 65, 150, 0.65)',
    tabActiveBorder: 'rgba(180, 140, 220, 0.9)',
  },
  semanal: {
    taskBg: 'rgba(150, 120, 200, 0.4)',
    taskBorder: 'rgba(180, 150, 220, 0.55)',
    taskDoneBg: 'rgba(130, 100, 180, 0.45)',
    taskDoneBorder: 'rgba(200, 170, 240, 0.65)',
    taskTextDone: 'rgba(220, 200, 255, 0.95)',
    checkBorder: 'rgba(180, 150, 220, 0.65)',
    checkDoneBg: 'rgba(150, 120, 200, 0.55)',
    checkDoneBorder: 'rgba(200, 170, 240, 0.9)',
    resetBg: 'rgba(120, 90, 170, 0.45)',
    resetBorder: 'rgba(170, 140, 220, 0.5)',
    resetText: 'rgba(230, 210, 255, 0.95)',
    tabBg: 'rgba(140, 110, 190, 0.4)',
    tabBorder: 'rgba(180, 150, 220, 0.5)',
    tabActiveBg: 'rgba(160, 130, 210, 0.6)',
    tabActiveBorder: 'rgba(200, 170, 240, 0.9)',
  },
  mensual: {
    taskBg: 'rgba(70, 150, 210, 0.45)',
    taskBorder: 'rgba(110, 180, 230, 0.6)',
    taskDoneBg: 'rgba(50, 130, 190, 0.5)',
    taskDoneBorder: 'rgba(140, 200, 250, 0.7)',
    taskTextDone: 'rgba(180, 230, 255, 0.95)',
    checkBorder: 'rgba(110, 180, 230, 0.7)',
    checkDoneBg: 'rgba(90, 160, 220, 0.6)',
    checkDoneBorder: 'rgba(150, 210, 255, 0.9)',
    resetBg: 'rgba(50, 130, 190, 0.5)',
    resetBorder: 'rgba(100, 170, 220, 0.5)',
    resetText: 'rgba(190, 235, 255, 0.95)',
    tabBg: 'rgba(70, 150, 200, 0.4)',
    tabBorder: 'rgba(110, 180, 230, 0.5)',
    tabActiveBg: 'rgba(90, 170, 220, 0.65)',
    tabActiveBorder: 'rgba(150, 210, 255, 0.9)',
  },
  anual: {
    taskBg: 'rgba(45, 25, 75, 0.5)',
    taskBorder: 'rgba(80, 50, 120, 0.65)',
    taskDoneBg: 'rgba(35, 18, 60, 0.55)',
    taskDoneBorder: 'rgba(100, 65, 150, 0.75)',
    taskTextDone: 'rgba(180, 150, 220, 0.95)',
    checkBorder: 'rgba(80, 50, 120, 0.75)',
    checkDoneBg: 'rgba(60, 35, 100, 0.65)',
    checkDoneBorder: 'rgba(120, 80, 170, 0.9)',
    resetBg: 'rgba(35, 20, 60, 0.55)',
    resetBorder: 'rgba(70, 45, 110, 0.6)',
    resetText: 'rgba(200, 170, 255, 0.95)',
    tabBg: 'rgba(45, 25, 75, 0.45)',
    tabBorder: 'rgba(80, 50, 120, 0.55)',
    tabActiveBg: 'rgba(55, 30, 95, 0.7)',
    tabActiveBorder: 'rgba(110, 75, 160, 0.9)',
  },
};

const ICONO_LAVAR_ROPA = require('../../assets/icon-lavar-ropa.png');
const ICONO_BARRER_TRAPEAR = require('../../assets/icon-barrer-trapear.png');
const ICONO_LIMPIAR_VENTANAS = require('../../assets/icon-limpiar-ventanas.png');
const ICONO_BANO = require('../../assets/icon-bano.png');
const ICONO_TENDER_CAMA = require('../../assets/icon-tender-cama.png');
const ICONO_LIMPIAR_POLVO = require('../../assets/icon-limpiar-polvo.png');
const ICONO_ORDENAR_ARMARIOS = require('../../assets/icon-ordenar-armarios.png');
const ICONO_PLANCHAR = require('../../assets/icon-planchar.png');
const ICONO_LIMPIAR_LAMPARAS = require('../../assets/icon-limpiar-lamparas.png');
const ICONO_SACAR_BASURA = require('../../assets/icon-sacar-basura.png');
const ICONO_ORDENAR_DONAR = require('../../assets/icon-ordenar-donar.png');
const ICONO_LAVAR_LOZA = require('../../assets/icon-lavar-loza.png');

function iconStyleForTask(tipo, taskId) {
  if (tipo === 'diaria' && taskId === 'd9') return styles.taskIconImageCastillo;
  if (tipo === 'diaria' && taskId === 'd3') return styles.taskIconImageBano;
  if (tipo === 'diaria' && taskId === 'd7') return styles.taskIconImagePolvo;
  if (tipo === 'semanal' && taskId === 's1') return styles.taskIconImageLarge;
  if (tipo === 'diaria' && taskId === 'd4') return styles.taskIconImageLarge;
  if (tipo === 'mensual' && taskId === 'm1') return styles.taskIconImageVentanasLarge;
  return styles.taskIconImage;
}

function ListaTareas({ tipo, tareas, marcarTarea, reiniciar, tema }) {
  const t = tema || TEMAS.diaria;
  return (
    <ScrollView style={styles.lista} contentContainerStyle={styles.listaContent}>
      {tareas.map((task) => {
        const iconoImagen = (tipo === 'semanal' && task.id === 's1') ? ICONO_LAVAR_ROPA : (tipo === 'semanal' && task.id === 's2') ? ICONO_PLANCHAR : (tipo === 'semanal' && task.id === 's6') ? ICONO_ORDENAR_ARMARIOS : (tipo === 'diaria' && task.id === 'd9') ? ICONO_BARRER_TRAPEAR : (tipo === 'diaria' && task.id === 'd3') ? ICONO_BANO : (tipo === 'diaria' && task.id === 'd4') ? ICONO_TENDER_CAMA : (tipo === 'diaria' && task.id === 'd6') ? ICONO_SACAR_BASURA : (tipo === 'diaria' && task.id === 'd7') ? ICONO_LIMPIAR_POLVO : (tipo === 'diaria' && task.id === 'd8') ? ICONO_LAVAR_LOZA : (tipo === 'mensual' && task.id === 'm1') ? ICONO_LIMPIAR_VENTANAS : (tipo === 'mensual' && task.id === 'm4') ? ICONO_LIMPIAR_LAMPARAS : (tipo === 'anual' && task.id === 'a3') ? ICONO_ORDENAR_DONAR : null;
        const usarIconoImagen = !!iconoImagen;
        return (
        <TouchableOpacity
          key={task.id}
          style={[
            styles.taskBase,
            { backgroundColor: t.taskBg, borderColor: t.taskBorder },
            task.hecha && { backgroundColor: t.taskDoneBg, borderColor: t.taskDoneBorder },
            (tipo === 'diaria' && task.id === 'd3') && { borderColor: 'transparent' },
            (tipo === 'diaria' && task.id === 'd4') && styles.taskBaseWithLargeIconTenderCama,
            (tipo === 'mensual' && task.id === 'm1') && styles.taskBaseWithLargeIcon,
          ]}
          onPress={() => marcarTarea(tipo, task.id)}
          activeOpacity={0.7}
        >
          {usarIconoImagen ? (
            <View style={[styles.taskIconImageWrap, styles.taskIconImageWrapOnTop, (tipo === 'diaria' && task.id === 'd4') && styles.taskIconImageWrapTenderCama, (tipo === 'mensual' && task.id === 'm1') && styles.taskIconImageWrapLarge]} pointerEvents="box-none">
              <ExpoImage
                source={iconoImagen}
                style={[iconStyleForTask(tipo, task.id), { backgroundColor: 'transparent' }]}
                contentFit="contain"
              />
            </View>
          ) : (
            <Text style={styles.taskIcon}>{task.icono}</Text>
          )}
          <Text style={[styles.taskText, (tipo === 'diaria' && task.id === 'd3') && styles.taskTextBanoOffset, (tipo === 'diaria' && task.id === 'd4') && styles.taskTextTenderCama, (tipo === 'mensual' && task.id === 'm1') && styles.taskTextLimpiarVentanas, task.hecha && { color: t.taskTextDone, textDecorationLine: 'line-through' }]}>{tipo === 'diaria' && task.id === 'd7' ? `${task.nombre} ✨` : task.nombre}</Text>
          <View style={[styles.checkBase, { borderColor: t.checkBorder }, task.hecha && { backgroundColor: t.checkDoneBg, borderColor: t.checkDoneBorder }]}>
            <Text style={styles.checkText}>{task.hecha ? '✓' : ''}</Text>
          </View>
        </TouchableOpacity>
      ); })}
      <TouchableOpacity style={[styles.resetBtnBase, { backgroundColor: t.resetBg, borderColor: t.resetBorder }]} onPress={reiniciar}>
        <Text style={[styles.resetBtnTextBase, { color: t.resetText }]}>Reiniciar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default function TareasScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const {
    tareasDiaria,
    tareasSemanal,
    tareasMensual,
    tareasAnual,
    marcarTarea,
    reiniciarDia,
    reiniciarSemana,
    reiniciarMes,
    reiniciarAño,
  } = useCat();

  const [pestaña, setPestaña] = useState('diaria');

  const datos = {
    diaria: { tareas: tareasDiaria, reiniciar: reiniciarDia },
    semanal: { tareas: tareasSemanal, reiniciar: reiniciarSemana },
    mensual: { tareas: tareasMensual, reiniciar: reiniciarMes },
    anual: { tareas: tareasAnual, reiniciar: reiniciarAño },
  };
  const { tareas, reiniciar } = datos[pestaña];
  const fondoActual = PESTAÑAS.find((t) => t.key === pestaña)?.fondo;

  return (
    <View style={styles.containerWrap}>
      <ImageBackground
        source={fondoActual}
        style={styles.fondoImagen}
        resizeMode="cover"
      >
        <View style={styles.fondoOverlay} />
      </ImageBackground>
      <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity
          style={[styles.backBtn, { top: insets.top + 8 }]}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Tareas</Text>

        <View style={styles.tabs}>
          {PESTAÑAS.map((tab) => {
            const temaTab = TEMAS[tab.key];
            const isActive = pestaña === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.tabBase,
                  { backgroundColor: temaTab.tabBg, borderColor: temaTab.tabBorder },
                  isActive && { backgroundColor: temaTab.tabActiveBg, borderColor: temaTab.tabActiveBorder },
                ]}
                onPress={() => setPestaña(tab.key)}
              >
                <Text style={[styles.tabText, !isActive && { color: temaTab.resetText }, isActive && styles.tabTextActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <ListaTareas
          tipo={pestaña}
          tareas={tareas}
          marcarTarea={marcarTarea}
          reiniciar={reiniciar}
          tema={TEMAS[pestaña]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerWrap: { flex: 1 },
  fondoImagen: {
    ...StyleSheet.absoluteFillObject,
  },
  fondoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  container: { flex: 1, paddingHorizontal: 20 },
  backBtn: {
    position: 'absolute',
    left: 20,
    zIndex: 10,
    padding: 8,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 16,
    marginLeft: 44,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  tabBase: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
  },
  tabText: { fontSize: 14, fontWeight: '600' },
  tabTextActive: { color: '#fff' },
  lista: { flex: 1 },
  listaContent: { paddingBottom: 40 },
  taskBase: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 28,
    minHeight: 100,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    overflow: 'visible',
  },
  taskBaseWithLargeIcon: {
    marginTop: 20,
    paddingTop: 88,
    minHeight: 160,
  },
  taskBaseWithLargeIconTenderCama: {
    marginTop: 0,
    paddingTop: 69,
    minHeight: 141,
  },
  taskIcon: { fontSize: 28, marginRight: 14 },
  taskIconImageWrap: {
    width: 36,
    height: 36,
    marginRight: 14,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  taskIconImageWrapOnTop: {
    zIndex: 10,
  },
  taskIconImageWrapLarge: {
    position: 'absolute',
    left: 28,
    top: 60,
    zIndex: 100,
  },
  taskIconImageWrapTenderCama: {
    position: 'absolute',
    left: 43,
    top: 44,
    zIndex: 100,
  },
  taskIconImage: {
    position: 'absolute',
    width: 90,
    height: 90,
    left: -27,
    top: -27,
    backgroundColor: 'transparent',
  },
  taskIconImageCastillo: {
    position: 'absolute',
    width: 88,
    height: 88,
    left: -26,
    top: -26,
    backgroundColor: 'transparent',
  },
  taskIconImageVentanas: {
    position: 'absolute',
    width: 80,
    height: 90,
    left: -22,
    top: -27,
    backgroundColor: 'transparent',
  },
  taskIconImageLarge: {
    position: 'absolute',
    width: 180,
    height: 180,
    left: -72,
    top: -72,
    backgroundColor: 'transparent',
  },
  taskIconImageVentanasLarge: {
    position: 'absolute',
    width: 160,
    height: 180,
    left: -62,
    top: -72,
    backgroundColor: 'transparent',
  },
  taskIconImageBano: {
    position: 'absolute',
    width: 82,
    height: 82,
    left: -23,
    top: -23,
    backgroundColor: 'transparent',
  },
  taskIconImagePolvo: {
    position: 'absolute',
    width: 92,
    height: 92,
    left: -28,
    top: -28,
    backgroundColor: 'transparent',
  },
  taskText: { flex: 1, color: '#fff', fontSize: 16, textAlign: 'center' },
  taskTextBanoOffset: { marginLeft: 8 },
  taskTextTenderCama: { marginLeft: 100, marginTop: -14 },
  taskTextLimpiarVentanas: { marginTop: -32 },
  checkBase: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  resetBtnBase: {
    marginTop: 24,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  resetBtnTextBase: { fontSize: 16, fontWeight: '600' },
});
