import React from 'react';
import { View, StyleSheet } from 'react-native';

// Escena vectorial inspirada en tu fondo pastel:
// - Ventana a la izquierda
// - Pizarra con 3 notas
// - Cojín/cama abajo de la pizarra (para el gatito futuro)
export default function StudyCornerRoom() {
  return (
    <View style={styles.room}>
      <View style={styles.wallGlow} />
      <View style={styles.floorGlow} />
      <View style={styles.floorLine} />

      <View style={styles.windowWrap}>
        <View style={styles.windowArch} />
        <View style={styles.windowFrame}>
          <View style={styles.vine} />
          <View style={styles.windowInner}>
            <View style={styles.cloudA} />
            <View style={styles.cloudB} />
          </View>
          <View style={styles.windowCrossV} />
          <View style={styles.windowCrossH} />
        </View>
      </View>

      <View style={styles.boardWrap}>
        <View style={styles.boardInner} />
        <View style={[styles.note, styles.noteA]}>
          <View style={[styles.pin, styles.pinA]} />
        </View>
        <View style={[styles.note, styles.noteB]}>
          <View style={[styles.pin, styles.pinB]} />
        </View>
        <View style={[styles.note, styles.noteC]}>
          <View style={[styles.pin, styles.pinC]} />
        </View>
      </View>

      <View style={styles.cushionShadow} />
      <View style={styles.cushion} />
    </View>
  );
}

const styles = StyleSheet.create({
  room: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#8da7e8',
  },
  wallGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 190, 230, 0.22)',
  },
  floorGlow: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '31%',
    backgroundColor: 'rgba(220, 205, 255, 0.45)',
  },
  floorLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '30%',
    height: 2,
    backgroundColor: 'rgba(255, 240, 245, 0.65)',
  },
  windowWrap: {
    position: 'absolute',
    left: -18,
    top: '6%',
    width: '42%',
    height: '56%',
    alignItems: 'center',
  },
  windowArch: {
    position: 'absolute',
    top: 0,
    width: '88%',
    height: '24%',
    borderTopLeftRadius: 140,
    borderTopRightRadius: 140,
    backgroundColor: 'rgba(240, 208, 229, 0.52)',
  },
  windowFrame: {
    marginTop: '16%',
    width: '88%',
    height: '84%',
    borderRadius: 28,
    borderWidth: 5,
    borderColor: 'rgba(237, 206, 224, 0.9)',
    overflow: 'hidden',
    backgroundColor: 'rgba(168, 205, 255, 0.65)',
  },
  windowInner: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(158, 200, 255, 0.55)',
  },
  cloudA: {
    position: 'absolute',
    left: '8%',
    bottom: '14%',
    width: '58%',
    height: '26%',
    borderRadius: 80,
    backgroundColor: 'rgba(255, 235, 242, 0.72)',
  },
  cloudB: {
    position: 'absolute',
    left: '34%',
    bottom: '20%',
    width: '42%',
    height: '20%',
    borderRadius: 80,
    backgroundColor: 'rgba(248, 224, 255, 0.65)',
  },
  windowCrossV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '48%',
    width: 3,
    backgroundColor: 'rgba(237, 206, 224, 0.9)',
  },
  windowCrossH: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '48%',
    height: 3,
    backgroundColor: 'rgba(237, 206, 224, 0.9)',
  },
  vine: {
    position: 'absolute',
    left: 6,
    top: 6,
    width: 8,
    height: '55%',
    borderRadius: 10,
    backgroundColor: 'rgba(130, 184, 139, 0.72)',
  },
  boardWrap: {
    position: 'absolute',
    right: '6%',
    top: '20%',
    width: '56%',
    height: '38%',
    borderRadius: 10,
    borderWidth: 6,
    borderColor: 'rgba(205, 160, 144, 0.95)',
    backgroundColor: 'rgba(216, 186, 160, 0.82)',
  },
  boardInner: {
    ...StyleSheet.absoluteFillObject,
    margin: 6,
    borderRadius: 4,
    backgroundColor: 'rgba(207, 171, 141, 0.65)',
  },
  note: {
    position: 'absolute',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(207, 170, 188, 0.55)',
  },
  noteA: {
    left: '11%',
    top: '16%',
    width: '28%',
    height: '34%',
    backgroundColor: 'rgba(255, 243, 199, 0.95)',
  },
  noteB: {
    left: '41%',
    top: '44%',
    width: '28%',
    height: '28%',
    backgroundColor: 'rgba(216, 204, 250, 0.95)',
  },
  noteC: {
    right: '8%',
    top: '16%',
    width: '30%',
    height: '44%',
    backgroundColor: 'rgba(252, 247, 244, 0.95)',
  },
  pin: {
    position: 'absolute',
    top: -7,
    alignSelf: 'center',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  pinA: { backgroundColor: 'rgba(255, 178, 206, 0.95)' },
  pinB: { backgroundColor: 'rgba(167, 207, 255, 0.95)' },
  pinC: { backgroundColor: 'rgba(246, 181, 225, 0.95)' },
  cushionShadow: {
    position: 'absolute',
    right: '16%',
    bottom: '6.5%',
    width: '46%',
    height: '7.5%',
    borderRadius: 999,
    backgroundColor: 'rgba(115, 92, 154, 0.24)',
  },
  cushion: {
    position: 'absolute',
    right: '16%',
    bottom: '8.5%',
    width: '46%',
    height: '9.5%',
    borderRadius: 999,
    backgroundColor: 'rgba(246, 203, 233, 0.95)',
    borderWidth: 2,
    borderColor: 'rgba(241, 219, 246, 0.95)',
  },
});
